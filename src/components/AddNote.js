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
        <div className="card add-note-card">
            <div className="card-body p-4">
                <div className="d-flex align-items-center gap-2 mb-4">
                    <div className="add-note-icon">✏️</div>
                    <div>
                        <h5 className="card-title mb-0 fw-bold">Add a Note</h5>
                        <small className="text-muted">Fill in the details below</small>
                    </div>
                </div>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} minLength={5} required placeholder="Give your note a title..." />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required rows={4} placeholder="Write your note here..." />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="tag" className="form-label">Tag <span className="text-muted fw-normal">(optional)</span></label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} placeholder="e.g. work, personal, ideas..." />
                    </div>
                    <div className="d-grid">
                        <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary py-2" onClick={handleClick}>
                            + Add Note
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNote
