# Basic Website Design Documentation Day 5

## Industrial Attachment - NIET

## Overview

### Topics will cover

- Date
- For Loop
- While Loop
- JS Object
- JS Array
- String

# জাভাস্ক্রিপ্ট ডেট অবজেক্ট

জাভাস্ক্রিপ্টের `Date` অবজেক্ট একটি নির্দিষ্ট সময়কে প্রকাশ করে, যা ১ জানুয়ারি, ১৯৭০ (ইউনিক্স এপক) থেকে মিলিসেকেন্ডে হিসাব করা হয়। এটি তারিখ এবং সময় নিয়ে কাজ করতে ব্যবহৃত হয়।

#### ডেট অবজেক্ট তৈরি
- `new Date()`: বর্তমান তারিখ এবং সময়ের জন্য।
- `new Date(milliseconds)`: এপক থেকে মিলিসেকেন্ড দিয়ে।
- `new Date(dateString)`: তারিখের স্ট্রিং যেমন "2023-10-01"।
- `new Date(year, month, day, hours, minutes, seconds, milliseconds)`: নির্দিষ্ট উপাদান দিয়ে (মাস ০ থেকে শুরু: জানুয়ারি = ০)।

উদাহরণ:
```javascript
const now = new Date();  // বর্তমান তারিখ ও সময়
console.log(now);  // যেমন, মঙ্গলবার ১৬ সেপ্টেম্বর ২০২৫ ০৮:৫০:০০ GMT+0600

const specificDate = new Date(2025, 8, 16);  // ১৬ সেপ্টেম্বর, ২০২৫
console.log(specificDate);
```

#### সাধারণ মেথড
- `getFullYear()`: বছর (৪ অঙ্ক)।
- `getMonth()`: মাস (০-১১)।
- `getDate()`: মাসের দিন (১-৩১)।
- `getHours()` / `getMinutes()` / `getSeconds()`: সময়ের উপাদান।
- `getTime()`: এপক থেকে মিলিসেকেন্ড।
- `toLocaleString()`: স্থানীয় ফরম্যাটে স্ট্রিং।
- `toISOString()`: আইএসও ফরম্যাট (যেমন, "2025-09-16T00:00:00.000Z")।
- সেটার মেথড: `setFullYear(year)`, `setMonth(month)` ইত্যাদি।

উদাহরণ:
```javascript
const date = new Date(2025, 8, 16);
console.log(date.getFullYear());  // ২০২৫
console.log(date.getMonth());     // ৮ (সেপ্টেম্বর)
console.log(date.toLocaleDateString('bn-BD'));  // ১৬/৯/২০২৫
```

# ফর লুপ

`for` লুপ নির্দিষ্ট সংখ্যক বার পুনরাবৃত্তির জন্য ব্যবহৃত হয়। যখন পুনরাবৃত্তির সংখ্যা আগে থেকে জানা থাকে তখন এটি উপযোগী।

সিনট্যাক্স:
```javascript
for (initialization; condition; increment/decrement) {
  // কোড
}
```
- ইনিশিয়ালাইজেশন: শুরুতে একবার চলে (যেমন, let i = 0)।
- কন্ডিশন: প্রতি পুনরাবৃত্তির আগে চেক হয়।
- ইনক্রিমেন্ট/ডিক্রিমেন্ট: প্রতি পুনরাবৃত্তির পর চলে।

উদাহরণ:
```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);  // আউটপুট: ০, ১, ২, ৩, ৪
}
```

অ্যারের জন্য:
```javascript
const fruits = ['আপেল', 'কলা', 'চেরি'];
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
```

## হোয়াইল লুপ

`while` লুপ ততক্ষণ চলে যতক্ষণ কন্ডিশন সত্য থাকে। পুনরাবৃত্তির সংখ্যা অজানা হলে এটি ব্যবহার করা হয়।

সিনট্যাক্স:
```javascript
while (condition) {
  // কোড
}
```
- কন্ডিশন প্রতি পুনরাবৃত্তির আগে চেক হয়।
- অনন্ত লুপ এড়াতে কন্ডিশন অবশ্যই মিথ্যা হবে।

উদাহরণ:
```javascript
let i = 0;
while (i < 5) {
  console.log(i);  // আউটপুট: ০, ১, ২, ৩, ৪
  i++;
}
```

ডু-হোয়াইল ভেরিয়েন্ট (অন্তত একবার চলে):
```javascript
let j = 0;
do {
  console.log(j);
  j++;
} while (j < 5);
```

# জাভাস্ক্রিপ্ট অবজেক্ট এবং মেথড

