# Basic Website Design Documentation Day 4

## Industrial Attachment - NIET

## Overview

### Topics will cover

- Javascript
- Hello World
- Node JS
- var v let v const
- Hoisting
- Data type
- Operator
- function


# JavaScript-এ var, let এবং const এর মধ্যে পার্থক্য

এই README ফাইলে আমরা JavaScript-এ ভ্যারিয়েবল ডিক্লেয়ার করার জন্য ব্যবহৃত তিনটি কীওয়ার্ড—`var`, `let` এবং `const`—এর মধ্যে পার্থক্য ব্যাখ্যা করব। প্রত্যেকটির স্কোপ, রি-ডিক্লেয়ারেশন, হোইস্টিং এবং অন্যান্য বৈশিষ্ট্য নিয়ে আলোচনা করা হবে। ব্যাখ্যা সহজ করার জন্য উদাহরণ দেওয়া হয়েছে।

## 1. var
- **স্কোপ (Scope):** ফাংশন-স্কোপড (Function-scoped)। অর্থাৎ, একটি ফাংশনের ভিতরে ডিক্লেয়ার করলে সেই ফাংশনের যেকোনো জায়গায় অ্যাক্সেসযোগ্য, কিন্তু ব্লক (যেমন if, for) এর ভিতরে ডিক্লেয়ার করলে গ্লোবাল স্কোপে চলে যায়।
- **রি-ডিক্লেয়ারেশন (Re-declaration):** একই স্কোপে একাধিকবার ডিক্লেয়ার করা যায়, কোনো এরর হয় না।
- **হোইস্টিং (Hoisting):** হোইস্ট হয়, অর্থাৎ ভ্যারিয়েবলটি কোডের শুরুতে উঠে যায় এবং undefined হিসেবে ইনিশিয়ালাইজড হয়।
- **রি-অ্যাসাইনমেন্ট (Re-assignment):** যেকোনো সময় মান পরিবর্তন করা যায়।

### উদাহরণ:
```javascript
console.log(x); // undefined (হোইস্টিং এর কারণে)
var x = 10;
console.log(x); // 10

if (true) {
    var y = 20;
}
console.log(y); // 20 (ব্লক স্কোপ নয়, তাই বাইরে অ্যাক্সেসযোগ্য)

var z = 30;
var z = 40; // রি-ডিক্লেয়ার করা যায়
console.log(z); // 40
```

## 2. let
- **স্কোপ (Scope):** ব্লক-স্কোপড (Block-scoped)। অর্থাৎ, if, for, while ইত্যাদি ব্লকের ভিতরে ডিক্লেয়ার করলে শুধু সেই ব্লকের মধ্যে অ্যাক্সেসযোগ্য।
- **রি-ডিক্লেয়ারেশন (Re-declaration):** একই স্কোপে রি-ডিক্লেয়ার করা যায় না, এরর হবে।
- **হোইস্টিং (Hoisting):** হোইস্ট হয়, কিন্তু ইনিশিয়ালাইজড হয় না। ডিক্লেয়ারেশনের আগে অ্যাক্সেস করলে ReferenceError হয় (Temporal Dead Zone)।
- **রি-অ্যাসাইনমেন্ট (Re-assignment):** মান পরিবর্তন করা যায়।

### উদাহরণ:
```javascript
// console.log(a); // ReferenceError: Cannot access 'a' before initialization
let a = 10;
console.log(a); // 10

if (true) {
    let b = 20;
}
// console.log(b); // ReferenceError: b is not defined (ব্লক স্কোপের কারণে)

let c = 30;
// let c = 40; // SyntaxError: Identifier 'c' has already been declared
c = 40; // রি-অ্যাসাইন করা যায়
console.log(c); // 40
```

