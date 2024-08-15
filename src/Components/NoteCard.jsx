import React, { useContext, useEffect, useRef, useState } from 'react'
import Trash from '../icons/Trash'
import { db } from '../appwrite/databases'
import { setNewOffset, autoGrow, setZIndex, bodyParser } from '../utils'
import Spinner from '../icons/Spinner'
import DeleteButton from './DeleteButton'
import { NoteContext } from '../contex/NoteContext'
const NoteCard = ({ note}) => {
  let [position, SetPosition] = useState(JSON.parse(note.position))
  const [saving, setSaving] = useState(false)
  const body = bodyParser(note.body)
  const colors = JSON.parse(note.colors)
  const textAreaRef = useRef(null)
  const mouseStartPos = { x: 0, y: 0 }
  const cardRef = useRef(null)
  const keyUpTimer = useRef(null)
  const {setSelectedNote}=useContext(NoteContext)
  const saveData = async (key, value) => {
    const payload = { [key]: JSON.stringify(value) }
    try {
      await db.notes.update(note.$id, payload)
    } catch (error) {
      console.error(error)
    }
    setSaving(false)
  }
  useEffect(() => {
    autoGrow(textAreaRef)
    setZIndex(cardRef.current)
  }, [])

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove)
    document.removeEventListener("mouseup", mouseUp)
    const newPosition = setNewOffset(cardRef.current)
    saveData("position", newPosition)

  }

  function mouseDown(e) {
    //capture the starting x and y position of the mouse 
   console.log("bublling occur")
    // removing the bublling effect by adding condition
    if(e.target.className==="card-header"){
    setZIndex(cardRef.current)
    setSelectedNote(note)
    mouseStartPos.x = e.clientX
    mouseStartPos.y = e.clientY
    document.addEventListener("mousemove", mouseMove)
    document.addEventListener("mouseup", mouseUp)
    }
  }
  function mouseMove(e) {
    //calculate the move direction
    let mouseMoveDirection = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY
    }
    //Update start position for next move
    mouseStartPos.x = e.clientX
    mouseStartPos.y = e.clientY
    //update card top and left positon.
    const newPosition = setNewOffset(cardRef.current, mouseMoveDirection)
    SetPosition(newPosition);
  }

  const handleKeyUP = async () => {
    setSaving(true)
    //see if timer already exist and remove that
    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current)
    }

    keyUpTimer.current = setTimeout(() => {
      saveData("body", textAreaRef.current.value)
    }, 2000)
  }
  return (
    <div
      className='card'
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      ref={cardRef}
    >
      <div
        className='card-header'
        style={{ backgroundColor: colors.colorHeader }}
        onMouseDown={mouseDown}
      >
        {saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText}/>
            <span style={{ color: colors.colorText }}>Saving...</span>
          </div>
        )}
        <DeleteButton noteId={note.$id}/>
      </div>
      <div className='card-body'>
        <textarea
          style={{ color: colors.colorText }}
          defaultValue={body}
          ref={textAreaRef}
          onInput={() => autoGrow(textAreaRef)}
          onFocus={() => {
            setZIndex(cardRef.current)
            setSelectedNote(note)
          }}
          onKeyUp={handleKeyUP}
        ></textarea>
      </div>
    </div>
  )
}

export default NoteCard