const express = require("express");
const Note = require("../models/Note");

const router = express.Router();

// ==============================
// CREATE NOTE
// POST /api/notes
// ==============================

router.post("/", async (req, res) => {
  try {
    // Get data from frontend
    const { title, content, category } = req.body;

    // Create note in MongoDB
    const note = await Note.create({
      title,
      content,
      category,
    });

    // Send created note to frontend
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create note",
      error: error.message,
    });
  }
});

// ==============================
// GET ALL NOTES
// GET /api/notes
// ==============================

router.get("/", async (req, res) => {
  try {
    // Get all notes
    const notes = await Note.find();

    // Send notes to frontend
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch notes",
      error: error.message,
    });
  }
});

// ==============================
// GET SINGLE NOTE
// GET /api/notes/:id
// ==============================

router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch note",
      error: error.message,
    });
  }
});

// ==============================
// UPDATE NOTE
// PATCH /api/notes/:id
// ==============================

router.patch("/:id", async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update note",
      error: error.message,
    });
  }
});

// ==============================
// DELETE NOTE
// DELETE /api/notes/:id
// ==============================

router.delete("/:id", async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(
      req.params.id
    );

    if (!deletedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "Note deleted successfully",
      note: deletedNote,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete note",
      error: error.message,
    });
  }
});

module.exports = router;