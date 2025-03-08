import MainContent from "../components/MainContent"
import Sidebar from "../components/Sidebar"
import { useState } from "react";

import profile from "../assets/boy.png"

interface Chat {
    id: string;
    name: string;
}

const Home: React.FC = () => {
	const [chats, setChats] = useState<Chat[]>([]);
	const user = { name: "Felix Awa", profilePic: `${profile}` };

	const handleSearch = (query: string) => console.log("Search:", query);
	const handleNewChat = () =>
		setChats([...chats, { id: Date.now().toString(), name: "New Chat" }]);
	const handleSelectChat = (chatId: string) =>
		console.log("Chat selected:", chatId);
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
				user={user}
				chats={chats}
				onSearch={handleSearch}
				onNewChat={handleNewChat}
				onSelectChat={handleSelectChat}
				onEditChat={handleEditChat}
				onDeleteChat={handleDeleteChat}
			/>
			<MainContent user={user} />
		</section>
	);
};

export default Home