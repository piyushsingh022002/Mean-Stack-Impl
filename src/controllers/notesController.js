
import Note from "../models/Notes.js";

// GET all notes
export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find();
        res.status(200).json({
            success: true,
            data: notes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving notes",
            error: error.message
        });
    }
}

// CREATE a new note
export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        // Validation
        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "Title and content are required"
            });
        }

        const newNote = new Note({
            title,
            content
        });

        const savedNote = await newNote.save();
        res.status(201).json({
            success: true,
            message: "Note created successfully",
            data: savedNote
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating note",
            error: error.message
        });
    }
};

// GET note by ID
export const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.status(200).json({
            success: true,
            data: note
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving note",
            error: error.message
        });
    }
};

// UPDATE note by ID
export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        // Find and update the note
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, content },
            { new: true, runValidators: true } // new: true returns the updated document
        );

        if (!updatedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Note updated successfully",
            data: updatedNote
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating note",
            error: error.message
        });
    }
};

// DELETE note by ID
export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNote = await Note.findByIdAndDelete(id);

        if (!deletedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Note deleted successfully",
            data: deletedNote
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting note",
            error: error.message
        });
    }
};
