import { FC } from "react";

interface Message {
	sender: string;
	text: string;
}

interface ChatWindowProps {
	messages: Message[];
}

const ChatWindow: FC<ChatWindowProps> = ({ messages }) => {
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
