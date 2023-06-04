import React, { createContext, useState } from "react";

export const NewsContext = createContext({
	newsData: {},
	setNewsData: () => null,
	currentPage: 0,
	setCurrentPage: () => null,
	search: "",
	setSearch: () => null,
});

export default function NewsProvider({ children }) {
	const [newsData, setNewsData] = useState({});
	const [currentPage, setCurrentPage] = useState(0);
	const [search, setSearch] = useState("");

	return (
		<NewsContext.Provider
			value={{
				newsData,
				setNewsData,
				currentPage,
				setCurrentPage,
				search,
				setSearch,
			}}
		>
			{children}
		</NewsContext.Provider>
	);
}
