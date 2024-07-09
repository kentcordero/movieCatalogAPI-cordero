const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const movieRoutes = require("./routes/movie");
const userRoutes = require("./routes/user");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

mongoose.connect('mongodb+srv://admin:admin1234@kentdb.4oxbo78.mongodb.net/Movie-Catalog?retryWrites=true&w=majority&appName=kentDB');
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log(`We're now connected to MongoDb Atlas`));

app.use("/movies", movieRoutes);
app.use("/users", userRoutes);

if(require.main === module){
	app.listen(process.env.PORT || 4000, () => {
	    console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
	});
}

module.exports = { app, mongoose };