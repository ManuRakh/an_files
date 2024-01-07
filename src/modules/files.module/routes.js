const express = require("express");

const router = express.Router();
const { create, getFile, deleteFile } = require("./files.controller");

router.post("/", async (req, res) => {
  await create(req, res);
});

router.get("/:id", async (req, res) => {
  await getFile(req, res);
});

router.delete("/:id", async (req, res) => {
    await deleteFile(req, res);
  });

module.exports = router;
