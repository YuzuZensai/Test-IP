const express = require("express");
const app = express();

app.get("/", (req, res) => {
    const ip = req.socket.remoteAddress;

    let data = "";
    data = `IP: ${ip}<br/>`;

    for (let key in req.headers) {
        data += `${key}: ${req.headers[key]}`;
        data += "<br/>";
    }
    res.send(data);
    res.end();
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
