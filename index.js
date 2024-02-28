const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const TheSchemaTable = require("./models/TheSchemaTable");
const app = express();
require("dotenv").config();

mongoose.connect(process.env.URI)
.then(()=>{
console.log("YOU ARE CONNECTED TO MONGOOSE");

})
.catch(error=>{

    console.log(error);
});

const port = process.env.PORT || 3002;


app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.get("/home",async(req,res)=>{
const FindAll = await TheSchemaTable.find({});
res.render("index",{FindAll});


});

app.get("/show/:id",async(req,res)=>{
const {id} = req.params;
const FindOneById = await TheSchemaTable.findById(id);
res.render("show",{FindOneById});


});

app.get("/post",(req,res)=>{
 res.render("post");

});

app.post("/home",async(req,res)=>{

const NewPost = new TheSchemaTable({
    item:req.body.item,
    price:req.body.price
});
await NewPost.save();
res.redirect("/home");


});

////////////////////////////////
app.get('/show/:id/edit', async (req, res) => {
    const { id } = req.params;
    const EditItem = await TheSchemaTable.findById(id);
    res.render('edit', {EditItem})
})

app.put('/show/:id', async (req, res) => {
    const { id } = req.params;
    const FindByIdAndUpdate = await TheSchemaTable.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/show/${FindByIdAndUpdate._id}`);
})

app.delete('/show/:id', async (req, res) => {
    const { id } = req.params;
    const DeletedItem = await TheSchemaTable.findByIdAndDelete(id);
    res.redirect('/show');
})


app.listen(port,(req,res)=>{
    console.log(`You are on port${port}`);

});