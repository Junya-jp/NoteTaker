//Helper functions 
const uuid = require('../helpers/uuid');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
// Required packages
const fs = require('fs');
const path = require('path');

module.exports = (app) => {
    const dbPath = path.join(__dirname, '../db/db.json');
//Get request to get db.son file
    app.get('/api/notes', (req, res) => {
        console.info(`${req.method} request received for notes`);
        res.sendFile(dbPath);
    });
//Post request to retrieve note written by client and show it to them
    app.post('/api/notes', (req, res) => {
        console.info(`${req.method} request received to add a note`);

        const { title, text } = req.body;

        if (req.body && title && text) {
            const newNote = {
                title,
                text,
                id: uuid(),
            };

            readAndAppend(newNote, dbPath);

            const response = {
                body: newNote,
            };
            res.json(response);
        } else {
            res.status(400).json({ error: 'Invalid request. Title and text are required.' });
        }
    });
//Delete request to handle deleting the function
    app.delete('/api/notes/:id', (req, res) => {
        try {
            const idToDelete = req.params.id;
    
            console.log('idToDelete:', idToDelete);  
    
            if (!idToDelete) {
                return res.status(400).json({ error: 'Invalid request. ID parameter is required.' });
            }
    
            let db = readFromFile(dbPath);
            let deleteNotes = db.filter(item => item.id !== idToDelete);
    
            console.log('deleteNotes:', deleteNotes);  
    
            fs.writeFileSync(dbPath, JSON.stringify(deleteNotes, null, 2));
            res.json(deleteNotes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    
};
