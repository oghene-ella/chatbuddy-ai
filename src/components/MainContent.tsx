import { FC, useState } from "react";
import ChatInput from "./Main/ChatInput";
import ChatWindow from "./Main/ChatBlock";
import ModelSelector from "./Main/Model";
import UserProfile from "./Navbar/UserProfile";
import { MainContentProps } from "../types/chat";
import { useChat } from "../context/ChatContext";
import { CircularProgress } from "@mui/material";
import { MODELS } from "../config/models";
import { useAuth } from "../context/AuthContext";
import { getChat } from "../services/chatService";

const MainContent: FC<MainContentProps> = ({ user, selectedChat }) => {
	const [selectedModel, setSelectedModel] = useState("Primary Model");
	const {
		loading,
		sendMessage,
		createNewChat,
		setCurrentChat,
	} = useChat();
	const { currentUser } = useAuth();

	const handleSendMessage = async (message: string) => {
		if (!message.trim() || !currentUser) {
			console.error("No user logged in or empty message");
			return;
		}

		try {
			await sendMessage(message);
		} catch (err) {
			console.error("Error sending message:", err);
		}
	};

	const handleNewChat = async () => {
		if (!currentUser) return;
		try {
			const chatId = await createNewChat("New Chat");
			const newChat = await getChat(currentUser.uid, chatId);
			if (newChat) {
				setCurrentChat(newChat);
			}
		} catch (err) {
			console.error("Error creating new chat:", err);
		}
	};

	return (
		<div className="flex flex-col w-full  h-full bg-main-content text-white p-3">
			{/* Top Bar */}
			<div className="flex flex-col-reverse md:flex-row justify-between items-end md:items-center gap-4 mb-4 ml-8 md:ml-0">
				<ModelSelector
					models={[MODELS.PRIMARY.name, MODELS.SECONDARY.name]}
					selectedModel={selectedModel}
					onSelectModel={setSelectedModel}
				/>
				<UserProfile displayName={user.profilePic} />
			</div>
			
			<div className="flex-1 overflow-y-auto ">
				{loading.isLoading ? (
					<div className="flex justify-center items-center h-full">
						<CircularProgress />
					</div>
				) : selectedChat ? (
					<div className="flex flex-col h-full w-full">
						<ChatWindow messages={selectedChat.messages} />
						<ChatInput onSendMessage={handleSendMessage} />
					</div>
				) : (
					<div className="flex flex-col items-center justify-center h-full px-4 text-center">
						<h2 className="text-2xl font-bold mb-4">
							Welcome to ChatBuddy AI
						</h2>
						<p className="text-gray-400 mb-8 max-w-md">
							Start a new conversation or select an existing chat
						</p>
						<button
							onClick={handleNewChat}
							className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 w-full sm:w-auto"
						>
							Start New Chat
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default MainContent;
