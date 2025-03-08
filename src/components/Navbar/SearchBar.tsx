import { FC, useState } from "react";

interface SearchBarProps {
	onSearch: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
	const [query, setQuery] = useState("");

	const handleSearch = () => {
		onSearch(query);
	};

	return (
		<div className="relative mb-4">
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Search chats..."
				className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white outline-none"
			/>
			<button
				onClick={handleSearch}
				className="absolute right-2 top-2 text-white"
			>
				🔍
			</button>
		</div>
	);
};

export default SearchBar;
