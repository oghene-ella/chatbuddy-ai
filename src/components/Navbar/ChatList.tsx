import { FC } from "react";
import ChatItem from "./ChatItems";
import { Chat } from "../../types/chat";

interface ChatListProps {
	chats: Chat[];
	onSelectChat: (chatId: string) => void;
	onEditChat: (chatId: string, newName: string) => void;
	onDeleteChat: (chatId: string) => void;
}

const ChatList: FC<ChatListProps> = ({
	chats,
	onSelectChat,
	onEditChat,
	onDeleteChat,
}) => {
	return (
		<div className="flex flex-col space-y-2 gap-3 px-3">
			{chats.map((chat) => chat.id && (
				<ChatItem
					key={chat.id}
					chatId={chat.id}
					name={chat.chatName || "New Chat"}
					onSelectChat={onSelectChat}
					onEditChat={onEditChat}
					onDeleteChat={onDeleteChat}
				/>
			))}
		</div>
	);
};

export default ChatList;
