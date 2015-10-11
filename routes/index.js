var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var myFirebaseRef = new firebase("https://popping-inferno-8464.firebaseio.com/");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs');
});

router.get('/bin', function(req, res, next) {
  res.redirect('/error');
});

router.get('/bin/:id', function ( req, res, next ) {
    var bin_id = req.params['id'];
    console.log('retrieving '+req.params['id']);

    var newPage = myFirebaseRef.child('bin/'+bin_id);
    newPage.once('value', function(snapshot){
      if(snapshot.exists())
        res.render('bin.ejs', {id: bin_id});
      else {
        res.render('error.ejs', {message: bin_id+' does not exist!'});
      }

    });

    //res.render('bin.ejs', {id: bin_id});
    // db query, etc
});

router.post('/', function ( req, res, next ) {
    var bin_id = req.body.token;
    console.log('id '+bin_id);


    var newPage = myFirebaseRef.child('bin/'+bin_id);
    newPage.set({content: "", timestamp: firebase.ServerValue.TIMESTAMP});

    res.redirect('/bin/'+bin_id);
    // db query, etc
});


module.exports = router;