## 3. const
- **স্কোপ (Scope):** ব্লক-স্কোপড (Block-scoped), let-এর মতো।
- **রি-ডিক্লেয়ারেশন (Re-declaration):** একই স্কোপে রি-ডিক্লেয়ার করা যায় না।
- **হোইস্টিং (Hoisting):** হোইস্ট হয়, কিন্তু Temporal Dead Zone-এর কারণে ডিক্লেয়ারেশনের আগে অ্যাক্সেস করা যায় না।
- **রি-অ্যাসাইনমেন্ট (Re-assignment):** মান পরিবর্তন করা যায় না। তবে, যদি অবজেক্ট বা অ্যারে হয়, তাহলে তার প্রপার্টি বা এলিমেন্ট পরিবর্তন করা যায় (কারণ const রেফারেন্সটি ফিক্সড রাখে)।

### উদাহরণ:
```javascript
// console.log(p); // ReferenceError: Cannot access 'p' before initialization
const p = 10;
console.log(p); // 10

if (true) {
    const q = 20;
}
// console.log(q); // ReferenceError: q is not defined

const r = 30;
// r = 40; // TypeError: Assignment to constant variable.
// const r = 40; // SyntaxError: Identifier 'r' has already been declared

// অবজেক্টের ক্ষেত্রে:
const obj = { name: 'Alice' };
obj.name = 'Bob'; // এটা অনুমোদিত (প্রপার্টি পরিবর্তন)
console.log(obj.name); // Bob
// obj = { name: 'Charlie' }; // TypeError (রি-অ্যাসাইন নয়)
```

## কখন কোনটি ব্যবহার করবেন?
- **var:** পুরনো কোডে ব্যবহৃত হয়, কিন্তু আধুনিক JavaScript-এ এড়িয়ে চলুন কারণ এর স্কোপিং সমস্যা।
- **let:** যখন ভ্যারিয়েবলের মান পরিবর্তন করতে হবে, তখন ব্যবহার করুন।
- **const:** যখন ভ্যারিয়েবলের মান পরিবর্তন করতে চান না, তখন ব্যবহার করুন। এটা কোডকে আরও নিরাপদ করে।

---


# জাভাস্ক্রিপ্ট ডেটা টাইপসমূহ

জাভাস্ক্রিপ্টে বিভিন্ন ধরনের ডেটা টাইপ রয়েছে। নিচে প্রতিটি ডেটা টাইপের উদাহরণ বাংলায় ব্যাখ্যা করা হলো:

### 1. **Number (নাম্বার)**
এটি পূর্ণসংখ্যা বা দশমিক সংখ্যা প্রকাশ করে।

```javascript
let age = 25; // পূর্ণসংখ্যা
let price = 99.99; // দশমিক সংখ্যা
console.log(age); // আউটপুট: 25
console.log(price); // আউটপুট: 99.99
```

### 2. **String (স্ট্রিং)**
টেক্সট বা অক্ষরের সমষ্টি। এটি একক বা ডাবল কোটের মধ্যে লেখা হয়।

```javascript
let name = "আলমিন"; // একক কোট
let greeting = "হ্যালো, কেমন আছেন?"; // ডাবল কোট
console.log(name); // আউটপুট: আলমিন
console.log(greeting); // আউটপুট: হ্যালো, কেমন আছেন?
```

### 3. **Boolean (বুলিয়ান)**
শুধুমাত্র `true` বা `false` মান ধারণ করে।

```javascript
let isStudent = true; // সত্য
let isLoggedIn = false; // মিথ্যা
console.log(isStudent); // আউটপুট: true
console.log(isLoggedIn); // আউটপুট: false
```

### 4. **Array (অ্যারে)**
একাধিক মান একটি তালিকায় সংরক্ষণ করতে ব্যবহৃত হয়।

```javascript
let fruits = ["আপেল", "কলা", "আম"]; // স্ট্রিং অ্যারে
let numbers = [1, 2, 3, 4]; // নাম্বার অ্যারে
console.log(fruits); // আউটপুট: ["আপেল", "কলা", "আম"]
console.log(numbers); // আউটপুট: [1, 2, 3, 4]
```

### 5. **Object (অবজেক্ট)**
নাম-মান জোড়ার সমষ্টি।

