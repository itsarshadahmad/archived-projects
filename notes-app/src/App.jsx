import { useContext } from "react";
import Navbar from "./components/Navbar";
import Notes from "./components/Notes";
import NotesForm from "./components/NotesForm";
import { NotesContext } from "./contexts/NotesContext";

function App() {
	const { notes } = useContext(NotesContext);

	return (
		<div className="bg-[#393053] h-[100vh] overflow-x-hidden">
			<div className="flex flex-col items-center">
				<Navbar />
				<NotesForm />
				<div className="m-5 flex flex-wrap justify-center">
					{notes.map((value, index) => {
						return (
							<Notes
								key={index}
								title={value.title}
								note={value.note}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default App;
