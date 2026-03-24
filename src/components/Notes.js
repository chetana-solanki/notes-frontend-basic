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
            navigate("/");
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
    }

    const handleClick = (e)=>{
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("Note updated successfully", "success");
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <>
            {/* Hidden modal trigger */}
            <button ref={ref} type="button" className="d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" />

            {/* Edit Note Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">✏️ Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={5} required placeholder="Note title..." />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <textarea className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required rows={3} placeholder="Note description..." />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} placeholder="e.g. work, personal..." />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Two-column layout */}
            <div className="row g-4 my-2">

                {/* LEFT — Add Note (sticky) */}
                <div className="col-lg-5">
                    <div className="sticky-sidebar">
                        <AddNote showAlert={props.showAlert} />
                    </div>
                </div>

                {/* RIGHT — Notes grid */}
                <div className="col-lg-7">
                    <div className="d-flex align-items-center mb-3 gap-2">
                        <h4 className="mb-0 fw-bold">Your Notes</h4>
                        <span className="badge bg-primary rounded-pill">{notes.length}</span>
                    </div>

                    {notes.length === 0 &&
                        <div className="text-center py-5 empty-state">
                            <p className="fs-2 mb-2">📭</p>
                            <p className="mb-1 fw-semibold">No notes yet</p>
                            <small>Use the form on the left to add your first note.</small>
                        </div>
                    }

                    <div className="row row-cols-1 row-cols-xl-2 g-3">
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