```javascript
let person = {
  name: "রহিম",
  age: 30,
  city: "ঢাকা"
};
console.log(person); // আউটপুট: { name: "রহিম", age: 30, city: "ঢাকা" }
```

### 6. **Null (নাল)**
কোনো মান নেই বোঝাতে ব্যবহৃত হয়।

```javascript
let empty = null;
console.log(empty); // আউটপুট: null
```

### 7. **Undefined (অনির্ধারিত)**
যখন একটি ভেরিয়েবল ডিক্লেয়ার করা হয় কিন্তু কোনো মান দেওয়া হয় না।

```javascript
let variable;
console.log(variable); // আউটপুট: undefined
```

### 8. **BigInt (বিগইন্ট)**
খুব বড় পূর্ণসংখ্যার জন্য ব্যবহৃত হয়।

```javascript
let bigNumber = 123456789012345678901234567890n;
console.log(bigNumber); // আউটপুট: 123456789012345678901234567890n
```

### ব্যাখ্যা:
- **প্রিমিটিভ ডেটা টাইপ**: Number, String, Boolean, Null, Undefined, Symbol, BigInt।
- **নন-প্রিমিটিভ ডেটা টাইপ**: Array, Object।

---

# JavaScript-এ **Operators (অপারেটর)** হলো বিশেষ কিছু চিহ্ন বা কীওয়ার্ড, যেগুলো ভেরিয়েবল বা ভ্যালুর ওপর কাজ করে ফলাফল দেয়।
এগুলোকে কয়েকটা ভাগে ভাগ করা যায় 👇

---

## 🟢 1. Arithmetic Operators (গাণিতিক অপারেটর)

সংখ্যার ওপর গাণিতিক হিসাব করার জন্য।

```js
let a = 10, b = 3;

console.log(a + b); // যোগ -> 13
console.log(a - b); // বিয়োগ -> 7
console.log(a * b); // গুণ -> 30
console.log(a / b); // ভাগ -> 3.333...
console.log(a % b); // ভাগশেষ (modulus) -> 1
console.log(a ** b); // ঘাত (power) -> 1000
```

---

## 🔵 2. Assignment Operators (মান নির্ধারণ)

ভেরিয়েবলে মান অ্যাসাইন বা সেট করার জন্য।

```js
let x = 5;

x += 2; // x = x + 2 -> 7
x -= 2; // x = x - 2 -> 5
x *= 2; // x = x * 2 -> 10
x /= 2; // x = x / 2 -> 5
x %= 2; // x = x % 2 -> 1
x **= 2; // x = x ** 2 -> 1
```

---

## 🟣 3. Comparison Operators (তুলনা করার অপারেটর)

দুটি মান তুলনা করে `true` বা `false` রিটার্ন করে।

```js
let a = 5, b = "5";

console.log(a == b);  // true (value সমান কিনা)
console.log(a === b); // false (value + type সমান কিনা)
console.log(a != b);  // false (value আলাদা কিনা)
console.log(a !== b); // true (value/type আলাদা কিনা)
console.log(a > 3);   // true
console.log(a < 10);  // true
console.log(a >= 5);  // true
console.log(a <= 4);  // false
```

---

## 🟠 4. Logical Operators (যুক্তি নির্ভর অপারেটর)

শর্ত মিলিয়ে ফলাফল নির্ধারণ করে।

```js
let age = 20;

console.log(age > 18 && age < 30); // AND -> true (দুটো শর্ত সত্য হতে হবে)
console.log(age > 18 || age < 10); // OR -> true (যেকোনো একটি শর্ত সত্য হলেই হবে)
console.log(!(age > 18));          // NOT -> false (শর্ত উল্টে দেয়)
```

---

## 🟡 5. Unary Operators (একটি মানের ওপর কাজ করে)

```js
let a = 5;

console.log(++a); // 6 (প্রথমে ১ বাড়ায়, তারপর দেখায়)
console.log(--a); // 5 (প্রথমে ১ কমায়, তারপর দেখায়)
console.log(a++); // 5 (আগে দেখায়, পরে ১ বাড়ায়)
console.log(a--); // 6 (আগে দেখায়, পরে ১ কমায়)
```

