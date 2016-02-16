var express = require('express');
var mongodb = require('mongodb');
var ObjectId = mongodb.ObjectId;
var router = express.Router();
var Recipe = require('../models/recipe.js');

var dbUrl = 'mongodb://localhost:27017/foodstuffs';
var mongoClient = mongodb.MongoClient;


/* GET home page. */
router.get('/', function (req, res, next) {

    mongoClient.connect(dbUrl, function (err, db) {
        if (err) {
            console.log('Unable to connect to the server', err);
        } else {
            console.log("Connection Established to Mongodb");

            var collection = db.collection('recipes');

            collection.find({}).toArray(function (err, result) {

                if (err) {
                    res.send(err);
                } else if (result.length > 0) {
                    res.render('index', { title: 'Recipes', recipes: result });
                } else {
                    res.render('index', { title: 'Recipes', nonemessage: "Make a new recipe to get started." });
                }
                db.close();
            });
        }
    });
});


/* GET create page */
router.get('/create', function (req, res) {
    var blank = new Recipe("", "", "", 0, "");
    res.render('create-edit', { title: 'New Recipe', recipe: blank, submitRoute: '/create' });
});


/* POST create page */
router.post('/create', function (req, res) {

    mongoClient.connect(dbUrl, function (err, db) {
        if (err) {
            console.log('Unable to connect to the server', err);
        } else {
            console.log("Connection Established to Mongodb");

            var collection = db.collection('recipes');

            var fm = req.body;

            /* need to scrub inputs */

            var newRecipe = new Recipe(fm.Name, fm.Ingredients, fm.Instructions, fm.Rating, fm.Tags);

            collection.insert([newRecipe], function (err, result) {
                if (err) {
                    res.send(err);
                } else {
                    res.redirect('/');
                }
                db.close();
            });
        }
    });
});

   
/* POST delete */
router.post('/delete/:id', function (req, res) {
    var id = req.params.id;

    mongoClient.connect(dbUrl, function (err, db) {
        if (err) {
            console.log('Unable to connect to the server', err);
        } else {
            console.log("Connection Established to Mongodb");

            var collection = db.collection('recipes');

            collection.remove({ _id: ObjectId(id) }, function (err, result) {
                if (err) {
                    console.log(err);
                }
                db.close();
            });
        }
    });
    res.redirect('/');
});


/* GET edit page */
router.get('/edit/:id', function (req, res) {
    var id = req.params.id;

    mongoClient.connect(dbUrl, function (err, db) {
        if (err) {
            console.log('Unable to connect to the server', err);
        } else {
            console.log("Connection Established to Mongodb");

            var collection = db.collection('recipes');

            collection.findOne({ _id: ObjectId(id) }, function (err, result) {
                if (err) {
                    console.log(err);
                }
                res.render('create-edit', { title: 'Change Recipe', recipe: result, submitRoute: '/edit/' + id });
                db.close();
            });
        }
    });
});


/* POST edit page */
router.post('/edit/:id', function (req, res) {
    var id = req.params.id;
    
    mongoClient.connect(dbUrl, function (err, db) {
        if (err) {
            console.log('Unable to connect to the server', err);
        } else {
            console.log("Connection Established to Mongodb");

            var collection = db.collection('recipes');

            var fm = req.body;

            /* need to scrub inputs */
            collection.update({ _id: ObjectId(id) },
                { Name: fm.Name, Ingredients: fm.Ingredients, Instructions: fm.Instructions, 
                Rating: fm.Rating, Tags: fm.Tags, ModifiedOn: Date.now }, function (err, result) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.redirect('/');
                    }
                    db.close();
                });
        }
    });
});


/* GET print page */
router.get('/print/:id', function (req, res) {

    var id = req.params.id;

    mongoClient.connect(dbUrl, function (err, db) {
        if (err) {
            console.log('Unable to connect to the server', err);
        } else {
            console.log("Connection Established to Mongodb");

            var collection = db.collection('recipes');

            collection.findOne({ _id: ObjectId(id) }, function (err, result) {
                if (err) {
                    console.log(err);
                }
                res.render('print-recipe', { recipe: result })
                db.close();
            });
        }
    });
});

/* GET about page */
router.get('/about', function (req, res) {
    res.render('about');
});

module.exports = router;
