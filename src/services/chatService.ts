import { 
    collection, 
    query, 
    orderBy, 
    addDoc, 
    onSnapshot, 
    Timestamp, 
    doc, 
    updateDoc, 
    deleteDoc, 
    getDocs,
    getDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Chat, Message } from '../types/chat';

// Get all chats for a user
export const getChats = async (userId: string): Promise<Chat[]> => {
    try {
        const userChatsRef = collection(db, 'users', userId, 'chats');
        const q = query(userChatsRef, orderBy('lastMessageTime', 'desc'));
        const snapshot = await getDocs(q);
        
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Chat));
    } catch (error) {
        console.error('Error getting chats:', error);
        throw error;
    }
};

// Initialize a new chat
export const initializeChat = async (userId: string, chatName: string): Promise<string> => {
    try {
        const userChatsRef = collection(db, 'users', userId, 'chats');
        const newChat: Chat = {
            participants: [userId],
            chatName,
            messages: [],
            lastMessage: '',
            lastMessageTime: Timestamp.now(),
            createdAt: Timestamp.now()
        };

        const docRef = await addDoc(userChatsRef, newChat);
        console.log('Created new chat:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error creating chat:', error);
        throw error;
    }
};

// Save a message to a chat
export const saveMessage = async (userId: string, chatId: string, message: Message): Promise<void> => {
    try {
        const chatRef = doc(db, 'users', userId, 'chats', chatId);
        const chatDoc = await getDoc(chatRef);
        
        if (!chatDoc.exists()) {
            throw new Error('Chat not found');
        }

        const chatData = chatDoc.data();
        const updatedMessages = [...(chatData.messages || []), message];
        
        const words = message.text.split(' ').slice(0, 3).join(' ');

        await updateDoc(chatRef, {
            messages: updatedMessages,
            lastMessage: message.text,
            lastMessageTime: message.timestamp,
            lastMessageSender: message.senderId === userId ? 'user' : 'ai',
            ...(chatData.messages?.length === 0 ? { chatName: words } : {})
        });
    } catch (error) {
        console.error('Error saving message:', error);
        throw error;
    }
};

// Update chat name
export const updateChatName = async (userId: string, chatId: string, newName: string): Promise<void> => {
    try {
        const chatRef = doc(db, 'users', userId, 'chats', chatId);
        await updateDoc(chatRef, { chatName: newName });
    } catch (error) {
        console.error('Error updating chat name:', error);
        throw error;
    }
};

// Delete a chat
export const deleteChat = async (userId: string, chatId: string): Promise<void> => {
    try {
        const chatRef = doc(db, 'users', userId, 'chats', chatId);
        await deleteDoc(chatRef);
    } catch (error) {
        console.error('Error deleting chat:', error);
        throw error;
    }
};

//  messages in a chat
export const subscribeToMessages = (userId: string, chatId: string, callback: (messages: Message[]) => void) => {
    const chatRef = doc(db, 'users', userId, 'chats', chatId);
    
    return onSnapshot(chatRef, (doc) => {
        if (doc.exists()) {
            const data = doc.data();
            callback(data.messages || []);
        }
    }, (error) => {
        console.error('Error subscribing to messages:', error);
    });
};

export const subscribeToChatUpdates = (userId: string, callback: (chats: Chat[]) => void) => {
    const userChatsRef = collection(db, 'users', userId, 'chats');
    const q = query(userChatsRef, orderBy('lastMessageTime', 'desc'));
    
    return onSnapshot(q, (snapshot) => {
        const updatedChats = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Chat));
        callback(updatedChats);
    }, (error) => {
        console.error('Error subscribing to chat updates:', error);
    });
};

// Get a single chat
export const getChat = async (userId: string, chatId: string): Promise<Chat | null> => {
    try {
        const chatRef = doc(db, 'users', userId, 'chats', chatId);
        const chatDoc = await getDoc(chatRef);
        
        if (!chatDoc.exists()) {
            return null;
        }

        return {
            id: chatDoc.id,
            ...chatDoc.data()
        } as Chat;
    } catch (error) {
        console.error('Error getting chat:', error);
        throw error;
    }
}; 