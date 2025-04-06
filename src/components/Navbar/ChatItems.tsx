import { FC, useState } from "react";

interface ChatItemProps {
	chatId: string;
	name: string;
	onSelectChat: (chatId: string) => void;
	onEditChat: (chatId: string, newName: string) => void;
	onDeleteChat: (chatId: string) => void;
}

const ChatItem: FC<ChatItemProps> = ({
	chatId,
	name,
	onSelectChat,
	onEditChat,
	onDeleteChat,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [newName, setNewName] = useState(name);

	const handleSaveEdit = () => {
		onEditChat(chatId, newName);
		setIsEditing(false);
	};

	return (
		<section className="flex items-center justify-between p-2 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700">
			{isEditing ? (
				<input
					type="text"
					value={newName}
					onChange={(e) => setNewName(e.target.value)}
					className="bg-gray-700 text-white px-2 py-1 rounded-md outline-none"
				/>
			) : (
				<section
					onClick={() => onSelectChat(chatId)}
					className="flex-1 truncate"
				>
					{name}
				</section>
			)}

			<section className="flex space-x-2">
				{isEditing ? (
					<button onClick={handleSaveEdit} className="text-green-400">
						✔
					</button>
				) : (
					<button
						onClick={() => setIsEditing(true)}
						className="text-yellow-400"
					>
						✏
					</button>
				)}
				<button
					onClick={() => onDeleteChat(chatId)}
					className="text-red-400"
				>
					🗑
				</button>
			</section>
		</section>
	);
};

export default ChatItem;
