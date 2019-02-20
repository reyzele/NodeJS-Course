const http = require('http');
const port = 3000;
const timerInterval = 1000;
const timerStop = 5000;
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
