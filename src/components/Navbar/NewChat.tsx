import { FC, useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";

interface NewChatProps {
	onNewChat: (chatName: string) => void;
}

const NewChat: FC<NewChatProps> = ({ onNewChat }) => {
	const [open, setOpen] = useState(false);
	const [chatName, setChatName] = useState("");

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		setChatName("");
	};

	const handleSubmit = async () => {
		if (chatName.trim()) {
			await onNewChat(chatName);
			handleClose();
		}
	};

	return (
		<>
			<button
				onClick={handleOpen}
				className="text-white rounded-lg"
			>
				<EditIcon fontSize="small" />
			</button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Create New Chat</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						label="Chat Name"
						type="text"
						fullWidth
						value={chatName}
						onChange={(e) => setChatName(e.target.value)}
						onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSubmit} color="primary">
						Create
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default NewChat;
