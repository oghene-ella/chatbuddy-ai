import { FC } from "react";
import { Edit as EditIcon } from "@mui/icons-material";

interface NewChatButtonProps {
	onNewChat: () => void;
}

const NewChatButton: FC<NewChatButtonProps> = ({ onNewChat }) => {
	return (
		<button
			onClick={onNewChat}
			className="text-white rounded-lg"
		>
			<EditIcon fontSize="small" />
		</button>
	);
};

export default NewChatButton;
