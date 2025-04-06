import { FC, useState } from "react";
import ChatInput from "./Main/ChatInput";
import ChatWindow from "./Main/ChatBlock";
import ModelSelector from "./Main/Model";
import UserProfile from "./Navbar/UserProfile";
import FetchModels from "./Main/FetchModels";
import { MainContentProps, Message } from "../types/chat";
import { useChat } from "../context/ChatContext";
import { CircularProgress, Alert } from "@mui/material";
import { Timestamp } from 'firebase/firestore';

const MainContent: FC<MainContentProps> = ({ user, selectedChat }) => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [selectedModel, setSelectedModel] = useState("GPT-3");
	const { error, loading, clearError } = useChat();

	const handleSendMessage = async (message: string) => {
		if (!message.trim()) return;

		try {
			const newMessage: Message = { 
				id: Date.now().toString(),
				senderId: "user",
				text: message,
				timestamp: Timestamp.now()
			};
			setMessages((prevMessages) => [...prevMessages, newMessage]);

			const aiResponse = await FetchModels(selectedModel, message);
			const aiMessage: Message = {
				id: Date.now().toString(),
				senderId: "ai",
				text: aiResponse.choices[0].text,
				timestamp: Timestamp.now()
			};
			setMessages((prevMessages) => [...prevMessages, aiMessage]);
		} catch (err) {
			console.error("Error sending message:", err);
		}
	};

	return (
		<div className="flex flex-col w-full p-4 bg-main-content text-white">
			{error && (
				<Alert severity="error" onClose={clearError} className="mb-4">
					{error.message}
				</Alert>
			)}
			<span className="flex justify-between">
				<ModelSelector
					models={["GPT-3", "Gemini AI"]}
					selectedModel={selectedModel}
					onSelectModel={setSelectedModel}
				/>
				<UserProfile displayName={user.profilePic} />
			</span>
			{loading.isLoading ? (
				<div className="flex justify-center items-center h-[calc(100vh-200px)]">
					<CircularProgress />
				</div>
			) : (
				<ChatWindow messages={messages} />
			)}
			<ChatInput onSendMessage={handleSendMessage} />
		</div>
	);
};

export default MainContent;
