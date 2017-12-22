const express = require('express')
const app = express();
const r = require('rethinkdb')

function getData(cb){
    var connection = null;
    r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
        if (err) throw err;
        connection = conn;

        r.db('test').tableCreate('authors').run(connection, function(err, cursor) {
          if (err) throw err;
          cursor.toArray(function(err, result) {
              cb(result)
          });
        })
    })
}

app.get('/', (req, res) => {
    getData(function(result){
        return res.json({result})
    })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
