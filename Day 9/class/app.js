// const http = require("http");
// const fs = require("fs");
import http from "http";
import fs from "fs";

// let server = http.createServer((req, res) => {
//   if (req.url == "/" && req.method == "GET") {
//     fs.readFile("./views/index.html", "utf-8", (err, data) => {
//       if (err) {
//         console.log(err);
//         return;
//       } else {
//         console.log(data);

//         res.writeHead(200, "Sucess", { "content-type": "text/html" });
//         res.write(data);
//         res.end();
//       }
//     });
//   } else if (req.url == "/" && req.method == "POST") {
//     res.write("This is home route, POST Method");
//     res.end();
//   } else if (req.url == "/" && req.method == "DELETE") {
//     res.write("This is home route, Delete Method");
//     res.end();
//   } else if (req.url == "/about" && req.method == "GET") {
//     fs.readFile("./views/about.html", "utf-8", (err, data) => {
//       if (err) {
//         console.log(err);
//         return;
//       } else {
//         res.writeHead(200, "Sucess", { "content-type": "text/html" });
//         res.write(data);
//         res.end();
//       }
//     });
//   } else {
//     res.writeHead(404, "Not Found", { "content-type": "text/html" });
//     res.write("<h1>404 Not Found</h1>");
//     res.end();
//   }
// });

let server = http.createServer((req, res) => {
  if (req.url == "/" && req.method == "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body = body + chunk.toString(); //++ -- += body = body + chunk
      // console.log(chunk.toString());
    });

    req.on("end", () => {
      let parsedData = JSON.parse(body);

      res.writeHead(200, "Ok", { "content-type": "application/json" });
      res.write(JSON.stringify(parsedData));
      res.end();
    });
  }
});

server.listen(5000, () => {
  console.log("server is running....");
});
