const express=require('express')
const router=express.Router()
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note')
//Route 1: Get all the Note using GET "/api/auth/fetchallnotes",login req

router.get('/fetchallnotes',fetchuser, async(req,res)=>{
    try {
        const notes=await Note.find({user: req.user.id})
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    
    }
  
})
//Route 2: add a new note  using GET "/api/auth/fetchallNote",login req
router.post('/addnote',fetchuser, [
    body('title','enter a valid title').isLength({ min: 3 }),
    body('description','enter a valid description').isLength({ min: 5 }),],async (req, res) => {
try {
    const{ title,description,tag}=req.body;
    //if there are errors, return bad req and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const note=new Note({
        title,description,tag, user: req.user.id
    })
    const savedNote=await note.save()
    res.json(savedNote)
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");

}
})
//Route 3: update an existing user using GET "/api/auth/fetchallNote",login req
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    const {title,description,tag}=req.body;
    try {
        
    
    //create a newnote object
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};
    //fidn the note to be updated and update it
    let note=await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("not allowed");

    }
    note=await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{new: true})
    res.json({note});
}catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");

}
})
//Route 4: delete an existing user using DEL "/api/auth/deletenote",login req
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    const {title,description,tag}=req.body;
    try {
    
    //fidn the note to be updated and update it
    let note=await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}
    //allow deletion if user own this note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("not allowed");

    }
    note=await Note.findByIdAndDelete(req.params.id)
    res.json({"success":"deleted successfullt",note: note});
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");

}
})
module.exports = router