অবজেক্ট হল কী-ভ্যালু জোড়ার সংগ্রহ। এটি ডেটা এবং ফাংশন (মেথড) সংরক্ষণ করতে পারে।

#### অবজেক্ট তৈরি
- লিটারাল: `const obj = { key: 'value' };`
- কনস্ট্রাক্টর: `new Object()` (কম ব্যবহৃত)।

উদাহরণ:
```javascript
const person = {
  name: 'অ্যালিস',
  age: ৩০,
  greet: function() {  // মেথড
    console.log(`হ্যালো, আমি ${this.name}`);
  }
};
console.log(person.name);  // অ্যালিস
person.greet();  // হ্যালো, আমি অ্যালিস
```

#### সাধারণ মেথড
- অ্যাক্সেস: ডট নোটেশন (`obj.key`) বা ব্র্যাকেট নোটেশন (`obj['key']`)।
- যোগ/পরিবর্তন: `obj.newKey = 'value';`
- মুছুন: `delete obj.key;`
- `Object.keys(obj)`: কী-এর অ্যারে।
- `Object.values(obj)`: ভ্যালু-এর অ্যারে।
- `Object.entries(obj)`: [কী, ভ্যালু] জোড়ার অ্যারে।
- `Object.assign(target, source)`: অবজেক্ট মার্জ।
- `hasOwnProperty('key')`: কী আছে কিনা চেক।

উদাহরণ:
```javascript
console.log(Object.keys(person));  // ['name', 'age', 'greet']
person.age = ৩১;  // পরিবর্তন
```

# অ্যারে এবং মেথড

অ্যারে হল ০ থেকে শুরু হওয়া সূচকযুক্ত মানের তালিকা।

#### অ্যারে তৈরি
- লিটারাল: `const arr = [1, 2, 3];`
- কনস্ট্রাক্টর: `new Array(1, 2, 3);`

#### সাধারণ মেথড
- `push(item)`: শেষে যোগ।
- `pop()`: শেষ থেকে মুছে।
- `unshift(item)`: শুরুতে যোগ।
- `shift()`: শুরু থেকে মুছে।
- `length`: অ্যারের আকার।
- `indexOf(item)`: সূচক খুঁজে (না পেলে -১)।
- `slice(start, end)`: সাবঅ্যারে (অ-ধ্বংসাত্মক)।
- `splice(start, deleteCount, ...items)`: অ্যারে পরিবর্তন।
- `concat(arr2)`: অ্যারে একত্রিত।
- `join(separator)`: স্ট্রিং-এ রূপান্তর।
- পুনরাবৃত্তি: `forEach(callback)`, `map(callback)` (নতুন অ্যারে), `filter(callback)` (ফিল্টারড অ্যারে), `reduce(callback, initial)` (মান জমা)।
- `sort(compareFn)`: সাজানো।
- `reverse()`: উল্টানো।
- `includes(item)`: অস্তিত্ব চেক।

উদাহরণ:
```javascript
const numbers = [১, ২, ৩];
numbers.push(৪);  // [১, ২, ৩, ৪]
const doubled = numbers.map(n => n * ২);  // [২, ৪, ৬, ৮]
const evens = numbers.filter(n => n % ২ === ০);  // [২, ৪]
console.log(numbers.join('-'));  // ১-২-৩-৪
```

### স্ট্রিং এবং মেথড

স্ট্রিং হল অক্ষরের ক্রম, অপরিবর্তনীয় (পরিবর্তন নতুন স্ট্রিং তৈরি করে)।

#### স্ট্রিং তৈরি
- লিটারাল: `'single'`, `"double"`, বা `` `template` `` (ইন্টারপোলেশনের জন্য)।

উদাহরণ:
```javascript
const str = 'হ্যালো';
const template = `বিশ্ব ${str}`;  // বিশ্ব হ্যালো
```

#### সাধারণ মেথড
- `length`: স্ট্রিং-এর দৈর্ঘ্য।
- `charAt(index)` বা `str[index]`: অক্ষর পাওয়া।
- `toUpperCase()` / `toLowerCase()`: কেস রূপান্তর।
- `trim()`: শুরু ও শেষের ফাঁকা জায়গা মুছে।
- `split(separator)`: অ্যারে-তে রূপান্তর।
- `substring(start, end)` বা `slice(start, end)`: অংশ বের করা।
- `replace(search, replaceWith)`: প্রথম মিল প্রতিস্থাপন (বা /g দিয়ে সব)।
- `indexOf(substring)`: অবস্থান খুঁজে (না পেলে -১)।
- `startsWith(str)` / `endsWith(str)` / `includes(str)`: অস্তিত্ব চেক।
- `concat(str2)`: স্ট্রিং যোগ (+ ব্যবহারযোগ্য)।
- `repeat(count)`: স্ট্রিং পুনরাবৃত্তি।
- `padStart(length, padStr)` / `padEnd()`: প্যাডিং।

