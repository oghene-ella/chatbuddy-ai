import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Chat, Message, ChatContextType, ErrorState, LoadingState } from "../types/chat";
import { collection, query, where, orderBy, addDoc, onSnapshot, Timestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from './AuthContext';

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
	const [chats, setChats] = useState<Chat[]>([]);
	const [currentChat, setCurrentChat] = useState<Chat | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [error, setError] = useState<ErrorState | null>(null);
	const [loading, setLoading] = useState<LoadingState>({ isLoading: true });
	const { currentUser } = useAuth();

	useEffect(() => {
		if (!currentUser) return;

		const messagesRef = collection(db, "chats", currentUser.uid, "messages");
		const q = query(messagesRef, orderBy('timestamp', 'asc'));

		const unsubscribe = onSnapshot(q, (snapshot) => {
			const chatList: Chat[] = [];
			snapshot.forEach((doc) => {
				chatList.push({ id: doc.id, ...doc.data() } as Chat);
			});
			setChats(chatList);
			setLoading({ isLoading: false });
		});

		return () => unsubscribe();
	}, [currentUser]);

	const clearError = () => setError(null);

	const createNewChat = async (participantId: string) => {
		if (!currentUser) throw new Error('User not authenticated');

		const chatRef = await addDoc(collection(db, 'chats'), {
			participants: [currentUser.uid, participantId],
			lastMessage: '',
			lastMessageTime: Timestamp.now()
		});

		return chatRef.id;
	};

	const addMessage = async (chatId: string, message: Message) => {
		try {
			setLoading({ isLoading: true, operation: 'addMessage' });
			const chatRef = doc(db, 'chats', chatId);
			const messagesRef = collection(chatRef, 'messages');
			await addDoc(messagesRef, message);
			setLoading({ isLoading: false });
		} catch (err) {
			setError({ message: (err as Error).message, code: 'addMessage' });
			throw err;
		}
	};

	const editChat = async (chatId: string, newName: string) => {
		try {
			setLoading({ isLoading: true, operation: 'editChat' });
			const chatRef = doc(db, 'chats', chatId);
			await updateDoc(chatRef, { name: newName });
			setLoading({ isLoading: false });
		} catch (err) {
			setError({ message: (err as Error).message, code: 'editChat' });
			throw err;
		}
	};

	const deleteChat = async (chatId: string) => {
		if (!currentUser) throw new Error('User not authenticated');
		
		const chatRef = doc(db, 'chats', chatId);
		await updateDoc(chatRef, {
			deleted: true,
			deletedBy: currentUser.uid,
			deletedAt: Timestamp.now()
		});
	};

	const getFilteredChats = () => {
		return chats.filter(chat => 
			chat.participants.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()))
		);
	};

	const sendMessage = async (text: string) => {
		if (!currentUser || !currentChat) return;

		try {
			const messageRef = collection(db, 'chats', currentChat.id, 'messages');
			await addDoc(messageRef, {
				text,
				senderId: currentUser.uid,
				timestamp: Timestamp.now()
			});

			// Update the chat's last message
			const chatRef = doc(db, 'chats', currentChat.id);
			await updateDoc(chatRef, {
				lastMessage: text,
				lastMessageTime: Timestamp.now()
			});
		} catch (error) {
			console.error('Error sending message:', error);
			throw error;
		}
	};

	const value = {
		chats,
		currentChat,
		searchQuery,
		error,
		loading,
		addMessage,
		createNewChat,
		setCurrentChat,
		editChat,
		deleteChat,
		setSearchQuery,
		getFilteredChats,
		clearError,
		sendMessage,
	};

	return (
		<ChatContext.Provider value={value}>
			{children}
		</ChatContext.Provider>
	);
};

export const useChat = () => {
	const context = useContext(ChatContext);
	if (!context) {
		throw new Error("useChat must be used within a ChatProvider");
	}
	return context;
};
