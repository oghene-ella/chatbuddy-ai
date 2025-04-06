import { FC } from "react";
import { ChatWindowProps, Message } from "../../types/chat";

const ChatWindow: FC<ChatWindowProps> = ({ messages }) => {
	if (!messages) {
		return <div className="text-red-500">Error loading messages.</div>;
	}

	return (
		<div className="p-4 overflow-y-auto h-[calc(100vh-200px)]">
			{messages.length === 0 ? (
				<div className="text-center text-gray-500">
					Hello there👋🏼! You can start a chat.
				</div>
			) : (
				messages.map((message, index) => (
					<div key={index} className="flex gap-2 my-2">
						<span className="font-bold">{message.sender}:</span>
						<span>{message.text}</span>
					</div>
				))
			)}
		</div>
	);
};

export default ChatWindow;
