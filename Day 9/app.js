const fs = require("fs");
const url = require("url");
const http = require("http");

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

  fs.readFile("index.html", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.writeHead(201, "All OK", { "content-type": "text/html" });
      res.write(data);
      res.end();
    }
  });
});

myServer.listen(5000, () => {
  console.log("Server is running on port http://localhost:5000");
});
