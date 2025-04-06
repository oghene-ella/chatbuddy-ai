import { Timestamp } from 'firebase/firestore';

export interface User {
    name: string;
    profilePic?: string;
}

export interface Chat {
    id: string;
    participants: string[];
    messages: Message[];
    lastMessage: string;
    lastMessageTime: Timestamp;
}

export interface Message {
    id: string;
    text: string;
    senderId: string;
    timestamp: Timestamp;
}

export interface ErrorState {
    message: string;
    code: string;
}

export interface LoadingState {
    isLoading: boolean;
    operation?: string;
}

export interface ChatContextType {
    chats: Chat[];
    currentChat: Chat | null;
    loading: LoadingState;
    sendMessage: (text: string) => Promise<void>;
    setCurrentChat: (chat: Chat | null) => void;
    createNewChat: (participantId: string) => Promise<string>;
    deleteChat: (chatId: string) => Promise<void>;
    addMessage: (chatId: string, message: Message) => Promise<void>;
    editChat: (chatId: string, newName: string) => Promise<void>;
    setSearchQuery: (query: string) => void;
    getFilteredChats: () => Chat[];
    clearError: () => void;
    searchQuery: string;
    error: ErrorState | null;
}

export interface SidebarProps {
    user: User;
    chats: Chat[];
    selectedChatId: string | null;
    onSearch: (query: string) => void;
    onNewChat: () => void;
    onSelectChat: (chatId: string) => void;
    onEditChat: (chatId: string, newName: string) => void;
    onDeleteChat: (chatId: string) => void;
}

export interface MainContentProps {
    user: User;
    selectedChat?: Chat;
}

export interface ChatInputProps {
    onSendMessage: (message: string) => void;
}

export interface ChatWindowProps {
    messages: Message[];
}

export interface ModelSelectorProps {
    models: string[];
    selectedModel: string;
    onSelectModel: (model: string) => void;
} 