import { useContext } from "react";
import { NewsContext } from "../contexts/News";

export default function Pagination() {
	const { currentPage, setCurrentPage, newsData } = useContext(NewsContext);
	const totalPage = newsData.nbPages;

	function handleNextBtn() {
		if (currentPage < totalPage - 1) {
			setCurrentPage(newsData.page + 1);
		}
	}
	function handlePrevBtn() {
		if (currentPage > 0) {
			setCurrentPage(newsData.page - 1);
		}
	}

	return (
		<div className="flex justify-center items-baseline">
			<button
				className="bg-white py-2 px-4 m-2 mb-10 sm:text-lg rounded-lg"
				onClick={handlePrevBtn}
			>
				Prev
			</button>
			<p className="text-white sm:mx-4">
				{currentPage + 1} out of {totalPage}
			</p>
			<button
				className="bg-white py-2 px-4 m-2 mb-10 sm:text-lg rounded-lg"
				onClick={handleNextBtn}
			>
				Next
			</button>
		</div>
	);
}
