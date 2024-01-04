const mongoose = require('mongoose');
const cities = require('./cities');
const Campground = require('../models/campground');
const {places, descriptors} = require('./seedHelper');
mongoose.connect('mongodb://127.0.0.1:27017/EXPLOREWANDER',{
    // useNewUrlParser: true,
    // useUnifiedTopology:true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open",()=>{
    console.log("database connected");
});
const sample = array=> array[Math.floor(Math.random() * array.length)];

const seedDB = async ()=>{
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
        
        const random1000=Math.floor(Math.random()*1000);
        const price=Math.floor(Math.random()*20)+20;
        
        const camp= new Campground({
        author: '6592ad4e5f8fcf351eb83e34',
        location: `${cities[random1000].city}, ${cities[random1000].state}`,
        title: `${sample(descriptors)} ${sample(places)}`,
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, recusandae ullam quo harum cum earum, optio ut, distinctio placeat eum commodi eos nesciunt! Magnam repellendus fuga hic optio laborum in.',
        price,
        geometry: {
            type: "Point",
            coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
            ]
        },
        images: [
            {
              url: 'https://res.cloudinary.com/dzsl6euxg/image/upload/v1704278621/YelpCamp/gxgnbaam5gfyra1btgll.jpg',
              filename: 'YelpCamp/gxgnbaam5gfyra1btgll'
            },
            {
              url: 'https://res.cloudinary.com/dzsl6euxg/image/upload/v1704278621/YelpCamp/tmco7tvovmkdqyuye78t.jpg',
              filename: 'YelpCamp/tmco7tvovmkdqyuye78t'
            }
          ],
        })
        
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})