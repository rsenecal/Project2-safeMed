const router = require('express').Router();

//GET homepage
router.get("/", (req, res) => {
    res.render("all", {layout: "homepage"})
    //render 
})




module.exports = router;