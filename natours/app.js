const express = require("express");

const app = express();

app.get("/", (req, res) => {
	res.send("Test response");
});

app.listen(3000);
