const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 4000;



// App ~uses~
app.use(cors());
app.use(express.json());
app.use(express.static('build'))

// mongoose.set('useFindAndModify', false);


//Exports
const watchList = require('./schemas/watchList')



mongoose.connect('mongodb+srv://oleg:oleg123@appointme-kgc1l.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});

var path = require('path');
var anypath = ['*', '/*', '/*/*','*/*','/*/*'];
app.get(anypath, function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});





app.post('/userData', (req, res) => {
    // console.log(req.body)
    const { listname, password, newList } = req.body;

    if (newList && password && listname) {
        watchList.find({ password: password }, function (err, result) {
            if (err) {
                console.log(err, 'there is error')
                res.send({ err })
            }
            if (result.length) {
                console.log(result)
                //list already exists
                res.send({ fail: 'That key is already in use.' })
            }
            if (!result.length) {
                var newListing = new watchList({
                    listname: listname,
                    password: password,
                });
                newListing.save(function (err) {
                    if (err) {
                        console.error(err)
                    } else {
                        console.log('success created new list')
                    }
                });
                res.send({ success: 'new list created' })
            }
        });
    }
    if (!newList && password) {
        watchList.find({ password: password }, function (err, result) {
            if (err) {
                console.log(err, 'there is error')
                res.send({ err })
            }
            if (result.length) {
                console.log(result)
                //list already exists
                res.send({ success: result })
            }
            if (!result.length) {
                res.send({ fail: `List with that key doesn't exist.` })
            }
        });
    }
})

app.post('/moviesData', (req, res) => {
    // console.log(req.body)
    const { key } = req.body;
    if (key) {
        watchList.find({ password: key }, function (err, result) {
            if (err) {
                console.log(err, 'there is error')
                res.send({ err })
            }
            if (result.length) {
                console.log(result)
                //list already exists
                res.send({ success: 'Data is found.', result })
            }
            if (!result.length) {
                res.send({ fail: 'No list was found with that key' })
            }
        });
    }
})
app.post('/addMovie', (req, res) => {
    // console.log(req.body)
    const { movieID, collectionID } = req.body;
    if (collectionID) {
        watchList.find({ password: collectionID, movies: { "ID": movieID } }, function (err, result) {
            if (err) {
                console.log(err, 'there is error')
                res.send({ err })
            }
            if (result.length) {
                //list already exists
                res.send({ exist: 'This is already in your list' })
            }
            if (!result.length) {
                watchList.findOneAndUpdate({ password: collectionID }, { $push: { movies: { "ID": movieID } } }, function (error, success) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(success);
                        res.send({ success: 'added to database' })

                    }
                });
            }

        });

    }
})
app.post('/removeMovie', (req, res) => {
    // console.log(req.body)
    const { removeID, key } = req.body;
    if (removeID) {
        watchList.find({ password: key, movies: { "ID": removeID } }, function (err, result) {
            if (err) {
                console.log(err, 'there is error')
                res.send({ err })
            }
            if (result.length) {
                watchList.updateOne({ password: key }, { $pull: { 'movies': { 'ID': removeID } } }, function (error, success) {
                    console.log(error)
                    console.log(success)
                    if(success){
                        res.send({success:'removed'})
                    }
                })
            }
        });

    }
})


app.listen(port, function () {
    console.log('server port', port)
})