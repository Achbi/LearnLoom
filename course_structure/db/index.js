const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://harshit2201148ec:n8h7CjiXmjyi4F6F@cluster0.5k7dpvt.mongodb.net/course_app");

const adminschema = new mongoose.Schema({
    username: String,
    password: String

});

const Userschema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [
        {
         type: mongoose.Schema.Types.ObjectID,

         ref: "Course"}
    ]
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    imagelink: String,
    price:Number
});

const admin = mongoose.model('admin',adminschema);
const user = mongoose.model('user',Userschema);
const course = mongoose.model('Course',CourseSchema);

module.exports = {
    admin,
    user,
    course
}
