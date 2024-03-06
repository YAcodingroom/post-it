import { useState } from 'react'
import { useLocalStorageState } from './useLocalStorageState'

export default function App() {
	const [notes, setNotes] = useLocalStorageState([], 'notes')

	function handleAddNote(newNote) {
		setNotes((notes) => [...notes, newNote])
	}

	function handleDeleteNote(id) {
		setNotes((notes) => notes.filter((note, i) => i !== id))
	}

	return (
		<div>
			<Header />
			<CreateNote onAddNote={handleAddNote} />
			{notes.map((note, i) => {
				return (
					<Note
						key={i}
						id={i}
						title={note.title}
						content={note.content}
						onDeleteNote={handleDeleteNote}
					/>
				)
			})}
			<Footer />
		</div>
	)
}

function Header() {
	return (
		<header className="container">
			<h1>Post-it</h1>
		</header>
	)
}

function CreateNote({ onAddNote }) {
	const [note, setNote] = useState({ title: '', content: '' })

	function handleChange(e) {
		const { name, value } = e.target

		setNote((note) => {
			return { ...note, [name]: value }
		})
	}

	function handleClick(e) {
		e.preventDefault()
		if (note.title === '' || note.content === '') return

		onAddNote(note)
		setNote({ title: '', content: '' })
	}

	return (
		<div>
			<form className="create-note">
				<input
					name="title"
					placeholder="Title"
					type="text"
					onChange={handleChange}
					value={note.title}
				/>
				<textarea
					name="content"
					placeholder="write down your note"
					onChange={handleChange}
					value={note.content}
					rows="5"
				/>
				<button onClick={handleClick}>Add</button>
			</form>
		</div>
	)
}

function Note({ id, title, content, onDeleteNote }) {
	return (
		<div className="note">
			<h2>{title}</h2>
			<p>{content}</p>
			<button onClick={() => onDeleteNote(id)}>DELETE</button>
		</div>
	)
}

function Footer() {
	const currentYear = new Date().getFullYear()
	return (
		<footer>
			<p>Copyright ⓒ {currentYear}</p>
		</footer>
	)
}
