const cron = require("node-cron");
const express = require("express");

const app = express();

cron.schedule("*/5 * * * * *", function () {
  console.log("---------------------");
  console.log("running a task every 5 seconds");
});

app.listen(5000, () => {
  console.log("application listening.....");
});