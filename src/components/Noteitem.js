import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext"
import { FaTrashAlt, FaEdit } from 'react-icons/fa'


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote, showAlert } = props;
    return (
        <div className="bg-gradient-to-br from-bg-card to-bg-surface border border-border/50 rounded-radius shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                    <h5 className="font-bold text-xl text-accent group-hover:text-accent-hover transition-colors mb-0">{note.title}</h5>
                    <div className="flex gap-2">
                        <button className="p-3 bg-secondary/10 hover:bg-secondary hover:text-white rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105" title="Edit note" onClick={() => updateNote(note)}>
                            <FaEdit className="text-secondary" />
                        </button>
                        <button className="p-3 bg-danger/10 hover:bg-danger hover:text-white rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105" title="Delete note" onClick={() => { deleteNote(note._id); showAlert("Note deleted successfully", "success") }}>
                            <FaTrashAlt className="text-danger" />
                        </button>
                    </div>
                </div>
                <p className="text-text-muted flex-grow text-base leading-relaxed">{note.description}</p>
                {note.tag && <span className="bg-gradient-to-r from-warning to-pink-400 text-white px-3 py-1 rounded-full text-sm self-start mt-4 shadow-md">{note.tag}</span>}
            </div>
        </div>
    )
}

export default Noteitem
