const http = require("http");
require("dotenv").load();

const port = process.env.PORT;
const timerInterval = process.env.INTERVAL_TIME;
const timerStop = process.env.STOP_INTERVAL_TIME;
const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    const timeEnd = getTime() + +timerStop;
    let timeNow;
    var timer = setInterval(() => {
      timeNow = getTime();
      if (timeNow < timeEnd) {
        console.log(timeNow);
      } else {
        clearInterval(timer);
        res.end(new Date(timeNow).toString());
      }
    }, timerInterval);
  } else {
    console.error("Not GET");
    res.end("Method must be GET");
  }
});

function getTime() {
  return Date.now();
}

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
