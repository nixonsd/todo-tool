const { Router } = require("express");
const mongoose = require("mongoose");
const auth = require("../../middleware/auth")
const router = Router();

router.get("/", auth, async (req, res) => {
  try {
    const user = await req.user;
    res.send([...user.tasks]);
  } catch (err) {
    return console.log(err.message);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const user = await req.user;
    const task = {
      _id: mongoose.Types.ObjectId(),
      title: req.body.title,
      completed: req.body.completed,
      createdAt: req.body.createdAt,
      modifiedAt: req.body.modifiedAt,
    };
    user.tasks.push(task);
    await user.save();
    res.status(201).send(task);
  } catch (err) {
    return console.log(err.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    req.user.removeTask(req.params.id);
    res.status(204).send();
  } catch (err) {
    return console.log(err.message);
  }
});

router.put("/", auth, async (req, res) => {
  try {
    req.user.updateTask({
      _id: req.body._id,
      title: req.body.title,
      completed: req.body.completed,
      createdAt: req.body.createdAt,
      modifiedAt: req.body.modifiedAt,
    });

    res.status(200).send();
  } catch (err) {
    return console.log(err.message);
  }
});

module.exports = router;
