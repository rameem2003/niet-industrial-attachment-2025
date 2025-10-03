const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const os = require("os");
const { windows, mac } = require("./data");
const statusMonitor = require("express-status-monitor");

let server = http.createServer((req, res) => {
  // console.log(req);
  // res.end();

  // let p = path.resolve("relative/path/file.txt");
  // console.log(path.dirname(p));

  // let webpath = url.parse(req.url, true);
  // console.log(webpath);
  if (req.url == "/" && req.method == "GET") {
    let stream = fs.createReadStream("demo.txt");

    stream.on("data", (chunk) => {
      res.write(chunk);
      // res.end();
    });

    stream.on("end", () => {
      res.end();
    });
    return;

    // fs.readFile("demo.text", "utf-8", (err, data) => {
    //   if (err) {
    //     res.writeHead(404, { "content-type": "text/html" });
    //     res.write("<h1>404</h1>");
    //   } else {
    //     res.writeHead(200, { "content-type": "text/plain" });
    //     res.write(data);
    //     res.end();
    //   }
    // });
  } else if (req.url == "/about" && req.method == "GET") {
    fs.readFile("./views/about.html", "utf-8", (err, data) => {
      if (err) {
        res.writeHead(404, { "content-type": "text/html" });
        res.write("<h1>404</h1>");
      } else {
        res.writeHead(200, { "content-type": "text/html" });
        res.write(data);
        res.end();
      }
    });
  } else if (req.url == "/download" && req.method == "GET") {
    if (os.platform() == "win32") {
      fs.writeFile("./views/download.html", windows, (err, data) => {
        if (err) {
          res.writeHead(404, { "content-type": "text/html" });
          res.write("<h1>404</h1>");
          res.end();
        } else {
          fs.readFile("./views/download.html", "utf-8", (err, data) => {
            if (err) {
              res.writeHead(404, { "content-type": "text/html" });
              res.write("<h1>404</h1>");
            } else {
              res.writeHead(200, { "content-type": "text/html" });
              res.write(data);
              res.end();
            }
          });
        }
      });
    } else {
      fs.writeFile("./views/download.html", mac, (err, data) => {
        if (err) {
          res.writeHead(404, { "content-type": "text/html" });
          res.write("<h1>404</h1>");
          res.end();
        } else {
          fs.readFile("./views/download.html", "utf-8", (err, data) => {
            if (err) {
              res.writeHead(404, { "content-type": "text/html" });
              res.write("<h1>404</h1>");
            } else {
              res.writeHead(200, { "content-type": "text/html" });
              res.write(data);
              res.end();
            }
          });
        }
      });
    }
  } else if (req.url == "/data" && req.method == "POST") {
    let body = "";

    // Listen for incoming data chunks
    req.on("data", (chunk) => {
      console.log("Received chunk:", chunk.toString());
      body += chunk;
    });

    // When all chunks are received
    req.on("end", () => {
      console.log("Full body:", body);

      // If JSON, parse it
      try {
        const data = JSON.parse(body);
        console.log("Parsed JSON:", data);
      } catch (e) {
        console.log("Not valid JSON");
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Data received successfully" }));
    });
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>404</h1>");
    res.end();
  }
});

server.listen(5000, () => {
  console.log("Server is running");
});
