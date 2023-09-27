const mongoose = require("mongoose");
const express = require("express");
const Campground = require("./models/campground");
const FEEDBACKS = require("./models/feedback");
const app = express();
const path = require('path');

app.use(express.static('imports'));

const ejsMate= require("ejs-mate");
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
const methodOverride = require("method-override");

mongoose.connect("mongodb://127.0.0.1:27017/newCamping",{
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useCreateIndex: true/
});
const db= mongoose.connection;
db.on("error",()=>{
    console.log("failed to connect");
})
db.once("open",()=>{
    console.log("mongo connected");
})

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.engine('ejs', ejsMate);

app.get('/',(req,res)=>{
    res.render("home");
})
app.get('/campground/index2',async (req,res)=>{
    const camps = await Campground.find();
    res.render("campgrounds/index2", {camps});
})

app.get('/campground/dashboard',(req,res)=>{
    res.render("campgrounds/dashboard");
})

app.get('/campground/signup',(req,res)=>{
    res.render("campgrounds/signup");
})

app.get('/campground/feedback',(req,res)=>{
    res.render("campgrounds/feedback");
})

app.get('/campground/view_feedback',(req,res)=>{
    res.render("campgrounds/view_feedback");
})

app.get('/campground/about',(req,res)=>{
    res.render("campgrounds/about_us");
})

app.get('/campground/title',(req,res)=>{
    res.render("campgrounds/title");
})


app.get('/campground/login',(req,res)=>{
    res.render("campgrounds/login");
})

app.get('/campground/new', (req,res)=>{
    // const camps = await Campground.find();
    res.render("campgrounds/new"); 
})
app.get('/campground/next', (req,res)=>{
    // const camps = await Campground.find();
    res.render("campgrounds/next"); 
})
app.get('/campground/upload', (req,res)=>{
    // const camps = await Campground.find();
    res.render("campgrounds/uploadContent"); 
})
app.post('/campgrounds', async(req,res)=>{
    const newCamp = new Campground(req.body.campground);
    // res.render("campgrounds/show", {newCamp});
    // console.log(req.body);
    await newCamp.save();
    res.redirect(`campgrounds/${newCamp._id}`);
})


app.post('/camps', async(req,res)=>{
    const feedback = new FEEDBACKS(req.body.feedback);
    // res.render("campgrounds/show", {newCamp});
    console.log(req.body);
    await feedback.save();
    // res.redirect(`campground/view_feedback`);
})
app.get('/campground',async (req,res)=>{
    const camps = await Campground.find();
    res.render("campgrounds/index", {camps}); 
})
app.get('/campground/campground',async (req,res)=>{
    const camps = await Campground.find();
    res.render("campgrounds/index", {camps}); 
})
app.get('/campground2',async (req,res)=>{
    const backs = await FEEDBACKS.find();
    res.render("campgrounds/view_feedback", {backs}); 
})

app.get('/campgrounds/:id/edit',async (req,res)=>{
    const camp=await Campground.findById(req.params.id)
    res.render("campgrounds/edit",{camp}); 
})


app.get('/campgrounds/:id',async (req,res)=>{
    const camp=await Campground.findById(req.params.id)
    res.render("campgrounds/show",{camp}); 
})


app.get('/campground2/:id',async (req,res)=>{
    const camp=await FEEDBACKS.findById(req.params.id)
    res.render("campground/dashboard",{camp}); 
})






app.get('*',(req,res)=>{
    res.send("BAD REQUEST!");
})

app.put('/campground/:id', async(req,res) =>{
    const { id }= req.params;
    const campg = await Campground.findByIdAndUpdate(id,{...req.body.campground})
    res.redirect(`/campgrounds/${campg._id}`)
})

app.delete('/campground/:id',async(req,res)=>{
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campground');
})


app.listen(3000,()=>{
    console.log("connected to port 3000 !");
})