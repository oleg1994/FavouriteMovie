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

// var path = require('path');
// var anypath = ['*', '/*', '/*/*','*/*','/*/*'];
// app.get(anypath, function(req, res) {
//   res.sendFile(path.join(__dirname, "/public/index.html"), function(err) {
//     if (err) {
//       res.status(500).send(err);
//     }
//   });
// });





app.post('/userList', (req, res) => {
    console.log(req.body.movies)
    if (!req.body.username) {
        res.send({ error: 'empty' })
    } else {
        userList.find({ username: req.body.username }, function (err, result) {
            if (err) {
                console.log(err, 'there is error')
                res.send({ err })
            }
            if (result.length) {
                console.log(result)
                res.send({ success: 'username exists good to send the data' })
            } else {
                console.log('user doesnt exits creating new save')
                let newUser = new userList({
                    username: req.body.username,
                    movies:req.body.movies
                });
                newUser.save(function (err, newUser) {
                    if (err) return console.error(err);
                });
            }
        });
    }
})

app.listen(port, function () {
    console.log('server port', port)
})