// src/components/MainContent/ChatInput.tsx
import { Send } from "@mui/icons-material";
import { FC, useState } from "react";

interface ChatInputProps {
	onSendMessage: (message: string) => void;
}

const ChatInput: FC<ChatInputProps> = ({ onSendMessage }) => {
	const [message, setMessage] = useState("");

	const handleSendMessage = () => {
		if (message.trim()) {
			onSendMessage(message);
			setMessage("");
		}
	};

	return (
		<div className="flex items-center gap-3 p-2 border-t">
			<input
				type="text"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				className="p-2 w-full rounded-lg  outline-none"
                color="white"
				placeholder="Type a message..."
			/>
			<button
				className="bg-blue-500 text-white p-2 rounded-lg"
				onClick={handleSendMessage}
			>
				<Send/>
			</button>
		</div>
	);
};

export default ChatInput;
