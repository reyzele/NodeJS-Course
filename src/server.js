const http = require("http");
require("dotenv").load();

const port = process.env.PORT;
const timerInterval = process.env.INTERVAL_TIME;
const timerStop = process.env.STOP_INTERVAL_TIME;
const server = http.createServer((req, res) => {
  const timeEnd = getTime() + +timerStop;
  let timeNow;

  var timer = setInterval(() => {
    timeNow = getTime();

    if (req.url === "/" && timeNow <= timeEnd) {
      console.log(timeNow);
    } else {
      res.end(new Date(timeNow).toString());
      clearInterval(timer);
    }
  }, timerInterval);
});

function getTime() {
  return Date.now();
}

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
