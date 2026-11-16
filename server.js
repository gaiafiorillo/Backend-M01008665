var express = require("express"); //Requires the Express module
var cors = require("cors");
var path = require("path");
require("dotenv").config({ path: "./config.env" });
const { MongoClient, ObjectId } = require("mongodb");
const uri = process.env.MONGODB_PREFIX + process.env.MONGODB_USERNAME + ":" +
process.env.MONGODB_PASSWORD + process.env.MONGODB_URL;
const client = new MongoClient(uri);
const db = client.db("Afterschoolclub");

// Calls the express function to start a new Express application
var app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(function(request, response, next) { //middleware

console.log("In comes a " + request.method + " request to: " + request.url);
next();
});

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/images", function(request, response) {
response.status(404).send("Image not found: " + request.url);
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

app.listen(port, function() {
console.log("App started on port " + port);
});
