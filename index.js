require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@naujieji.kmnhx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
    .then(()=> console.log('Connect to MongoDB...'))
    .catch(err => console.error("Could not connect to MongoDB...", err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});


//Class
const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    //object
        const course = new Course({
            name: "dotenv",
            author: "Jolita",
            tags: ['npm', 'dotenv'],
            isPublished: true
        });

        const result = await course.save();
        console.log(result);
}

//createCourse();

//get data from mongodb

async function getCourses() {
    const courses = await Course.find();
    console.log(courses);
}

getCourses()
