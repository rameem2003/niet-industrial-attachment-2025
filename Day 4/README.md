# Basic Website Design Documentation Day 4

## Industrial Attachment - NIET

## Overview

### Topics will cover

- Javascript
- Hello World
- Node JS
- var v let v const
- Data type
- Operator


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

## রেফারেন্স
- MDN Web Docs: [var](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var), [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

এই README JavaScript শিক্ষার্থীদের জন্য সহায়ক হবে। যদি আরও বিস্তারিত উদাহরণ চান, তাহলে কমেন্ট করুন!
