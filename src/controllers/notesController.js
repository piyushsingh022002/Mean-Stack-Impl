
//normal function export
export function getAllNotes(req, res){
    res.status(200).send("Get all notes");
}

//named exports
export const createNote = (req, res) => {
    res.send("Create a new note");
}

export const getNoteById = (req, res) => {
    // const noteId = req.params.id;
    // res.send(`Get note with ID: ${noteId}`);
    res.send("Get Note with Id");
}

export const updateNote = (req, res) => {
    const noteId = req.params.id;
    res.send(`Update note with ID: ${noteId}`);
}

export const deleteNote = (req, res) => {
    const noteId = req.params.id;
    res.send(`Delete note with ID: ${noteId}`);
}
