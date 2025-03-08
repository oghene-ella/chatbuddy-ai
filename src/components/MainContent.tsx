import { FC, useState } from "react";
import ChatInput from "./Main/ChatInput";
import ChatWindow from "./Main/ChatBlock";
import ModelSelector from "./Main/Model";
import UserProfile from "./Navbar/UserProfile";

interface MainContentProps {
	user: { name: string; profilePic: string };
}

const MainContent: FC<MainContentProps> = ({ user }) => {
	const [messages, setMessages] = useState([
		{sender: "Intro", text: "Welcome! How can I help you today?" },
	]);
	const [selectedModel, setSelectedModel] = useState("GPT-3");

	const handleSendMessage = (message: string) => {
		setMessages([
			...messages,
			{ sender: user.name, text: message },
			{
				sender: `Response from ${selectedModel}`,
				text: `${message}`,
			},
		]);
	};

	return (
		<div className="flex flex-col w-full p-4 bg-main-content text-white">
			<span className="flex justify-between">
				<ModelSelector
					models={["GPT-3", "GPT-4", "Gemini AI"]}
					selectedModel={selectedModel}
					onSelectModel={setSelectedModel}
				/>
				<UserProfile profilePic={user.profilePic} />
			</span>
			<ChatWindow messages={messages} />
			<ChatInput onSendMessage={handleSendMessage} />
		</div>
	);
};

export default MainContent;
