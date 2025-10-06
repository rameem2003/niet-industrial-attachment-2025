# Node JS Documentation Day 9

## Industrial Attachment - NIET

## Overview

- FS Module
- URL Module
- Path Module
- OS Module

# Node.js লেকচার: বিল্ট-ইন মডিউলস - fs, path, url, os

এই লেকচারে স্বাগতম! এখানে আমরা Node.js-এর কিছু মূল বিল্ট-ইন মডিউলস নিয়ে আলোচনা করব: **fs** (ফাইল সিস্টেম), **path**, **url**, এবং **os** (অপারেটিং সিস্টেম)। Node.js হলো একটি রানটাইম এনভায়রনমেন্ট যা সার্ভার সাইডে জাভাস্ক্রিপ্ট চালানোর সুবিধা দেয়, এবং এই মডিউলসগুলো ফাইল হ্যান্ডলিং, পাথ, URL, এবং সিস্টেম ইনফরমেশনের জন্য অপরিহার্য, কোনো এক্সটার্নাল লাইব্রেরি ছাড়াই।

আমি প্রত্যেক মডিউলকে আলাদা করে ব্যাখ্যা করব, তাদের উদ্দেশ্য, মূল মেথডস এবং কোড উদাহরণ সহ। সব উদাহরণগুলো আধুনিক Node.js ভার্সন (যেমন v20+) ধরে নেয়া। আপনি এগুলো Node.js REPL-এ বা একটি স্ক্রিপ্ট ফাইলে (যেমন `node script.js`) পরীক্ষা করতে পারেন।

## ১. fs (ফাইল সিস্টেম মডিউল)

**fs** মডিউল ফাইল সিস্টেমের সাথে ইন্টারেক্ট করার API প্রদান করে, যেমন ফাইল পড়া, লেখা, তৈরি করা, এবং মুছে ফেলা। এটি সিনক্রোনাস (ব্লকিং) এবং অ্যাসিনক্রোনাস (নন-ব্লকিং) উভয় অপারেশন সমর্থন করে। Node.js-এ অ্যাসিনক্রোনাস পছন্দনীয় কারণ এটি ইভেন্ট লুপকে ব্লক করে না।

### মূল ফিচারস:

- **অ্যাসিনক্রোনাস বনাম সিনক্রোনাস**: অ্যাসিনক্রোনাস মেথডস কলব্যাক, প্রমিস বা async/await ব্যবহার করে। সিনক্রোনাস মেথডস `Sync` দিয়ে শেষ হয় (যেমন `readFileSync`)।
- **সাধারণ মেথডস**:
  - `fs.readFile()` / `fs.readFileSync()`: ফাইলের কনটেন্ট পড়া।
  - `fs.writeFile()` / `fs.writeFileSync()`: ফাইলে লেখা।
  - `fs.appendFile()`: ফাইলে ডেটা যোগ করা।
  - `fs.unlink()`: ফাইল মুছে ফেলা।

### উদাহরণ: ফাইল পড়া এবং লেখা

```javascript
const fs = require("fs");

// অ্যাসিনক্রোনাস পড়া
fs.readFile("example.txt", "utf8", (err, data) => {
  if (err) {
    console.error("ফাইল পড়তে ত্রুটি:", err);
    return;
  }
  console.log("ফাইলের কনটেন্ট:", data);
});

// সিনক্রোনাস লেখা
try {
  fs.writeFileSync("output.txt", "হ্যালো, Node.js!");
  console.log("ফাইল সফলভাবে লেখা হয়েছে।");
} catch (err) {
  console.error("ফাইল লেখায় ত্রুটি:", err);
}
```

যদি `example.txt`-এ "এফএস-এ স্বাগতম!" থাকে, তাহলে অ্যাসিনক্রোনাস পড়া সেটা লগ করবে। সিনক্রোনাস লেখা `output.txt` তৈরি বা আপডেট করবে।

### প্রমিস ভার্সন (আধুনিক Node.js):

```javascript
const fs = require("fs/promises");

async function handleFile() {
  try {
    const data = await fs.readFile("example.txt", "utf8");
    console.log("ফাইলের কনটেন্ট:", data);
    await fs.writeFile("output.txt", "আপডেটেড কনটেন্ট");
  } catch (err) {
    console.error("ত্রুটি:", err);
  }
}

handleFile();
```

এটি প্রমিস ব্যবহার করে ক্লিন অ্যাসিনক্রোনাস কোড তৈরি করে।

