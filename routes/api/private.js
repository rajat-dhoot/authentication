const express = require("express");
const router = express.Router();

router.get("/secret", (req, res) => {
   return res.status(200).json({ message: "Secret message..." });
});

module.exports = router;