উদাহরণ:
```javascript
const text = '  জাভাস্ক্রিপ্ট ';
console.log(text.trim().toLowerCase());  // জাভাস্ক্রিপ্ট
console.log(text.replace('জাভা', 'টাইপ'));  //   টাইপস্ক্রিপ্ট 
const parts = text.split(' ');  // ['', '', 'জাভাস্ক্রিপ্ট', '']
console.log('এবিসি'.repeat(২));  // এবিসিএবিসি
```

---

# জাভাস্ক্রিপ্ট সেটটাইমআউট (setTimeout)

`setTimeout` একটি ফাংশন যা একটি নির্দিষ্ট সময়ের পর (মিলিসেকেন্ডে) একটি ফাংশন বা কোড একবার চালায়। এটি অ্যাসিঙ্ক্রোনাস, অর্থাৎ এটি কোডের অন্যান্য অংশকে ব্লক করে না।

#### সিনট্যাক্স
```javascript
setTimeout(function, delay, ...params);
```
- `function`: চালানোর জন্য ফাংশন বা কোড।
- `delay`: বিলম্ব সময় মিলিসেকেন্ডে (ডিফল্ট ০)।
- `...params`: ফাংশনে পাস করার অতিরিক্ত প্যারামিটার (ঐচ্ছিক)।

#### উদাহরণ
```javascript
setTimeout(() => {
  console.log('হ্যালো, ২ সেকেন্ড পর!');
}, 2000);  // ২ সেকেন্ড (২০০০ মিলিসেকেন্ড) পর চালাবে

// প্যারামিটার সহ
setTimeout((name) => {
  console.log(`হ্যালো, ${name}!`);
}, 1000, 'অ্যালিস');  // ১ সেকেন্ড পর: হ্যালো, অ্যালিস!
```

#### ক্লিয়ার করা (বন্ধ করা)
`clearTimeout(id)` দিয়ে বন্ধ করা যায়। `setTimeout` একটি আইডি রিটার্ন করে।
```javascript
const timeoutId = setTimeout(() => console.log('চালাবে না'), 1000);
clearTimeout(timeoutId);  // বাতিল করে
```

# জাভাস্ক্রিপ্ট সেটইন্টারভাল (setInterval)

`setInterval` একটি ফাংশন যা নির্দিষ্ট সময়ের ব্যবধানে (মিলিসেকেন্ডে) একটি ফাংশন বা কোড বারবার চালায়। এটিও অ্যাসিঙ্ক্রোনাস।

#### সিনট্যাক্স
```javascript
setInterval(function, interval, ...params);
```
- `function`: চালানোর জন্য ফাংশন বা কোড।
- `interval`: ব্যবধান সময় মিলিসেকেন্ডে।
- `...params`: ফাংশনে পাস করার অতিরিক্ত প্যারামিটার (ঐচ্ছিক)।

#### উদাহরণ
```javascript
setInterval(() => {
  console.log('প্রতি ১ সেকেন্ডে চালাবে');
}, 1000);  // প্রতি ১ সেকেন্ডে

// প্যারামিটার সহ
let count = 0;
setInterval(() => {
  count++;
  console.log(`গণনা: ${count}`);
}, 2000);  // প্রতি ২ সেকেন্ডে গণনা বাড়াবে
```

#### ক্লিয়ার করা (বন্ধ করা)
`clearInterval(id)` দিয়ে বন্ধ করা যায়। `setInterval` একটি আইডি রিটার্ন করে।
```javascript
const intervalId = setInterval(() => console.log('চালাবে'), 1000);
setTimeout(() => clearInterval(intervalId), 5000);  // ৫ সেকেন্ড পর বন্ধ করবে
```

#### তুলনা
- **setTimeout**: একবার চালায়, বিলম্বের পর।
- **setInterval**: বারবার চালায়, ব্যবধানে।
- উভয়ই ব্রাউজারের টাইমার API-এর অংশ, Node.js-এও উপলব্ধ।
- সতর্কতা: সময় সঠিক নয়, কারণ JS সিঙ্গল-থ্রেডেড—অন্য কোড চললে বিলম্ব হতে পারে।