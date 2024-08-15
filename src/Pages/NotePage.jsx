import React, { useContext, useEffect, useState } from 'react'
// import { fakeData as notes } from '../assets/fakeData.js'
import { db } from '../appwrite/databases.js'
import NoteCard from '../Components/NoteCard.jsx'
import { NoteContext } from '../contex/NoteContext.jsx'
import Controls from '../Components/Controls.jsx'
const NotePage = () => {
  const {notes,setNotes}=useContext(NoteContext)
  // useEffect(()=>{
  //    init()
  // },[])

  // const init= async()=>{
  //   const response=await db.notes.list();
  //   setNotes(response.documents)
  // }
  return (
    <div>
        {notes.map((note)=>{
          return  <NoteCard note={note} key={note.$id} setNotes={setNotes}/>

        })}
        <Controls/>
    </div>
  )
}

export default NotePage