var express=require("express");
var bodyParser=require("body-parser");

var app=express();
var moviedata,commentdata;
app.use(bodyParser.json());
app.use(express.static(__dirname+"/public"))
var fs=require("fs");
fs.readFile('/Angular/ExpressTutorial/Public/movie_data.json', 'utf8', function (err, data) {
  if (err) throw err;
  moviedata = JSON.parse(data);
});
fs.readFile('/Angular/ExpressTutorial/Public/comments.json', 'utf8', function (err, data) {
  if (err) throw err;
  commentdata = JSON.parse(data);
});

app.get("/moviedata",function(req,res){
res.json(moviedata);
});
app.get("/commentdata",function(req,res){
res.json(commentdata);
});
app.post("/commentdata",function(req,res){
var obj=JSON.stringify(req.body)
fs.writeFile('/Angular/ExpressTutorial/Public/comments.json', obj, 'utf8', callback);
});
app.listen(3000);
console.log("server running on port 3000");