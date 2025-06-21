const express = require("express");
const adminMiddleware = require("../middleware/admin");
const router = express.Router();
const {Admin} = require("../db");
const {Course} = require("../db")

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

   await Admin.create({
        username,
        password
    })
  res.json({
    message:"Admin created successfully"
  }) 
}); 

router.post('/courses', adminMiddleware, async (req, res) => {

    const title = req.body.title;
    const description =  req.body.description;
    const price = req.body.price;
    const ImageLink = req.body.ImageLink; 
    
     const newCourse = await Course.create({
        title,
        description,
        price,
        ImageLink
    })
    res.json({msg: "Course created successfully", Course_Id : newCourse._id })

});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic

    Course.find({})
    .then(function(response){
        res.json({
            courses:response
        })
    })
});

module.exports = router;