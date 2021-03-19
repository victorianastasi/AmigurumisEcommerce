const express = require('express');
const sendMail = require('./js/form')
const app = express();
const path = require('path');

const PORT = 8080;

//Data parsing
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.post('/email', (req, res) => {
    //send email
    const {subject, email, text, title} = req.body;
    
    sendMail(email, subject, text, title, function(err, data){
        if(err){
            res.status(500).json({message: 'Internal Error'});
        }
        else{
            res.json({message: 'Email enviado'});
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contacto.html'));
});

app.listen(PORT, () => {
    console.log('Server is starting on PORT, ', 8080);
});