### ব্যবহারের ক্ষেত্র:

- স্ট্যাটিক ফাইল সার্ভ করার সার্ভার তৈরি।
- ফাইলে ডেটা লগিং।
- বড় ডেটাসেট প্রসেসিং (স্ট্রিম ব্যবহার করে: `fs.createReadStream()`)।

**টিপ**: সবসময় ত্রুটি হ্যান্ডেল করুন, বিশেষ করে অ্যাসিনক্রোনাস অপারেশনে, ক্র্যাশ এড়াতে।

## ২. path মডিউল

**path** মডিউল ফাইল এবং ডিরেক্টরি পাথগুলোকে প্ল্যাটফর্ম-অ্যাগনস্টিক ভাবে হ্যান্ডেল করে। এটি উইন্ডোজ (ব্যাকস্ল্যাশ `\`) এবং ইউনিক্স-লাইক সিস্টেম (ফরওয়ার্ড স্ল্যাশ `/`) এর মধ্যে পার্থক্য নিয়ে কাজ করে।

### মূল ফিচারস:

- রিলেটিভ পাথকে অ্যাবসোলিউটে রেজলভ করে।
- পাথ সেগমেন্টস সেফলি জয়েন করে।
- ফাইলনেম, এক্সটেনশন বা ডিরেক্টরি অংশ এক্সট্র্যাক্ট করে।

### সাধারণ মেথডস:

- `path.join()`: পাথ সেগমেন্টসকে সঠিক সেপারেটর দিয়ে জয়েন করে।
- `path.resolve()`: পাথকে অ্যাবসোলিউট পাথে রেজলভ করে।
- `path.basename()`: পাথের শেষ অংশ (ফাইলনেম) পায়।
- `path.dirname()`: ডিরেক্টরি নেম পায়।
- `path.extname()`: ফাইল এক্সটেনশন পায়।
- `path.normalize()`: পাথ নরমালাইজ করে (`..` এবং `.` রেজলভ করে)।

### উদাহরণ: পাথের সাথে কাজ করা

```javascript
const path = require("path");

console.log(path.join("/users", "john", "documents", "file.txt")); // আউটপুট: /users/john/documents/file.txt

const fullPath = path.resolve("relative/path/file.txt");
console.log(fullPath); // আউটপুট: অ্যাবসোলিউট পাথ, যেমন /current/dir/relative/path/file.txt

console.log(path.basename(fullPath)); // আউটপুট: file.txt
console.log(path.dirname(fullPath)); // আউটপুট: /current/dir/relative/path
console.log(path.extname(fullPath)); // আউটপুট: .txt
```

### ব্যবহারের ক্ষেত্র:

- ডাইনামিকভাবে ফাইল পাথ তৈরি (যেমন ওয়েব সার্ভারে)।
- আপলোডেড ফাইল নেম পার্সিং Express.js অ্যাপে।
- ক্রস-প্ল্যাটফর্ম সামঞ্জস্যতা নিশ্চিত করা স্ক্রিপ্টে।

**টিপ**: পাথ সেপারেটর হার্ডকোড করবেন না; `path`-কে হ্যান্ডেল করতে দিন।

## ৩. url মডিউল

**url** মডিউল URL পার্স, ফরম্যাট এবং রেজলভ করে। এটি ওয়েব অ্যাড্রেস, কোয়েরি স্ট্রিং এবং HTTP রিকোয়েস্টের পাথ হ্যান্ডেল করার জন্য উপযোগী। আধুনিক Node.js-এ এতে `URL` ক্লাস অন্তর্ভুক্ত যা সহজ ম্যানিপুলেশনের জন্য।

### মূল ফিচারস:

- URL-কে কম্পোনেন্টসে পার্স করে (প্রোটোকল, হোস্ট, পাথনেম, সার্চ ইত্যাদি)।
- বেসের বিরুদ্ধে রিলেটিভ URL রেজলভ করে।
- লেগাসি বনাম আধুনিক API (WHATWG কমপ্লায়েন্সের জন্য আধুনিক ব্যবহার করুন)।

### সাধারণ মেথডস/ক্লাস:

- `new URL()`: একটি URL অবজেক্ট তৈরি করে।
- `url.parse()` (লেগাসি): URL স্ট্রিং পার্স করে।
- `url.format()` (লেগাসি): অবজেক্টকে URL স্ট্রিং-এ ফরম্যাট করে।
- `url.resolve()` (লেগাসি): রিলেটিভ URL রেজলভ করে।

### উদাহরণ: URL পার্স এবং ম্যানিপুলেট করা

```javascript
const url = require("url");

// আধুনিক URL ক্লাস
const myUrl = new URL("https://example.com/path?query=123#hash");
console.log(myUrl.href); // https://example.com/path?query=123#hash
console.log(myUrl.hostname); // example.com
console.log(myUrl.pathname); // /path
console.log(myUrl.search); // ?query=123

myUrl.searchParams.append("newParam", "value");
console.log(myUrl.href); // https://example.com/path?query=123&newParam=value#hash

// লেগাসি রেজলভ
const resolved = url.resolve("https://example.com/base/", "../relative");
console.log(resolved); // https://example.com/relative
```

### ব্যবহারের ক্ষেত্র:

- রিডিরেক্ট বা কোয়েরি প্যারামিটার হ্যান্ডেল করার API তৈরি।
- ইউজার-ইনপুট URL ভ্যালিডেট করা।
- HTTP ক্লায়েন্টস যেমন `fetch` বা `axios` এর সাথে ইন্টিগ্রেট করা।

**টিপ**: লেগাসি মেথডের চেয়ে `URL` ক্লাস পছন্দ করুন ভালো স্ট্যান্ডার্ডাইজেশনের জন্য।

## ৪. os মডিউল

**os** মডিউল অপারেটিং সিস্টেম সম্পর্কিত তথ্য প্রদান করে, যেমন CPU ডিটেলস, মেমরি ইউজেজ, এবং ইউজার ইনফো। এটি সিস্টেম মনিটরিং বা কোডকে এনভায়রনমেন্টে অ্যাডাপ্ট করার জন্য দুর্দান্ত।

### মূল ফিচারস:

- প্ল্যাটফর্ম-ইন্ডিপেন্ডেন্ট সিস্টেম স্ট্যাটস।
- কোনো এক্সটার্নাল ডিপেন্ডেন্সি দরকার নেই।

### সাধারণ মেথডস:

- `os.platform()`: OS প্ল্যাটফর্ম রিটার্ন করে (যেমন 'linux', 'win32')।
- `os.arch()`: CPU আর্কিটেকচার রিটার্ন করে (যেমন 'x64')।
- `os.cpus()`: CPU কোর ইনফোর অ্যারে রিটার্ন করে।
- `os.totalmem()` / `os.freemem()`: টোটাল এবং ফ্রি মেমরি বাইটসে।
- `os.homedir()`: ইউজারের হোম ডিরেক্টরি।
- `os.hostname()`: মেশিনের হোস্টনেম।
- `os.networkInterfaces()`: নেটওয়ার্ক ইন্টারফেস ডিটেলস।
- `os.uptime()`: সিস্টেম আপটাইম সেকেন্ডে।

### উদাহরণ: সিস্টেম ইনফো পাওয়া

```javascript
const os = require("os");

console.log("প্ল্যাটফর্ম:", os.platform()); // যেমন, darwin (macOS)
console.log("আর্কিটেকচার:", os.arch()); // যেমন, arm64
console.log("CPU কোরস:", os.cpus().length); // কোরের সংখ্যা
console.log("টোটাল মেমরি:", os.totalmem() / (1024 * 1024 * 1024), "GB"); // GB-এ
console.log("ফ্রি মেমরি:", os.freemem() / (1024 * 1024 * 1024), "GB");
console.log("হোম ডিরেক্টরি:", os.homedir());
console.log("আপটাইম:", os.uptime() / 3600, "ঘণ্টা"); // ঘণ্টায়
```

### ব্যবহারের ক্ষেত্র:

- সার্ভার মনিটরিং ড্যাশবোর্ড।
- OS-এর উপর ভিত্তি করে অ্যাপের ব্যবহার অ্যাডাপ্ট করা (যেমন ভিন্ন ফাইল পাথ)।
- রিসোর্স-ইনটেনসিভ টাস্ক যা আগে উপলব্ধ মেমরি চেক করে।

**টিপ**: বাইট ভ্যালুকে MB/GB-এ কনভার্ট করে পড়ার সুবিধা করুন।

# Node.js URL মডিউল: বিস্তারিত গাইড

Node.js-এর **URL মডিউল**-এর এই ফোকাসড ডিপ ডাইভে স্বাগতম! আগের লেকচারের উপর ভিত্তি করে, URL মডিউল হলো একটি বিল্ট-ইন ইউটিলিটি যা URL পার্সিং, কনস্ট্রাকশন এবং ম্যানিপুলেশনের জন্য ব্যবহৃত হয়। এটি HTTP রিকোয়েস্ট, রিডিরেক্ট বা যেকোনো URL-সম্পর্কিত লজিক হ্যান্ডল করার সার্ভার-সাইড অ্যাপ্লিকেশনের জন্য অপরিহার্য। Node.js v24.9.0 (সর্বশেষ স্টেবল ভার্সন) অনুযায়ী, এই মডিউল WHATWG-কমপ্লায়েন্ট API-গুলোকে জোর দেয় ওয়েব স্ট্যান্ডার্ডাইজেশনের জন্য, যখন লেগাসি Node-স্পেসিফিকগুলোকে ডেপ্রিকেট করা হয়েছে।

আমরা এর উদ্দেশ্য, মূল ক্লাস এবং মেথডস, লেগাসি বনাম আধুনিক API, প্র্যাকটিক্যাল উদাহরণ এবং বেস্ট প্র্যাকটিস কভার করব। সব কোড আধুনিক Node.js এনভায়রনমেন্ট (v18+ রেকমেন্ডেড) ধরে নেয়। এটি ইমপোর্ট করুন `const { URL, URLSearchParams } = require('node:url');` দিয়ে (বা ES মডিউলস: `import { URL, URLSearchParams } from 'node:url';`)।

## উদ্দেশ্য

URL মডিউল URL স্ট্রিংসের সাথে কাজ করতে সাহায্য করে যা কম্পোনেন্টসে ভেঙে দেয় (যেমন প্রোটোকল, হোস্ট, পাথ) এবং সেফ ম্যানিপুলেশন অনুমতি দেয়। এটি WHATWG-কমপ্লায়েন্ট, অর্থাৎ আধুনিক ব্রাউজারের মতো আচরণ করে, যা ফুল-স্ট্যাক জাভাস্ক্রিপ্ট অ্যাপসের জন্য গুরুত্বপূর্ণ। এটি ব্যবহার করুন:

- রিকোয়েস্ট থেকে আগত URL পার্স করতে।
- ডাইনামিকভাবে URL তৈরি করতে (যেমন কোয়েরি প্যারামস যোগ করতে)।
- বেসের বিরুদ্ধে রিলেটিভ URL রেজলভ করতে।

**মূল সুবিধা**: পার্সেন্ট-এনকোডিং, ইন্টারন্যাশনাল ডোমেইনের জন্য পানিকোড (যেমন `https://測試.com` কোড হয় `https://xn--g6w251d.com`), এবং ভ্যালিডেশনের মতো এজ কেস হ্যান্ডেল করে।

## মূল ক্লাসসমূহ

মডিউলটি দুটি প্রধান ক্লাসের চারপাশে ঘোরে (প্লাস একটি এক্সপেরিমেন্টাল):

### ১. URL ক্লাস (WHATWG-কমপ্লায়েন্ট)

- **কনস্ট্রাক্টর**: `new URL(input, [base])` – `input` (স্ট্রিং) কে `base` এর সাপেক্ষে পার্স করে। অবৈধ URL-এর জন্য `TypeError` থ্রো করে।
- **প্রপার্টিস** (সব গেটার/সেটার যদি না বলা হয়):
  - `href`: সম্পূর্ণ সিরিয়ালাইজড URL (রিড/রাইট)।
  - `origin`: প্রোটোকল + হোস্ট (রিড-ওনলি, যেমন `https://example.com`)।
  - `protocol`: স্কিম (যেমন `https:`)।
  - `username` / `password`: ক্রেডেনশিয়ালস।
  - `host`: হোস্টনেম + পোর্ট (যেমন `example.com:8080`)।
  - `hostname`: শুধু ডোমেইন (যেমন `example.com`)।
  - `port`: পোর্ট নম্বর (যেমন `8080`)।
  - `pathname`: কোয়েরি/হ্যাশ ছাড়া পাথ (যেমন `/path/to/resource`)।
  - `search`: কোয়েরি স্ট্রিং (যেমন `?key=value`)।
  - `searchParams`: একটি `URLSearchParams` অবজেক্ট (রিড-ওনলি)।
  - `hash`: ফ্র্যাগমেন্ট (যেমন `#section`)।
- **মেথডস**:
  - `toString()` / `toJSON()`: স্ট্রিং-এ সিরিয়ালাইজ করা।
  - স্ট্যাটিক: `URL.canParse(input, [base])` – পার্সেবল কিনা `true` রিটার্ন করে (এক্সেপশন ছাড়া)।
  - স্ট্যাটিক: `URL.parse(input, [base])` – পার্স করে অবৈধের জন্য `null` রিটার্ন করে (কনস্ট্রাক্টরের চেয়ে সেফার)।
  - ব্লব-সম্পর্কিত: `URL.createObjectURL(blob)` এবং `URL.revokeObjectURL(id)` টেম্পোরারি URL-এর জন্য (Node.js `Buffer` এর মাধ্যমে ব্লবস সমর্থন করে)।

### ২. URLSearchParams ক্লাস

- কোয়েরি স্ট্রিংসকে কী-ভ্যালু ইটারেবল হিসেবে হ্যান্ডেল করে।
- **কনস্ট্রাক্টর**: `new URLSearchParams([init])` – `init` স্ট্রিং (`?a=1&b=2`), অ্যারে অফ অ্যারেস, বা অবজেক্ট হতে পারে।
- **সাধারণ মেথডস**:
  - `append(name, value)`: একটি প্যারাম যোগ করে (ডুপ্লিকেট অনুমোদিত)।
  - `set(name, value)`: প্যারাম সেট বা ওভাররাইট করে।
  - `get(name)` / `getAll(name)`: ভ্যালু(সমূহ) রিট্রিভ করে।
  - `has(name)` / `delete(name)`: অস্তিত্ব চেক করে এবং রিমুভ করে।
  - `keys()` / `values()` / `entries()`: ইটারেটরস।
  - `forEach(callback)`: প্যারামসের উপর লুপ করে।
  - `sort()`: নেম অনুসারে অ্যালফাবেটিক্যালি সর্ট করে।
  - `toString()`: কোয়েরি স্ট্রিং-এ সিরিয়ালাইজ করে (যেমন `?name=value&other=thing`)।

### ৩. URLPattern ক্লাস (এক্সপেরিমেন্টাল – স্ট্যাবিলিটি ১)

- URL ম্যাচিং/রাউটিং-এর জন্য (যেমন Express-লাইক অ্যাপসে)।
- কনস্ট্রাক্টর: `new URLPattern(input, [base], [options])`।
- মেথডস: `exec(input, [base])` (ম্যাচ করে এবং গ্রুপস এক্সট্র্যাক্ট করে), `test(input, [base])` (বুলিয়ান ম্যাচ)।
- প্যাটার্ন যেমন `/users/:id`-এর জন্য ব্যবহার করুন – API-গুলোর জন্য দুর্দান্ত, কিন্তু এক্সপেরিমেন্টাল হওয়ায় ভালোভাবে টেস্ট করুন।

## লেগাসি API (ডেপ্রিকেটেড – নতুন কোডে এড়িয়ে চলুন)

এগুলো Node.js-স্পেসিফিক এবং সিকিউরিটি ইস্যুর কারণে ডেপ্রিকেটেড (যেমন হোস্টনেম স্পুফিং)। শুধু পুরনো কোড মাইগ্রেট করার সময় ব্যবহার করুন।

- `url.parse(str, [parseQueryString], [slashesDenoteHost])`: `Url` অবজেক্ট রিটার্ন করে প্রপার্টিস যেমন `href`, `query` (স্ট্রিং বা অবজেক্ট যদি পার্সড) সহ।
- `url.format(urlObj)`: অবজেক্ট থেকে স্ট্রিং তৈরি করে।
- `url.resolve(base, relative)`: রিলেটিভ URL রেজলভ করে।
- **কেন ডেপ্রিকেটেড?** কম সিকিউর এবং নন-স্ট্যান্ডার্ড; WHATWG `URL` সেফার এবং ফিচার-রিচ।

**মাইগ্রেশন টিপ**: `url.parse()`-কে `new URL()` দিয়ে রিপ্লেস করুন এবং ত্রুটি হ্যান্ডেল করুন try-catch দিয়ে।

## প্র্যাকটিক্যাল উদাহরণসমূহ

### ১. URL পার্সিং এবং ইন্সপেকশন

```javascript
const { URL } = require("node:url");

const myUrl = new URL("https://example.com:8080/path?query=123&test=abc#hash");

console.log(myUrl.href); // https://example.com:8080/path?query=123&test=abc#hash
console.log(myUrl.origin); // https://example.com:8080
console.log(myUrl.protocol); // https:
console.log(myUrl.hostname); // example.com
console.log(myUrl.port); // 8080
console.log(myUrl.pathname); // /path
console.log(myUrl.search); // ?query=123&test=abc
console.log(myUrl.hash); // #hash
console.log(myUrl.searchParams.get("query")); // 123
```

### ২. কোয়েরি প্যারামিটার ম্যানিপুলেট করা

```javascript
const { URL, URLSearchParams } = require("node:url");

let url = new URL("https://example.com/search");
url.searchParams.append("q", "Node.js");
url.searchParams.append("lang", "en");
url.searchParams.set("page", "2"); // অস্তিত্ব থাকলে ওভাররাইট করে

console.log(url.href); // https://example.com/search?q=Node.js&lang=en&page=2

// স্ট্যান্ডঅ্যালোন URLSearchParams
const params = new URLSearchParams({ foo: "bar", baz: "qux" });
params.append("foo", "another"); // ডুপ্লিকেট অনুমোদিত
console.log(params.toString()); // foo=bar&baz=qux&foo=another
console.log(params.getAll("foo")); // ['bar', 'another']
```

### ৩. রিলেটিভ URL রেজলভ করা

```javascript
const { URL } = require("node:url");

const base = new URL("https://example.com/docs/");
const relative = new URL("../api/v1", base); // https://example.com/api/v1-এ রেজলভ করে

console.log(relative.href); // https://example.com/api/v1
```

### ৪. ভ্যালিডেশন এবং ত্রুটি হ্যান্ডলিং

```javascript
const { URL } = require("node:url");

try {
  const invalid = new URL("not-a-url");
} catch (err) {
  console.error(err.message); // TypeError: Invalid URL
}

// সেফার চেক
if (URL.canParse("https://example.com")) {
  console.log("বৈধ!");
}
```

### ৫. এক্সপেরিমেন্টাল URLPattern উদাহরণ

```javascript
const { URLPattern } = require("node:url"); // এক্সপেরিমেন্টাল

const pattern = new URLPattern("/users/:id");
const match = pattern.exec("https://example.com/users/123");

if (match) {
  console.log(match.pathname.groups.id); // 123
}
```

## বেস্ট প্র্যাকটিস এবং সাম্প্রতিক পরিবর্তনসমূহ

- **WHATWG API পছন্দ করুন**: এগুলো সিকিউর, স্ট্যান্ডার্ড এবং ফিউচার-প্রুফ। লেগাসি API ডেপ্রিকেটেড এবং ভবিষ্যতে রিমুভ হতে পারে।
- **এনকোডিং**: মডিউল অটো-হ্যান্ডেল করে পার্সেন্ট-এনকোডিং (যেমন স্পেস `%20` হয়)। কাস্টমের জন্য `encodeURIComponent()` ব্যবহার করুন।
- **পারফরম্যান্স**: হাই-থ্রুপুট অ্যাপসে পার্সড URL ক্যাশ করুন।
- **সাম্প্রতিক পরিবর্তন (v24+ অনুযায়ী)**: ব্লব URL সমর্থন উন্নত, ইন্টারন্যাশনাল ডোমেইন হ্যান্ডলিং ভালো, এবং URLPattern স্ট্যাবিলাইজেশন চলছে। v10 থেকে কোনো মেজর ব্রেকিং চেঞ্জ নেই, কিন্তু আপনার ভার্সনের চেঞ্জলগ চেক করুন।
- **এজ কেস**: `file://` বা `data://` URL-গুলোর জন্য স্পেশাল রুলস দেখুন।

## ব্যবহারের ক্ষেত্রসমূহ

- HTTP সার্ভারস (যেমন Express রাউটারস req.url পার্স করে)।
- API ক্লায়েন্টস ডাইনামিক প্যারামস সহ এন্ডপয়েন্ট তৈরি করে।
- স্ক্র্যাপারস HTML থেকে লিঙ্ক রেজলভ করে।
- ফর্মস বা রিডিরেক্টসে ভ্যালিডেশন।

হ্যান্ডস-অন প্র্যাকটিসের জন্য, একটি সিম্পল URL শর্টেনার তৈরি করুন যা লিঙ্কস পার্স, মডিফাই এবং রেজলভ করে। যদি নির্দিষ্ট কনটেক্সটে (যেমন Express-এর সাথে) উদাহরণ চান বা প্রশ্ন থাকে, তাহলে জানান! অফিসিয়াল ডকস ফুল স্পেকসের জন্য সেরা।
