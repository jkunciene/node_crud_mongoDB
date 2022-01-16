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
            name: "Another Courses",
            author: "Jolita",
            tags: ['js', 'javascript'],
            isPublished: false
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

//getCourses();

//get filtered data
async function getFilteredCourses() {
    const courses = await Course   
    //Starts with Jolita
    .find({ author: /^Jolita/ })   
    
    //Ends whit Course (i - not important case sensitive)
    .find({ name: /course$/i})

    // Contains DB
    .find({ name: /.*db.*/i})

    .sort({ name: 1 })  
    .select({ author: 1, name: 1, tags: 1 })
    console.log(courses);
}

//getFilteredCourses();

//Counting
async function getCoursesNumber() {
    const courses = await Course
    .find()
    .count()
    console.log(courses);
}

//getCoursesNumber();

//Pagination
async function getCoursesPages() {
    const pageNumber = 1;
    const pageSize = 2;
    // /api/courses?pageNumber=2&pageSize=10

   const courses = await Course
    .find()
    .skip((pageNumber - 1) * pageSize)   
    .limit(pageSize) 
    console.log(courses);
}
//getCoursesPages()

//firts method -> approach: Query first
//findById()
//Modify its properties
//save
async function updateCourse(id){
    const course = await Course.findById(id);
    if(!course) return;

    if(course.isPublished) return;

    course.isPublished = true;
    course.author = "Another Author";
    const result = await course.save();
    console.log(result);
}
// getCourses();
// updateCourse('61cda3bcd600a4a55f6046b1');
// getCourses();
//----------------------------------------
//second method -> approach: update first
//update directly
//optionally : get the updated document
async function updateCourse(id){
    const result = await Course.updateOne({
        _id: id }, {
            $set: {
                author: "Updated Author",
                isPublished: false
            }
    });
    console.log(result);
}

// getCourses();
// updateCourse('61cda452f845fb7357008d30');
// getCourses();

//-----------------------------------
//one more method for updating data

async function updateCourse(id){
    const course = await Course.findByIdAndUpdate( id , {
            $set: {
                author: "Jack",
                isPublished: true
            }
    }, { new: true});

    console.log(course);
}

// updateCourse('61cda452f845fb7357008d30');

//-----------------------------------------
async function removeCourse(id){
    
    const course = await Course.findByIdAndRemove(id);
    console.log(course);

    }

//removeCourse('61cdb30c2aab0dbd3e02c23c')

async function removeCourses(){
    
    const courses = await Course.deleteMany({
        isPublished: false
    });
    console.log(courses);
    }

   removeCourses();