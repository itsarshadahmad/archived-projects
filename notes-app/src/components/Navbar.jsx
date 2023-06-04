import { useState } from "react";

export default function Navbar() {
	const [search, setSearch] = useState("");

	return (
		<div className="flex sm:justify-between flex-col sm:flex-row items-center justify-center bg-[#18122B] w-[100vw] py-1 px-5">
			<h3 className="text-3xl m-2 text-white font-bold">Notes App</h3>
			<input
				type="search"
				placeholder="Search"
				className="py-0.5 px-2 rounded-lg w-[90vw] sm:w-auto"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
		</div>
	);
}
