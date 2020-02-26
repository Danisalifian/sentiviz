const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const path = require('path');

// DB Config
const keys = require('./config/key');
const db = keys.mongoURI;

// Routes module
const dataTeranalises = require('./api/routes/RouteDataTeranalises')
const users = require('./api/routes/RouteUsers')
const keywords = require('./api/routes/RouteKeywords')

const app = express();

//Body Parser Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Connect MongoDB
mongoose.connect(db, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
    .then( () => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Routing api
app.use('/api/datateranalises', dataTeranalises)
app.use('/api/users', users)
app.use('/api/keywords', keywords)

//Serve static  assets if in production
if(process.env.NODE_ENV === 'production') {
	//set static folder
	app.use(express.static('client/build'))
	
	app.get('*', (req, res) => {
		res.SendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const port = process.env.PORT || 5000;

app.get("/", function(req, res) {
    res.send("Welcome to Sentiviz");
});

app.listen(port, () => console.log(`Server started on port ${port}`));
