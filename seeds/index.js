const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: 'https://source.unsplash.com/collection/483251',
            description: 'A great place for all',
            price: price,
            author: '6110297a08357142899aecd5',
            geometry: {
                type: "Point",
                coordinates:[
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/laifukun/image/upload/v1628651826/yelpcamp/e2ic59d3hnrcxolixxj9.jpg',
                    filename: 'yelpcamp/e2ic59d3hnrcxolixxj9'
                },
                {
                    url: 'https://res.cloudinary.com/laifukun/image/upload/v1628650180/yelpcamp/aogwawyfa5aopsawjlni.jpg',
                    filename: 'yelpcamp/aogwawyfa5aopsawjlni',
                },
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})