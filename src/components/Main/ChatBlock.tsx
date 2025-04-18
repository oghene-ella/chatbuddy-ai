import { FC } from "react";
import { ChatWindowProps } from "../../types/chat";

const ChatWindow: FC<ChatWindowProps> = ({ messages }) => {
	if (!messages) {
		return <div className="text-red-500">Error loading messages.</div>;
	}

	return (
		<div className="flex-1 overflow-y-auto p-4 space-y-4 w-full">
			{messages.length === 0 ? (
				<div className="flex items-center justify-center h-full">
					<div className="text-center text-gray-400">
						<p className="text-lg mb-2">Hello there! 👋</p>
						<p className="text-sm">Start a new conversation</p>
					</div>
				</div>
			) : (
				messages.map((message, index) => (
					<div 
						key={index} 
						className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
					>
						<div 
							className={`max-w-[85%] md:max-w-[75%] lg:max-w-[65%] p-4 rounded-2xl ${
								message.type === 'user' 
									? 'bg-blue-600 text-white rounded-tr-none' 
									: 'bg-gray-700 text-white rounded-tl-none'
							}`}
						>
							<div className="font-medium mb-1 text-sm opacity-80">
								{message.type === 'user' ? 'You' : 'AI Assistant'}
							</div>
							<div className="whitespace-pre-wrap break-words text-sm">
								{message.text}
							</div>
						</div>
					</div>
				))
			)}
		</div>
	);
};

export default ChatWindow;
