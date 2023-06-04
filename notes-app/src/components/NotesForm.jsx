import { useContext, useEffect, useState } from "react";
import { NotesContext } from "../contexts/NotesContext";

export default function NotesForm() {
	const [title, setTitle] = useState("");
	const [note, setNote] = useState("");
	const { notes, setNotes, updateNote, setUpdateNote } =
		useContext(NotesContext);

	useEffect(() => {
		if (updateNote.title && updateNote.note) {
			setTitle(updateNote.title);
			setNote(updateNote.note);
		}
	}, [updateNote]);

	function handleSave(event) {
		if (title !== "" && note !== "") {
			// Update notes
			if (updateNote.title && updateNote.note) {
				const index = notes.findIndex(
					(value) =>
						value.title === updateNote.title &&
						value.note === updateNote.note
				);

				const otherNotes = notes.filter((value, ind) => index !== ind);
				otherNotes.push({ title: title, note: note });
				setNotes(otherNotes);
				setUpdateNote({});
			} else {
				// Save notes
				setNotes([...notes, { title: title, note: note }]);
			}
			setNote("");
			setTitle("");
		}
	}

	return (
		<div className="flex flex-col bg-[#443C68] shadow-xl mt-5 p-2 w-[90vw] sm:p-5 sm:w-[50vw] lg:w-[35vw] xl:w-[30vw] rounded-lg">
			<input
				type="text"
				className="m-1 p-2 rounded-lg"
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<textarea
				className="m-1 p-2 rounded-lg"
				placeholder="Add Note"
				value={note}
				onChange={(e) => setNote(e.target.value)}
			></textarea>
			<button
				className="bg-[#635985] text-white text-xl shadow-lg p-2 rounded-lg m-1 hover:bg-opacity-50"
				onClick={handleSave}
			>
				Save
			</button>
		</div>
	);
}
