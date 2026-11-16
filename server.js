var express = require("express"); //Requires the Express module
var cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const { MongoClient, ObjectId } = require("mongodb");
const uri = process.env.MONGODB_PREFIX + process.env.MONGODB_USERNAME + ":" +
process.env.MONGODB_PASSWORD + process.env.MONGODB_URL;
const client = new MongoClient(uri);
const db = client.db("Afterschoolclub");
let lessonArray = [
    {
        lessonId: 1,
        lessonTitle: 'Maths After School Club',
        subject: 'Maths',
        location: 'Middlesex University, Hendon Campus, Room 101',
        price: 10,
        availability: 5,
        photo: {
            image: 'images/maths.jpg',
            alt: 'Maths lesson'
        }
    },
    {
        lessonId: 2,
        lessonTitle: 'Science After School Club',
        subject: 'Science',
        location: 'Middlesex University, Hendon Campus, Room 102',
        price: 12,
        availability: 5,
        photo: {
            image: 'images/science.jpg',
            alt: 'Science lesson'
        }
    },

        {
        lessonId: 3,
        lessonTitle: 'English After School Club',
        subject: 'English',
        location: 'Middlesex University, Hendon Campus, Room 103',
        price: 8,
        availability: 5,
        photo: {
            image: 'images/english.jpg',
            alt: 'English lesson'
        }
    }, 

    {
        lessonId: 4,
        lessonTitle: 'History After School Club',
        subject: 'History',
        location: 'Middlesex University, Hendon Campus, Room 104',
        price: 15,
        availability: 5,
        photo: {
            image: 'images/history.jpg',
            alt: 'History lesson'
        }
    },

    {
        lessonId: 5,
        lessonTitle: 'Art After School Club',
        subject: 'Art',
        location: 'Middlesex University, Hendon Campus, Room 105',
        price: 20,
        availability: 5,
        photo: {
            image: 'images/art.jpg',
            alt: 'Art lesson'
        }
    },
{
    lessonId: 6,
    lessonTitle: 'Music After School Club',
    subject: 'Music',
    location: 'Middlesex University, Hendon Campus, Room 106',
    price: 18,
    availability: 5,
    photo: {
        image: 'images/music.jpg',
        alt: 'Music lesson'
    }
},
{
    lessonId: 7,
    lessonTitle: 'Physical Education After School Club',
    subject: 'Physical Education',
    location: 'Middlesex University, Hendon Campus, Room 107',
    price: 14,
    availability: 5,
    photo: {
        image: 'images/pe.jpg',
        alt: 'Physical Education lesson'
    }
},
{
    lessonId: 8,
    lessonTitle: 'Computer Science After School Club',
    subject: 'Computer Science',
    location: 'Middlesex University, Hendon Campus, Room 108',
    price: 22,
    availability: 5,
    photo: {
        image: 'images/computer_science.jpg',
        alt: 'Computer Science lesson'
    }
},

{
    lessonId: 9,
    lessonTitle: 'Drama After School Club',
    subject: 'Drama',
    location: 'Middlesex University, Hendon Campus, Room 109',
    price: 16,
    availability: 5,
    photo: {
        image: 'images/drama.jpg',
        alt: 'Drama lesson'
    }
},

{
    lessonId: 10,
    lessonTitle: 'Foreign Language After School Club',
    subject: 'Foreign Language',
    location: 'Middlesex University, Hendon Campus, Room 110',
    price: 25,
    availability: 5,
    photo: {
        image: 'images/foreign_language.jpg',
        alt: 'Foreign Language lesson'
    }
}
];

// Calls the express function to start a new Express application
var app = express();

app.use(cors());
app.use(express.json());

app.use(function(request, response, next) { //middleware

console.log("In comes a " + request.method + " request to: " + request.url);
next();
});

app.get("/lessons", async function(request, response) {
let collection = await db.collection("lessons");
let results = await collection.find({}).toArray();
response.send(results);
});

app.post("/orders", async function(request, response) {
let body = request.body;
let collection = await db.collection("orders");
let result = await collection.insertOne(body);
response.send(result);
});

app.put("/lessons/:_id", async function(request, response) {
var body = request.body;
let collection = await db.collection("lessons");
let tempid = request.params._id;

const query = { _id: new ObjectId(tempid) };
const updates = {
$set: request.body
};
let result = await collection.updateOne(query, updates);
response.send(result);
console.log(result);
});

app.listen(3000, function() {
console.log("App started on port 3000");
});
