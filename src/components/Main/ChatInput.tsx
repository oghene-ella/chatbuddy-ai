import { Send, CachedOutlined } from "@mui/icons-material";
import { FC, useState } from "react";
import { ChatInputProps } from "../../types/chat";

const ChatInput: FC<ChatInputProps> = ({ onSendMessage }) => {
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSendMessage = async () => {
		if (message.trim()) {
			setIsLoading(true);
			await onSendMessage(message);
			setMessage("");
			setIsLoading(false);
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
				disabled={isLoading}
			>
				{isLoading ? <CachedOutlined /> : <Send />}
			</button>
		</div>
	);
};

export default ChatInput;
