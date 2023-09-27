const mongoose = require("mongoose");
const Campground = require("../models/campground");
const {places, descriptors} = require("./seedHelpers");
const cities = require("./cities")

mongoose.connect("mongodb://127.0.0.1:27017/newCamping",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db= mongoose.connection;
db.on("error",()=>{
    console.log("failed to connect");
})
db.once("open",()=>{
    console.log("mongo connected 2");
})

// const sample= Array = Array[Math.floor(Math.random()*Array.length)]


const seedDB= async()=>{
    await Campground.deleteMany({});
    console.log("function ke andar hu")
    for(let i=0;i<50;i++){
        const rand1000= Math.floor(Math.random()*1000);
        const rand20= Math.floor(Math.random()*20);
        const price= Math.floor(Math.random()*1000);
        const camp = new Campground({
            location: `${cities[rand1000].rank},${cities[rand1000].state}`,
            title: `${descriptors[rand20]} ${places[rand20]}`,
            image: 'https://source.unsplash.com/collection/483521',
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id mollitia atque optio. Optio, impedit. Illum mollitia incidunt inventore vero animi in ex. Expedita fugiat tenetur eaque. Distinctio aliquam ipsum sapiente!",
            price: price
        })
       await camp.save()
    }
    console.log("all of them are added")
}

seedDB()
.then(()=>{
    mongoose.connection.close();
})
