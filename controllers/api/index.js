const router = require("express").Router();
const postRoutes = require("./postRoutes");
const userRoutes = require("./userRoutes");


router.use("/post", postRoutes);
router.use("/user", userRoutes);

module.exports = router;
