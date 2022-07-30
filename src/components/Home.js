import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import NoteContext from '../context/notes/NoteContext'
import Createnote from './Createnote'
import Editnote from './Editnote'
import Note from './Note'

export default function Home() {
    const history = useHistory();
    const { usernotes, fetchnotes, setloginstatus } = useContext(NoteContext)
    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            fetchnotes()
            setloginstatus(true)
        }
        else {
            history.push("/login")
            setloginstatus(false)
        }
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <div className="d-flex flex-wrap justify-content-evenly ">
                <Createnote />
                <Editnote />
                <div className='col-md-3 m-1 p-1 d-inline-block' >
                    <h2 className='container text-center'>Notes</h2>
                    <div className='d-flex flex-column  border-success overflow-auto form-control p-1' id='note-items' >
                        {usernotes.length !== 0 ? usernotes.map((note, i) => { return <Note key={note._id} title={note.title} tag={note.tag} discription={note.discription} _id={note._id} i={i + 1} /> }) : <h2 className='m-auto'>no notes</h2>}
                    </div>
                </div>
            </div>
        </>
    )
}
