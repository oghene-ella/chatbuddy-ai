import { FC, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

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
	const [editedName, setEditedName] = useState(name);

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSave = () => {
		onEditChat(chatId, editedName);
		setIsEditing(false);
	};

	const handleCancel = () => {
		setEditedName(name);
		setIsEditing(false);
	};

	return (
		<div className="flex items-center justify-between p-2 hover:bg-gray-700 rounded-lg">
			{isEditing ? (
				<div className="flex items-center gap-2 flex-1">
					<TextField
						value={editedName}
						onChange={(e) => setEditedName(e.target.value)}
						size="small"
						fullWidth
						className="bg-gray-800"
						InputProps={{
							className: "text-white",
						}}
					/>
					<IconButton onClick={handleSave} size="small">
						<CheckIcon className="text-green-500" />
					</IconButton>
					<IconButton onClick={handleCancel} size="small">
						<CloseIcon className="text-red-500" />
					</IconButton>
				</div>
			) : (
				<>
					<button
						onClick={() => onSelectChat(chatId)}
						className="flex-1 text-left truncate"
					>
						{name}
					</button>
					<div className="flex gap-1">
						<IconButton onClick={handleEdit} size="small">
							<EditIcon className="text-gray-400" />
						</IconButton>
						<IconButton onClick={() => onDeleteChat(chatId)} size="small">
							<DeleteIcon className="text-red-500" />
						</IconButton>
					</div>
				</>
			)}
		</div>
	);
};

export default ChatItem;
