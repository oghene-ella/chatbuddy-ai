import { FC, useState, useEffect } from "react";

interface SearchBarProps {
	onSearch: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
	const [query, setQuery] = useState("");

	// Debounce search to avoid too many updates
	useEffect(() => {
		const timer = setTimeout(() => {
			onSearch(query);
		}, 300);

		return () => clearTimeout(timer);
	}, [query, onSearch]);

	return (
		<div className="relative mb-4">
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Search chats..."
				className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
			/>
			<button
				onClick={() => onSearch(query)}
				className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
			>
				🔍
			</button>
		</div>
	);
};

export default SearchBar;
