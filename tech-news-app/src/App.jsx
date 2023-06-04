import { useContext, useEffect, useState } from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import { NewsContext } from "./contexts/News";

function App() {
	const { newsData, setNewsData, currentPage, search } =
		useContext(NewsContext);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const URL = `https://hn.algolia.com/api/v1/search?query=${search}&page=${currentPage}`;
		setIsLoaded(false);

		fetch(`${URL}&page=${currentPage}`)
			.then((res) => res.json())
			.then((data) => {
				setNewsData(data);
				setIsLoaded(true);
			});
	}, [search, currentPage]);

	return (
		<div className="bg-[#474E68]">
			<Header />
			{isLoaded ? (
				<div>
					<div className="flex flex-col justify-center items-center m-5">
						{newsData.hits.map((value, index) => {
							return value.title ? (
								<Card article={value} key={index} />
							) : null;
						})}
					</div>
					<Pagination />
				</div>
			) : (
				<h1 className="text-5xl mt-36 text-center text-white">
					Loading...
				</h1>
			)}
		</div>
	);
}

export default App;

// https://colorhunt.co/palette/404258474e6850577a6b728e
