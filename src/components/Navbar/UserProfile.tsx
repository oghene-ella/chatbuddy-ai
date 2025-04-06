import { FC, useState, useEffect } from "react";
import { auth, db } from "../../config/firebase";
import { getDoc, doc } from "firebase/firestore";

interface UserProfileProps {
	userId?: string;
	displayName?: string;
}

const UserProfile: FC<UserProfileProps> = ({ displayName, userId }) => {
	const [name, setName] = useState<string | undefined>(undefined);
	const [profilePic, setProfilePic] = useState<string | undefined>(undefined);

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const currentUser = userId || auth.currentUser?.uid;
				if (!currentUser) return;

				const userDocRef = doc(db, "users", currentUser);
				const userDoc = await getDoc(userDocRef);

				if (userDoc.exists()) {
					const userData = userDoc.data();
					setName(userData?.name);
					setProfilePic(userData?.profilePic);
				}
			} catch (error) {
				console.error("Error fetching user profile:", error);
			}
		};

		fetchUserProfile();
	}, [userId, displayName]);

	const extractNameFromEmail = (email?: string | null) => {
		if (!email) return "User";
		return email.split("@")[0];
	};

	const getInitial = (email?: string | null) => {
		if (!email) return "?";
		return email.charAt(0).toUpperCase();
	};

	return (
		<div className="flex items-center space-x-2">
			{profilePic ? (
				<img
					src={profilePic}
					alt="Profile"
					className="w-10 h-10 rounded-full"
				/>
			) : (
				<div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center font-semibold text-lg">
					{getInitial(auth.currentUser?.email)}
				</div>
			)}
			<span>{name || extractNameFromEmail(auth.currentUser?.email)}</span>
		</div>
	);
};

export default UserProfile;
