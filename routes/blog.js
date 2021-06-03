var express = require('express');
var router = express.Router();
const { body, validationResult, check } = require('express-validator');

const url = 'localhost:27017/TutorialDB';
const db = require('monk')(url);


/* GET users listing. */
router.get('/', function(req, res, next) {
  req.flash("success", "ยินดีต้อนรับ");
  res.render("blog",{product:'cars'});
});
router.get('/add', function(req, res, next) {
    res.render("addBlog");
  });
router.post('/add', [
  check("article","Please input your blog name ").not().isEmpty(),
  check("description","Please input your Description ").not().isEmpty(),
  check("author","Please input your Author name ").not().isEmpty()
],function(req, res, next) {
  console.log(req.body);
  const result = validationResult(req);
  var errors = result.errors;
  if (!result.isEmpty()) {
    console.log(errors);
    res.render('addBlog',{errors:errors});
  }
  else{
    // res.render('addBlog');
    //insert to db
    var  ct =db.get('blogs');
    ct.insert({
      name:req.body.article,
      desc:req.body .description,
      author:req.body.author
    },function(err,blog){
      if(err){
        res.send(err);
      }
      else{
        req.flash("success", "บันทึกข้อความสำเร็จ");
        res.setHeader('Content-Type', 'application/json');
        // res.location('/blog/add');
        res.redirect('/blog/add');
      }
    })
  }
  });
module.exports = router;
