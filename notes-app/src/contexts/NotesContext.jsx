import { createContext, useState } from "react";

export const NotesContext = createContext({
	notes: [],
	setNotes: () => null,
	updateNote: {},
	setUpdateNote: () => null,
});

export default function NotesProvider({ children }) {
	const [notes, setNotes] = useState([]);
	const [updateNote, setUpdateNote] = useState({});

	return (
		<NotesContext.Provider
			value={{ notes, setNotes, updateNote, setUpdateNote }}
		>
			{children}
		</NotesContext.Provider>
	);
}
