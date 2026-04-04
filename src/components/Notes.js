import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        } else {
            props.showAlert("Please login to continue", "danger");
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])
    const [showModal, setShowModal] = useState(false)
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})

    const updateNote = (currentNote) => {
        setShowModal(true);
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
    }

    const handleClick = (e)=>{
        editNote(note.id, note.etitle, note.edescription, note.etag)
        setShowModal(false);
        props.showAlert("Note updated successfully", "success");
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <>
            {/* Edit Note Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-bg-card rounded-radius shadow-lg max-w-md w-full mx-4">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h5 className="text-xl font-bold">✏️ Edit Note</h5>
                                <button onClick={() => setShowModal(false)} className="text-text-muted hover:text-text">&times;</button>
                            </div>
                            <form>
                                <div className="mb-4">
                                    <label htmlFor="etitle" className="block text-text font-medium text-sm mb-2">Title</label>
                                    <input type="text" className="w-full px-3 py-2 bg-bg-input border border-border rounded-lg text-text focus:border-accent focus:ring-2 focus:ring-accent-dim outline-none" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={5} required placeholder="Note title..." />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="edescription" className="block text-text font-medium text-sm mb-2">Description</label>
                                    <textarea className="w-full px-3 py-2 bg-bg-input border border-border rounded-lg text-text focus:border-accent focus:ring-2 focus:ring-accent-dim outline-none" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required rows={3} placeholder="Note description..." />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="etag" className="block text-text font-medium text-sm mb-2">Tag</label>
                                    <input type="text" className="w-full px-3 py-2 bg-bg-input border border-border rounded-lg text-text focus:border-accent focus:ring-2 focus:ring-accent-dim outline-none" id="etag" name="etag" value={note.etag} onChange={onChange} placeholder="e.g. work, personal..." />
                                </div>
                            </form>
                            <div className="flex justify-end space-x-2">
                                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-bg-surface border border-border text-text rounded-lg hover:bg-accent-dim hover:text-accent transition-colors">Cancel</button>
                                <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover disabled:opacity-50 transition-colors">Update Note</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 my-2">

                {/* LEFT — Add Note (sticky) */}
                <div className="lg:col-span-5">
                    <div className="sticky top-4">
                        <AddNote showAlert={props.showAlert} />
                    </div>
                </div>

                {/* RIGHT — Notes grid */}
                <div className="lg:col-span-7">
                    <div className="flex items-center mb-3 gap-2">
                        <h4 className="mb-0 font-bold">Your Notes</h4>
                        <span className="bg-accent text-white px-2 py-1 rounded-full text-sm font-semibold">{notes.length}</span>
                    </div>

                    {notes.length === 0 &&
                        <div className="text-center py-5">
                            <p className="text-4xl mb-2">📭</p>
                            <p className="mb-1 font-semibold">No notes yet</p>
                            <small>Use the form on the left to add your first note.</small>
                        </div>
                    }

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                        {notes.map((note) => (
                            <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}

export default Notes
