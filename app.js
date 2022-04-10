import express from "express";
const app = express();

import fetch from "node-fetch";

import nodeCache from "node-cache";
const myCache = new nodeCache({ stdTTL: 10 }); // 10 seconds

app.get("/", async (req, res) => {
  const cached = myCache.get("data"); // get cached data
  if (cached) return res.send(cached); // send cached data
  const result = await fetch("https://api.github.com/users/mahdiydev"); // fetching the data from the api
  const data = await result.json(); // converting the data to json
  myCache.set("data", data); // caching the data
  res.send(data);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
