const { Router } = require("express");
const mongoose = require("mongoose");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const user = await req.user;
    res.send([...user.tasks]);
  } catch (err) {
    return console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await req.user;
    user.tasks.push({
      title: req.body.title,
      completed: req.body.completed,
      createdAt: req.body.createdAt,
      modifiedAt: req.body.modifiedAt,
    });
    await user.save();
    res.status(201).send();
  } catch (err) {
    return console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    req.user.removeTask(req.params.id);
    res.status(204).send();
  } catch (err) {
    return console.log(err);
  }
});

router.put("/", async (req, res) => {
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
    return console.log(err);
  }
});

module.exports = router;
