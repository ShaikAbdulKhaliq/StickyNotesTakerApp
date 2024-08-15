import React, { useContext } from 'react'
import { NoteContext } from '../contex/NoteContext';
import { db } from '../appwrite/databases';

const Color = ({color}) => {
    const {selectedNote,notes,setNotes} = useContext(NoteContext)

    const changeColor=()=>{
        console.log("CHange color clicked:", selectedNote);
      try {
        
        const currentNoteIndex=notes.findIndex(
            (note)=>note.$id===selectedNote.$id
        )
        const updateNote={
            ...notes[currentNoteIndex],
            colors:JSON.stringify(color)
        }

        const newNotes=[...notes]
        newNotes[currentNoteIndex]=updateNote;
        setNotes(newNotes);
        db.notes.update(selectedNote.$id,{
            colors:JSON.stringify(color)
        })
      } catch (error) {
        alert("You must select a note before changing colors");

      }
    }
  return (
    <div
    onClick={changeColor}
    className='color'
    style={{backgroundColor:color.colorHeader}}
    ></div>
  )
}

export default Color