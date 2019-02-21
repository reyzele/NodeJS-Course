const http = require('http');
require('dotenv').load();

const port = process.env.PORT;
const timerInterval = process.env.INTERVAL_TIME;
const timerStop = process.env.STOP_INTERVAL_TIME;
const server = http.createServer((req, res) => {
  var timer = setInterval(() => {
    if (req.url === '/') {
      console.log(getTime());
    }
  }, timerInterval);

  setTimeout(() => {
    res.end(getTime());
    clearInterval(timer);
  }, timerStop);
});

function getTime () {
  return new Date(Date.now()).toString();
}

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
