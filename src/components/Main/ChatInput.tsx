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

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	return (
		<div className="flex items-center gap-2 p-4 bg-gray-800 border-t border-gray-700">
			<input
				type="text"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				onKeyDown={handleKeyDown}
				className="flex-1 p-3 rounded-xl bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
				placeholder="Type a message..."
			/>
			<button
				className={`p-3 rounded-xl transition-all duration-200 ${
					isLoading || !message.trim()
						? 'bg-gray-600 text-gray-400 cursor-not-allowed'
						: 'bg-blue-600 text-white hover:bg-blue-700'
				}`}
				onClick={handleSendMessage}
				disabled={isLoading || !message.trim()}
			>
				{isLoading ? (
					<CachedOutlined className="animate-spin" />
				) : (
					<Send />
				)}
			</button>
		</div>
	);
};

export default ChatInput;
