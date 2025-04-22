import { FC, useEffect } from "react";
import UserProfile from "./Navbar/UserProfile";
import SearchBar from "./Navbar/SearchBar";
import ChatList from "./Navbar/ChatList";
import NewChat from "./Navbar/NewChat";
import { SidebarProps } from "../types/chat";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IconButton } from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import CloseIcon from "@mui/icons-material/Close";
import favicon from "../assets/favicon.png";
import { Logout as LogoutIcon } from "@mui/icons-material";

const Sidebar: FC<SidebarProps> = (props) => {
	const {
		user,
		chats,
		onSearch,
		onNewChat,
		onSelectChat,
		onEditChat,
		onDeleteChat,
	} = props;
	const { isSidebarOpen, setIsSidebarOpen } = props;

	console.log("Sidebar Props:", { user, chats });
	const navigate = useNavigate();
	const { currentUser, logout } = useAuth();

	useEffect(() => {
		if (!currentUser) {
			navigate("/login");
		}
	}, [currentUser, navigate]);

	const handleLogout = async () => {
		try {
			await logout();
			navigate("/login");
		} catch (error) {
			console.error("Error logging out:", error);
		}
	};

	return (
		<>
			<nav
				className={`bg-sidebar-bg text-white h-full flex flex-col justify-between w-full  gap-5 ${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full"
				} md:translate-x-0 md:relative md:w-full`}
			>
				{/* Logo + new chat button */}
				<section className="flex items-center justify-between mb-4 p-4">
					<span className="flex items-center gap-3">
						<img src={favicon} className="w-8 h-8" />
						<h3 className="font-dm-sans font-bold text-md">
							ChatBuddy
						</h3>
					</span>
					<span className="flex gap-2">
						<NewChat onNewChat={onNewChat} />
						<button
							className="text-white p-2 rounded-lg"
							onClick={() => setIsSidebarOpen(!isSidebarOpen)}
						>
							{isSidebarOpen ? <CloseIcon /> : <MenuOpenIcon />}
						</button>
					</span>
				</section>

				{/* Search */}
				<section className="px-4 pb-2">
					<SearchBar onSearch={onSearch} />
				</section>

				{/* ChatList */}
				<section className="flex-1 overflow-y-auto p-1">
					<ChatList
						chats={chats}
						onSelectChat={onSelectChat}
						onEditChat={onEditChat}
						onDeleteChat={onDeleteChat}
					/>
				</section>

				{/*  User Profile and Logout */}
				<section className="flex justify-between items-center p-4 border-t border-gray-700">
					<UserProfile
						userId={user.name}
						displayName={user.profilePic}
					/>
					<IconButton onClick={handleLogout} color="primary">
						<LogoutIcon />
					</IconButton>
				</section>
			</nav>
		</>
	);
};

export default Sidebar;
