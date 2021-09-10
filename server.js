const express = require("express");
const axios = require("axios");
// Constants
const PORT = 8000;

// App
const app = express();
const urlDB = "mongodb://mongodb-service.default.svc.cluster.local:27017/test";

// connect to db
const connectionStrings = [
  // "mongodb+srv://huy:Huy123456@cluster0.gxx1g.mongodb.net/dbapp1?retryWrites=true&w=majority",
  // "mongodb+srv://huy:Huy123456@cluster0.gxx1g.mongodb.net/dbapp2?retryWrites=true&w=majority",
  urlDB,
];

// Promise.all(
//   connectionStrings.map((connectionString) =>
//     require("mongodb").MongoClient.connect(connectionString, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//   )
// )
//   .then((clients) => {
//     console.log("connected");

//     app.connected = true;
//   })
//   .catch((error) => console.log(error));

// mongoose
//   .connect("mongodb://" + urlDB + "/test", { useNewUrlParser: true })
//   .then(() => {
//     console.log("DB connected");
//   })
//   .catch((err) => {
//     console.log("ERROR");
//   });

app.get("/", (req, res) => {
  const result = "mongo connected: " + req.app.connected;
  res.send(result);
});

app.get("/call-dataproxy", async (req, res) => {
  const response = await axios.get(
    "http://dataproxy-service.default.svc.cluster.local:5000/dataproxy"
  );

  res.send(response.data);
});

app.get("/bargainer-version", async (req, res) => {
  const response = await axios.get("https://test.mevry.com/bargainer/versions");
  res.send(response.data);
});

app.post("/create-document", async (req, res) => {
  const { body } = req;

  const response = await axios.post(
    "http://dataproxy-service.default.svc.cluster.local:5000/apps/dbapp1/collections/bargainer",
    body
  );
  res.send(response.data);
});

app.get("/get-document", async (req, res) => {
  const response = await axios.get(
    "http://dataproxy-service.default.svc.cluster.local:5000/apps/dbapp1/collections/bargainer"
  );
  res.send(response.data);
});

app.get("/app2", (req, res) => {
  res.send("hello App2");
});

app.get("/app2/audrey", (req, res) => {
  res.send("hello Audrey");
});

app.get("/path1/kube", (req, res) => {
  res.send("App1 kubernetes");
});

app.listen(PORT);
console.log(`server is running on port ${PORT}`);
