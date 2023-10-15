const path = require('path');

module.exports = (app)=> {
    //Get request to retrieve notes.html
    app.get('/notes', (req, res) =>{
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });
    // Get request to retrieve index.html
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
};
