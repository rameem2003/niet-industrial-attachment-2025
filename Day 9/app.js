const fs = require("fs");
const url = require("url");
const http = require("http");
const os = require("os");

console.log(os.totalmem() / (1024 * 1024 * 1024)); // in GB

// write a file
// console.log(fs);

// fs.writeFile("demo.txt", "Hello World", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("File written successfully");
//   }
// });

// fs.appendFile("demo.txt", " Banglaedesh", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("File written successfully");
//   }
// });

// fs.writeFile("index.html", "<h1>Hello World</h1>", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("File written successfully");
//   }
// });

// fs.unlink("demo.txt", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("File deleted successfully");
//   }
// });

// fs.readFile("index.html", "utf-8", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// let myurl = "http://localhost:8000/about?year=2024&month=february";

// let formatedUrl = url.parse(myurl, true);

// console.log(formatedUrl.query.month);

let myServer = http.createServer((req, res) => {
  //   console.log(req);
  //   res.end("NIET Industrial Attachment 2025 - Node.js");

  // fs.readFile("index.html", "utf-8", (err, data) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.writeHead(201, "All OK", { "content-type": "text/html" });
  //     res.write(data);
  //     res.end();
  //   }
  // });

  if (req.url == "/" && req.method == "GET") {
    res.writeHead(201, "All OK", { "content-type": "text/html" });
    res.write("<h1>Hello World</h1>");
    res.end();
  }

  if (req.url == "/" && req.method == "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      console.log(JSON.parse(body));
      res.end("Data received");
    });

    res.writeHead(201, "All OK", { "content-type": "text/html" });
    res.write("<h1>Data received</h1>");
    res.end();
    return;
  }
});

myServer.listen(5000, () => {
  console.log("Server is running on port http://localhost:5000");
});
