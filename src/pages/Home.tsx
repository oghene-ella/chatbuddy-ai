import { FC, useCallback, useMemo } from "react";
import MainContent from "../components/MainContent";
import Sidebar from "../components/Sidebar";
import { useChat } from "../context/ChatContext";
import UserProfile from "../components/Navbar/UserProfile";
import { useState, useEffect } from "react";

const Home: FC = () => {
	const { 
		chats, 
		currentChat, 
		searchQuery, 
		setSearchQuery, 
		createNewChat, 
		setCurrentChat, 
		editChat, 
		deleteChat,
		getFilteredChats
	} = useChat();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	useEffect(() => {
		if (currentChat && window.innerWidth < 768) {
			setIsSidebarOpen(false);
		}
	}, [currentChat]);


	const filteredChats = useMemo(() => getFilteredChats(), [chats, searchQuery]);

	const handleSearch = useCallback((query: string) => {
		setSearchQuery(query);
	}, [setSearchQuery]);

	const handleNewChat = useCallback(async (chatName: string) => {
		const chatId = await createNewChat(chatName);
		setCurrentChat(chats.find(chat => chat.id === chatId) || null);
	}, [createNewChat, chats, setCurrentChat]);

	const handleSelectChat = useCallback((chatId: string) => {
		setCurrentChat(chats.find(chat => chat.id === chatId) || null);
	}, [chats, setCurrentChat]);

	const handleEditChat = useCallback((chatId: string, newName: string) => {
		editChat(chatId, newName);
	}, [editChat]);

	const handleDeleteChat = useCallback((chatId: string) => {
		deleteChat(chatId);
	}, [deleteChat]);

	return (
		<div className="flex min-h-max bg-gray-900">
			{/* Mobile Sidebar Toggle */}
			<button
				onClick={() => setIsSidebarOpen(!isSidebarOpen)}
				className="md:hidden fixed top-4 left-4 z-50 mr-4 p-2 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition-colors"
			>
				{isSidebarOpen ? "✕" : "☰"}
			</button>


			{/* Sidebar */}
			<aside
				className={`fixed md:static top-0 left-0 z-50 h-full w-64 md:w-72 lg:w-80 text-white transform transition-transform duration-300 ease-in-out ${
					isSidebarOpen
						? `translate-x-0`
						: "-translate-x-full md:translate-x-0"
				}`}
			>
				<Sidebar
					user={UserProfile}
					chats={filteredChats}
					selectedChatId={currentChat?.id || null}
					onSearch={handleSearch}
					onNewChat={handleNewChat}
					onSelectChat={handleSelectChat}
					onEditChat={handleEditChat}
					onDeleteChat={handleDeleteChat}
					isSidebarOpen={isSidebarOpen}
					setIsSidebarOpen={setIsSidebarOpen}
				/>
			</aside>

			{/* Main Content */}
			<main className="flex-1 h-full overflow-hidden">
				<MainContent
					user={UserProfile}
					selectedChat={currentChat || undefined}
				/>
			</main>
		</div>
	);
};

export default Home;
