// https://intense-ravine-78526.herokuapp.com/

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${req.ip} : ${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log+'\n');
    next();
});
/* ===MAINTENANCE MODE===
app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        pageTitle: 'Doing things, be patient!',
        message: 'We are currently under maintenance! We should be back soon!'
    });
});
*/
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Index',
        welcomeMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tincidunt sem sit amet mi maximus.',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects',
    });
});

app.listen(port, () => {
    console.log(`Running @ port ${port}`);
});