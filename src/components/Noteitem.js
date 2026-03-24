import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext"
import { FaTrashAlt, FaEdit } from 'react-icons/fa'


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote, showAlert } = props;
    return (
        <div className="col">
            <div className="card h-100 shadow-sm note-card">
                <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="card-title mb-0">{note.title}</h5>
                        <div className="d-flex gap-1 ms-2">
                            <button className="btn btn-sm btn-outline-primary" title="Edit note" onClick={() => updateNote(note)}>
                                <FaEdit />
                            </button>
                            <button className="btn btn-sm btn-outline-danger" title="Delete note" onClick={() => { deleteNote(note._id); showAlert("Note deleted successfully", "success") }}>
                                <FaTrashAlt />
                            </button>
                        </div>
                    </div>
                    <p className="card-text text-muted flex-grow-1">{note.description}</p>
                    {note.tag && <span className="badge bg-secondary align-self-start mt-2">{note.tag}</span>}
                </div>
            </div>
        </div>
    )
}

export default Noteitem
