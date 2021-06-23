require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override')

const mongoose = require('mongoose');
const path = require('path');

const testRoutes = require('./routes/blog');

const PORT = process.env.PORT || 7777;
const app = express();

app.engine('ejs', engine = require('ejs-mate'));

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));


app.use(testRoutes);


const start = async () => {
try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.urena.mongodb.net/test-express`, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    app.listen(PORT, () => {
        console.log(`Server is started on port ${PORT}`);
    })
} catch (error) {
    console.log(error);
}
}
start();

