import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext"

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
        props.showAlert("Note added successfully", "success");
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className="bg-gradient-to-br from-bg-card to-bg-surface border border-border/50 rounded-radius shadow-xl p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="text-3xl animate-bounce">✏️</div>
                <div>
                    <h5 className="font-bold text-xl text-accent mb-0">Add a Note</h5>
                    <small className="text-text-muted">Fill in the details below</small>
                </div>
            </div>
            <form>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-text font-semibold text-sm mb-2">Title</label>
                    <input type="text" className="w-full px-4 py-3 bg-bg-input border-2 border-border/30 rounded-xl text-text focus:border-secondary focus:ring-4 focus:ring-secondary/20 outline-none transition-all duration-200" id="title" name="title" value={note.title} onChange={onChange} minLength={5} required placeholder="Give your note a title..." />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-text font-semibold text-sm mb-2">Description</label>
                    <textarea className="w-full px-4 py-3 bg-bg-input border-2 border-border/30 rounded-xl text-text focus:border-secondary focus:ring-4 focus:ring-secondary/20 outline-none transition-all duration-200 resize-none" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required rows={4} placeholder="Write your note here..." />
                </div>
                <div className="mb-6">
                    <label htmlFor="tag" className="block text-text font-semibold text-sm mb-2">Tag <span className="text-text-muted font-normal">(optional)</span></label>
                    <input type="text" className="w-full px-4 py-3 bg-bg-input border-2 border-border/30 rounded-xl text-text focus:border-secondary focus:ring-4 focus:ring-secondary/20 outline-none transition-all duration-200" id="tag" name="tag" value={note.tag} onChange={onChange} placeholder="e.g. work, personal, ideas..." />
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="w-full bg-gradient-to-r from-accent to-pink text-white py-3 rounded-xl hover:from-accent-hover hover:to-pink-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5" onClick={handleClick}>
                    + Add Note
                </button>
            </form>
        </div>
    )
}

export default AddNote
