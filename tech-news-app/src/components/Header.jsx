import React, { useContext, useEffect, useState } from "react";
import { NewsContext } from "../contexts/News";

export default function Header() {
	const [onSearch, setOnSearch] = useState("");
	const { setSearch } = useContext(NewsContext);

	useEffect(() => {
		// debounce is technique which is used to save cpu cycle or api calls.
		// It adds delay in call which allow us set changes for used as desired.
		const debounce = setTimeout(() => {
			setSearch(onSearch);
		}, 2000);

		return () => clearTimeout(debounce);
	}, [onSearch]);

	return (
		<div className="flex flex-col p-3 items-center">
			<h1 className="text-5xl mt-2 mb-8 text-white">Tech News App</h1>
			<input
				type="search"
				placeholder="Search"
				className="rounded-lg px-2 py-1 m-1 w-[90vw] lg:w-[25vw] sm:px-3 outline-none"
				onChange={(e) => setOnSearch(e.target.value)}
				value={onSearch}
			/>
		</div>
	);
}
