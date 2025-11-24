const express=require("express") 
const User=require("../models/user.js")

const router = express.Router();


router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});


router.post("/seed", async (_req, res) => {
  await User.deleteMany({});
  const users = await User.insertMany([
    { name: "sumanth1", email: "sumanth1@gmail.com" },
    { name: "sumanth2", email: "sumanth2@gmail.com" },
    { name: "sumanth3", email: "sumanth3@gmail.com" }
  ]);
  res.json(users);
});

module.exports = router;
