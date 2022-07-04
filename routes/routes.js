const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

module.exports = app => {

    // API ROUTES

    //get route for api notes
    app.get("/api/notes", async function (req, res) {
        const notes = await getDb()
        res.json(notes)
    });

    //post route for api notes
    app.post("/api/notes", async function (req, res) {
        const notes = await getDb()
        // Receives a new note, adds it to db.json, then returns the new note
        let newNote = { ...req.body, id: uuidv4() };
        notes.push(newNote);
        updateDb(notes);
        console.log("Added new note: " + newNote.title);
        res.json(notes)
    });

    // gets a note with specific id
    app.get("/api/notes/:id", async function (req, res) {
        const notes = await getDb()
        const note = notes.filter((singleNote) => {
            return singleNote.id !== req.params.id
        })
        // display json for the notes array indices of the provided id
        //0 is the index for the array of one object from filtering the note 
        const firstNote = 0
        res.json(note[firstNote]);
    });

    // Deletes a note with specific id
    app.delete("/api/notes/:id", async function (req, res) {
        const notes = await getDb()
        const newNotes = notes.filter((singleNote) => {
            return singleNote.id !== req.params.id
        })
        updateDb(newNotes);
        console.log("Deleted note with id " + req.params.id);
        res.json({ ok: true })
    });

    // VIEW ROUTES

    // Display notes.html when /notes is accessed
    app.get('/notes', function (req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // Display index.html when all other routes are accessed
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    async function getDb() {
        const notesData = await fs.readFileSync("db/db.json", "utf8")
        const notes = JSON.parse(notesData) || []
        //storing the note database as varible
        return notes
    }
    //updates the json file whenever a note is added or deleted
    function updateDb(notes) {
        fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
            if (err) throw err;
            return true;
        });
    }

}