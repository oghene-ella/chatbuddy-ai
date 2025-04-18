import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Chat, Message, ChatContextType, ErrorState, LoadingState } from "../types/chat";
import { useAuth } from './AuthContext';
import { getChats, saveMessage, initializeChat, updateChatName, deleteChat as deleteChatService, subscribeToMessages, getChat, subscribeToChatUpdates } from '../services/chatService';
import { Timestamp } from 'firebase/firestore';
import FetchModels from '../components/Main/FetchModels';
import { MODELS } from '../config/models';

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [currentChat, setCurrentChat] = useState<Chat | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [error, setError] = useState<ErrorState | null>(null);
    const [loading, setLoading] = useState<LoadingState>({ isLoading: true });
    const [selectedModel, setSelectedModel] = useState<string>(MODELS.PRIMARY.name);
    const { currentUser } = useAuth();

    useEffect(() => {
        if (!currentUser) {
            setChats([]);
            setCurrentChat(null);
            setLoading({ isLoading: false });
            return;
        }

        const loadChats = async () => {
            try {
                setLoading({ isLoading: true });
                const userChats = await getChats(currentUser.uid);
                
                if (userChats.length === 0) {
                    const chatId = await initializeChat(currentUser.uid, 'New Chat');
                    const newChat = await getChat(currentUser.uid, chatId);
                    if (newChat) {
                        setChats([newChat]);
                        setCurrentChat(newChat);
                    }
                } else {
                    setChats(userChats);
                }
                
                setLoading({ isLoading: false });
            } catch (err) {
                setError({ message: (err as Error).message, code: 'loadChats' });
                setLoading({ isLoading: false });
            }
        };

        loadChats();
    }, [currentUser]);


    useEffect(() => {
        if (!currentUser) return;

        const unsubscribe = subscribeToChatUpdates(currentUser.uid, (updatedChats) => {
            setChats(updatedChats);
        });

        return () => unsubscribe();
    }, [currentUser]);

    useEffect(() => {
        if (!currentUser || !currentChat?.id) return;

        const unsubscribe = subscribeToMessages(currentUser.uid, currentChat.id, (messages) => {
            setCurrentChat(prev => prev ? { ...prev, messages } : null);
        });

        return () => unsubscribe();
    }, [currentUser, currentChat?.id]);

    const clearError = () => setError(null);

    const createNewChat = async (chatName: string): Promise<string> => {
        if (!currentUser) throw new Error('User not authenticated');

        try {
            setLoading({ isLoading: true, operation: 'createChat' });
            const chatId = await initializeChat(currentUser.uid, chatName);
            setLoading({ isLoading: false });
            return chatId;
        } catch (err) {
            setError({ message: (err as Error).message, code: 'createChat' });
            throw err;
        }
    };

    const addMessage = async (chatId: string, message: Message) => {
        if (!currentUser) throw new Error('User not authenticated');

        try {
            setLoading({ isLoading: true, operation: 'addMessage' });
            await saveMessage(currentUser.uid, chatId, message);
            setLoading({ isLoading: false });
        } catch (err) {
            setError({ message: (err as Error).message, code: 'addMessage' });
            throw err;
        }
    };

    const editChat = async (chatId: string, newName: string) => {
        if (!currentUser) throw new Error('User not authenticated');

        try {
            setLoading({ isLoading: true, operation: 'editChat' });
            await updateChatName(currentUser.uid, chatId, newName);
            
            setChats(prevChats => 
                prevChats.map(chat => 
                    chat.id === chatId 
                        ? { ...chat, chatName: newName }
                        : chat
                )
            );

            // Update current chat if it's the one being edited
            if (currentChat?.id === chatId) {
                setCurrentChat(prev => prev ? { ...prev, chatName: newName } : null);
            }

            setLoading({ isLoading: false });
        } catch (err) {
            setError({ message: (err as Error).message, code: 'editChat' });
            throw err;
        }
    };

    const deleteChat = async (chatId: string) => {
        if (!currentUser) throw new Error('User not authenticated');
        
        try {
            setLoading({ isLoading: true, operation: 'deleteChat' });
            await deleteChatService(currentUser.uid, chatId);
            if (currentChat?.id === chatId) {
                setCurrentChat(null);
            }
            setLoading({ isLoading: false });
        } catch (err) {
            setError({ message: (err as Error).message, code: 'deleteChat' });
            throw err;
        }
    };

    const getFilteredChats = () => {
        return chats.filter(chat => 
            chat.chatName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const sendMessage = async (text: string) => {
        if (!currentUser || !currentChat) return;

        try {
            // Add user message
            const userMessage: Message = {
                id: '', 
                text,
                senderId: currentUser.uid,
                timestamp: Timestamp.now(),
                type: 'user'
            };
            
            // Add user message immediately for instant feedback
            setCurrentChat(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    messages: [...prev.messages, userMessage]
                };
            });

            const chatId = currentChat?.id;
            if (!chatId) throw new Error('Chat ID is missing');
            
            await addMessage(chatId, userMessage);

            const aiResponse = await FetchModels(selectedModel, text);
            
            const aiMessage: Message = {
                id: '', 
                text: aiResponse.choices[0].message.content,
                senderId: 'ai',
                timestamp: Timestamp.now(),
                type: 'ai'
            };

            // Add AI message immediately for instant feedback
            setCurrentChat(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    messages: [...prev.messages, aiMessage]
                };
            });

            await addMessage(chatId, aiMessage);
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
        selectedModel,
        setSelectedModel,
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