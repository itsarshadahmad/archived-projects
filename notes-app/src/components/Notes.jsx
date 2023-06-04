import { useContext } from "react";
import { NotesContext } from "../contexts/NotesContext";

export default function Notes({ title, note }) {
	const { notes, setNotes, updateNote, setUpdateNote } =
		useContext(NotesContext);

	function handleUpdate(event) {
		event.preventDefault();

		const selectedNote = notes.find(
			(value) => value.title === title && value.note === note
		);

		setUpdateNote(selectedNote);
	}

	function handleDelete(event) {
		event.preventDefault();
		const ind = notes.findIndex(
			(value) => value.title === title && value.note === note
		);

		const otherNotes = notes.filter((value, index) => index !== ind);
		setNotes(otherNotes);
	}

	return (
		<div className="m-2 bg-[#18122B] w-[90vw] py-2 sm:w-auto sm:max-w-sm h-max px-4 rounded-lg">
			<h1 className="text-3xl text-center text-white">{title}</h1>
			<hr className="border-[#635985] border-1 m-2" />
			<p className="text-ld text-white text-center">{note}</p>
			<div className="flex justify-between mt-4">
				<button
					className="underline text-yellow-500"
					onClick={handleUpdate}
				>
					<i class="fa-solid fa-pen-to-square mx-1"></i>
					Edit
				</button>
				<button
					className="mx-1 underline text-red-600"
					onClick={handleDelete}
				>
					<i class="fa-sharp fa-solid fa-trash mx-1"></i>
					Delete
				</button>
			</div>
		</div>
	);
}
