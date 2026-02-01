import mongoose from 'mongoose';
//1. create a schema
//create a mpdel off that schema

const noteSchema = new mongoose.Schema(
    {
        title :{
            type: String,
            required: true
        },
        content :{
            type: String,
            required: true
        }
    }, 
    { timestamps: true }  //automatically manages timestanps like createdAt and updatedAt
)

//2. create a model
const Note = mongoose.model('Note', noteSchema);

export default Note;