const express = require("express");

const userRouter = require("./user/route");
const problemRouter = require("./problem/poblem");
const submissionRouter= require("./submission/submission")
const router = express.Router();

router.use("/user",userRouter);
router.use("/problem",problemRouter);
router.use("/submission",submissionRouter);

module.exports=router; 