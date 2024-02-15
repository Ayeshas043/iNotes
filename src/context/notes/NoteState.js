import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
  const host='http://localhost:5000'
    const notesInitial = []
      const [notes, setNotes] = useState(notesInitial)
      //get all note
const getNote = async ()=>{
  const response=await fetch(`${host}/api/notes/fetchallnotes`,{
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'auth_token': localStorage.getItem("token")
    },
  })
 const json = await response.json()
 console.log(json)
 setNotes(json)
  
}
//add a note
const addNote = async (title,description,tag)=>{
  const response=await fetch(`${host}/api/notes/addnote`,{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      'auth_token': localStorage.getItem("token")
    },
    body: JSON.stringify({title,description,tag})
    
  })
  console.log("adding a new note")
  const note=await response.json()
  setNotes(notes.concat(note))
}

    //delete a note
    const deleteNote=async(id)=>{
      const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json',
          'auth_token': localStorage.getItem("token")
        },
      });
      const json = response.json()
      console.log(json)
      console.log("Deleting the note with id " + id);
      const newNotes=notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes)
    }

    //edit a note
    const editNote=async (id,title,description,tag)=>{
      const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json',
          'auth_token': localStorage.getItem("token")
        },
        body: JSON.stringify({title,description,tag})
      })
      const json = response.json();
      console.log(json)
      let newNotes=JSON.parse(JSON.stringify(notes))
      for(let index=0;index<notes.length;index++)
      {
        const element=notes[index];
        if(element._id===id){
          newNotes[index].title=title;
          newNotes[index].description=description;
          newNotes[index].tag=tag;
          break;
        }
        
      }
      setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{notes, addNote,deleteNote,editNote,getNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;