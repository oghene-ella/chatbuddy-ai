import { FC, useState } from "react";
// import { Menu, X } from "lucide-react";
import UserProfile from "./Navbar/UserProfile";
import SearchBar from "./Navbar/SearchBar";
import ChatList from "./Navbar/ChatList";
import NewChat from "./Navbar/NewChat";

import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import CloseIcon from "@mui/icons-material/Close";
import AppsIcon from "@mui/icons-material/AppsOutlined";
import favicon from "../assets/favicon.png";

interface Chat {
	id: string;
	name: string;
}

interface SidebarProps {
	user: { name: string, profilePic: string };
	chats: Chat[];
	onSearch: (query: string) => void;
	onNewChat: () => void;
	onSelectChat: (chatId: string) => void;
	onEditChat: (chatId: string, newName: string) => void;
	onDeleteChat: (chatId: string) => void;
}

const Sidebar: FC<SidebarProps> = ({
	user,
	chats,
	onSearch,
	onNewChat,
	onSelectChat,
	onEditChat,
	onDeleteChat,
}) => {
	const [showMenu, setShowMenu] = useState(false);
	console.log("Sidebar Props:", { user, chats });
	console.log("showMenu:", showMenu);

	return (
		<>
			<nav
				className={`bg-sidebar-bg text-white h-screen flex flex-col justify-between ${
					showMenu ? "translate-x-0" : "-translate-x-full"
				} md:translate-x-0 md:relative md:w-1/4`}
			>
				<section className="flex flex-col justify-between gap-4">
					<div className="flex items-center justify-between mb-4">
						{/* Header */}
						<span className="flex items-center gap-3 py-5 px-3">
							<img src={favicon} className="w-8 h-8" />
							<h3 className="font-dm-sans font-bold text-md gap-2">
								New Chat
							</h3>
						</span>

						{/* add new chat button */}
						<span className="flex gap-2">
							<NewChat onNewChat={onNewChat} />
							<button
								className="text-white p-2 rounded-lg"
								onClick={() => setShowMenu(!showMenu)}
							>
								{showMenu ? <CloseIcon /> : <MenuOpenIcon />}
							</button>
						</span>
					</div>

					{/* search bar */}
					<section className="flex flex-col gap-7 m-3">
						<SearchBar onSearch={onSearch} />
						<span className="flex items-center gap-2">
							<AppsIcon />
							<h3>Workspace</h3>
						</span>
					</section>

					<ChatList
						chats={chats}
						onSelectChat={onSelectChat}
						onEditChat={onEditChat}
						onDeleteChat={onDeleteChat}
					/>
				</section>

				{/* User profile */}
				<section className="flex items-end p-5">
					<UserProfile
						name={user.name}
						profilePic={user.profilePic}
					/>
				</section>
			</nav>

			{showMenu && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
					onClick={() => setShowMenu(false)}
				></div>
			)}
		</>
	);
};

export default Sidebar;
