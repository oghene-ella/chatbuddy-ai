import { FC, useState, useEffect } from "react";
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
import AppsIcon from "@mui/icons-material/AppsOutlined";
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
				className={`bg-sidebar-bg text-white h-screen flex flex-col justify-between w-full ${
					isSidebarOpen ? " translate-x-0" : "-translate-x-full"
				} md:translate-x-0 md:relative md:w-full`}
			>
				<section className="flex flex-col justify-between gap-4">
					<div className="flex items-center justify-between mb-4">
						{/* Header */}
						<span className="flex items-center gap-3 py-5 px-3">
							<img src={favicon} className="w-8 h-8" />
							<h3 className="font-dm-sans font-bold text-md gap-2">
								ChatBuddy
							</h3>
						</span>

						{/* add new chat button */}
						<span className="flex gap-2">
							<NewChat onNewChat={onNewChat} />
							<button
								className="text-white p-2 rounded-lg"
								onClick={() => setIsSidebarOpen(!isSidebarOpen)}
							>
								{isSidebarOpen ? (
									<CloseIcon />
								) : (
									<MenuOpenIcon />
								)}
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
				<section className="flex justify-between items-end p-5">
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
