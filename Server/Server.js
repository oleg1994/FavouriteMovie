const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 4000;



// App ~uses~
app.use(cors());
app.use(express.json());
// mongoose.set('useFindAndModify', false);


//Exports
const userList = require('./schemas/userList')



mongoose.connect('mongodb+srv://oleg:oleg123@appointme-kgc1l.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});


app.post('/userList', (req, res) => {
    console.log(req.body)
    if (req.body.newData === true) {
        console.log('new')
        let newUser = new userList({
            username: req.body.username,
            password: req.body.password,
            movies: req.body.movies
        });
        newUser.save(function (err, newUser) {
            console.log(newUser)
            if (err) return console.error(err);
        });
    } else {
        userList.find({ username: req.body.username }, function (err, result) {
            console.log('nihnas')
            if (err) {
                console.log('user doesnt exits creating new save')
            }
            if (result.length && result.password !== req.body.password) {
                console.log('username exists but the password is a no no')
                res.send({ successNot: 'username exists but the password is a no no' })
            }
            if (result.length && result.password === req.body.password) {
                console.log(result)
                res.send({ success: 'username and password match good to send the data' })
            }
        });
    }
})

app.listen(port, function () {
    console.log('server port', port)
})