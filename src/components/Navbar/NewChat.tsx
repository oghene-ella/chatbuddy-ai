import { FC } from "react";
import EditIcon from "@mui/icons-material/Edit";

interface NewChatButtonProps {
	onNewChat: () => void;
}

const NewChatButton: FC<NewChatButtonProps> = ({ onNewChat }) => {
	return (
		<button
			onClick={onNewChat}
			className=" text-white rounded-lg "
		>
			<EditIcon fontSize="small" />
		</button>
	);
};

export default NewChatButton;
