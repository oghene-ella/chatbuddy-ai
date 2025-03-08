import { FC } from "react";

interface UserProfileProps {
	name?: string;
	profilePic?: string;
}

const UserProfile: FC<UserProfileProps> = ({ name, profilePic }) => {
	return (
		<div className="flex items-center space-x-2">
			<img
				src={profilePic}
				alt="Profile"
				className="w-10 h-10 rounded-full"
			/>
			<span>{name}</span>
		</div>
	);
};

export default UserProfile;
