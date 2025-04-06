import { useState } from "react";
import MainContent from "../components/MainContent";
import Sidebar from "../components/Sidebar";
import { Timestamp } from "firebase/firestore";
import { Chat } from "../types/chat";
import UserProfile from "../components/Navbar/UserProfile"

const Home: React.FC = () => {
	const [chats, setChats] = useState<Chat[]>([]);
	const [selectedChat, setSelectedChat] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>("");


	const handleSearch = (query: string) => {
		setSearchQuery(query);
		const filteredChats = chats.filter((chat) =>
			chat.lastMessage.toLowerCase().includes(query.toLowerCase()),
		);
		if (filteredChats.length > 0 && !selectedChat) {
			setSelectedChat(filteredChats[0].id);
		}
	};

	const handleNewChat = () => {
		const newChat: Chat = {
			id: Date.now().toString(),
			participants: [],
			messages: [],
			lastMessage: "New Chat",
			lastMessageTime: Timestamp.now(),
		};
		setChats([...chats, newChat]);
		setSelectedChat(newChat.id);
	};

	const handleSelectChat = (chatId: string) => {
		setSelectedChat(chatId);
	};

	const handleEditChat = (chatId: string, newName: string) => {
		setChats(
			chats.map((chat) =>
				chat.id === chatId ? { ...chat, name: newName } : chat,
			),
		);
	};
	const handleDeleteChat = (chatId: string) =>
		setChats(chats.filter((chat) => chat.id !== chatId));

	return (
		<section className="flex">
			<Sidebar
				user={UserProfile}
				chats={chats.filter((chat) =>
					chat.lastMessage
						.toLowerCase()
						.includes(searchQuery.toLowerCase()),
				)}
				selectedChatId={selectedChat}
				onSearch={handleSearch}
				onNewChat={handleNewChat}
				onSelectChat={handleSelectChat}
				onEditChat={handleEditChat}
				onDeleteChat={handleDeleteChat}
			/>
			<MainContent
				user={UserProfile}
				selectedChat={chats.find((chat) => chat.id === selectedChat)}
			/>
		</section>
	);
};

export default Home;
