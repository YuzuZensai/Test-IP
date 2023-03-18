const express = require("express");
const app = express();

app.get("/", (req, res) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    res.send(ip);
    res.end();
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