---

## 🟤 6. Ternary Operator (শর্তাধীন অপারেটর)

এক লাইনে if-else এর কাজ করে।

```js
let age = 18;
let result = (age >= 18) ? "Adult" : "Child";
console.log(result); // Adult
```

---

## ⚪ 7. Type Operators (টাইপ চেক করার জন্য)

```js
console.log(typeof 123);     // "number"
console.log(typeof "Hello"); // "string"

let obj = null;
console.log(obj instanceof Object); // false (কারণ null object নয়)
```

---

✅ সংক্ষেপে

* **Arithmetic:** +, -, \*, /, %, \*\*
* **Assignment:** =, +=, -=, \*=, /=, %=, \*\*=
* **Comparison:** ==, ===, !=, !==, >, <, >=, <=
* **Logical:** &&, ||, !
* **Unary:** ++, --
* **Ternary:** `condition ? trueValue : falseValue`
* **Type:** `typeof`, `instanceof`

---

# JavaScript-এ **Function (ফাংশন)** হলো এক ধরনের ব্লক, যেখানে কোড লেখা হয় এবং পরে সেটা বারবার ব্যবহার করা যায়।
ফাংশন মানে হলো → **একবার লিখো, যতবার খুশি ব্যবহার করো।**

---

## 🟢 ফাংশন ডিক্লেয়ারেশন (Function Declaration)

```js
function greet() {
  console.log("Hello, World!");
}

greet(); // কল করলে আউটপুট -> Hello, World!
```

---

## 🔵 প্যারামিটার (Parameter) এবং আর্গুমেন্ট (Argument)

```js
function add(a, b) {
  return a + b;
}

console.log(add(5, 3)); // আউটপুট -> 8
```

👉 এখানে `a, b` হলো **প্যারামিটার** এবং `5, 3` হলো **আর্গুমেন্ট**।

---

## 🟣 ডিফল্ট প্যারামিটার

যদি আর্গুমেন্ট না দেওয়া হয়, তখন ডিফল্ট ভ্যালু ব্যবহার হয়।

```js
function greet(name = "Guest") {
  console.log("Hello " + name);
}

greet();       // Hello Guest
greet("Rameem"); // Hello Rameem
```

---

## 🟠 ফাংশন এক্সপ্রেশন (Function Expression)

ফাংশনকে ভেরিয়েবলে সংরক্ষণ করা যায়।

```js
const multiply = function(x, y) {
  return x * y;
};

console.log(multiply(4, 5)); // 20
```

---

## 🟡 অ্যারো ফাংশন (Arrow Function)

ES6 থেকে আসা শর্টকাট ফাংশন সিনট্যাক্স।

```js
const divide = (a, b) => a / b;

console.log(divide(10, 2)); // 5
```

---

## 🟤 অ্যানোনিমাস ফাংশন (Anonymous Function)

যার নাম নেই, সাধারণত অন্য ফাংশনের ভেতরে ব্যবহার হয়।

```js
setTimeout(function() {
  console.log("This runs after 2 seconds");
}, 2000);
```

---

## ⚪ রিটার্ন ভ্যালু (Return Value)

ফাংশন থেকে মান রিটার্ন করা যায়।

```js
function square(num) {
  return num * num;
}

let result = square(6);
console.log(result); // 36
```

---

## ✅ কেন ফাংশন ব্যবহার করবো?

1. কোড পুনঃব্যবহারযোগ্য হয় (reusable)
2. কোড পরিষ্কার ও সহজে পড়া যায়
3. বড় প্রোগ্রামকে ছোট ছোট ব্লকে ভাগ করা যায়

---

👉 চাইলে আমি **সব ধরনের ফাংশনের বাংলা-ইংরেজি তুলনামূলক টেবিল + উদাহরণ** বানিয়ে দিতে পারি, যাতে আরও সহজে শিখতে পারো। চাই কি আমি সেটা বানিয়ে দিই?

