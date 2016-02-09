var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var recipes = [
        { Name: "Gumbo", Rating: 1, Tags: "Creole, Cajun" },
        { Name: "Chicken and Corn", Rating: 10, Tags: "Chicken" }
    ];
    res.render('index', { title: 'Recipes', recipes: recipes });
});

module.exports = router;
