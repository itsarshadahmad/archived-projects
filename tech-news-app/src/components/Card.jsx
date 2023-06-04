export default function Card({ article }) {
	return (
		<div className="w-[90vw] lg:w-[45vw] rounded-lg bg-[#6B728E] p-4 m-4 flex flex-col cursor-default">
			<h1 className="text-3xl text-white">{article.title}</h1>
			<p className=" my-2 text-sm text-gray-300">
				By: {article.author} | {article.num_comments} Comments
			</p>
			<a
				href={article.url}
				target="_blank"
				className="text-sm underline text-gray-100"
			>
				Read More
			</a>
		</div>
	);
}
