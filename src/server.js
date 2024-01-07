const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.port || 3000;
const files = require("./modules/files.module/routes");
const cors = require('cors');
const { receiveMessage } = require("./modules/rabbit/receive");

app.use(express.json({ limit: "5000kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.get("/", (req, res) => res.send("Hello World!"));

app.get("/supporting_academies", (req, res) => {
  res.jsonp({
    error: "",
    data: { result: ["math", "physics"] },
  });

})

app.use("/files", files);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  receiveMessage(process.env.service_queue);

});

