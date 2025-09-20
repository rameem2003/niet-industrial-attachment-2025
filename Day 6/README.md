# JavaSCript Documentation Day 6

## Industrial Attachment - NIET

## Overview

### Topics will cover

- JS Synchronous / Asynchronous
- Promises
- JS Async & Await
- API
- DOM

# সিঙ্ক্রোনাস এবং অ্যাসিঙ্ক্রোনাস জাভাস্ক্রিপ্ট

উদাহরণগুলো সাধারণ console.log এবং setTimeout ব্যবহার করে দেখানো হয়েছে। এগুলো ব্রাউজারের কনসোলে চালিয়ে দেখতে পারেন।

## ১. সিঙ্ক্রোনাস জাভাস্ক্রিপ্ট (Synchronous JavaScript)

**সংজ্ঞা:** সিঙ্ক্রোনাস কোডে, প্রত্যেক লাইন একের পর একটি করে এক্সিকিউট হয়। পরবর্তী লাইন শুরু হওয়ার আগে বর্তমান লাইন সম্পূর্ণ হয় না। এটি সহজবোধ্য কিন্তু দীর্ঘস্থায়ী অপারেশন (যেমন ফাইল রিডিং বা নেটওয়ার্ক রিকোয়েস্ট) এর ক্ষেত্রে অ্যাপ্লিকেশনকে "ব্লক" করে দেয়, যা ইউজার এক্সপেরিয়েন্স খারাপ করে।

**সুবিধা:**
- সহজ এবং লিনিয়ার (linear) ফ্লো।
- কোনো কমপ্লেক্সিটি নেই।

**অসুবিধা:**
- ব্লকিং: UI ফ্রিজ হয় যদি কোনো দীর্ঘস্থায়ী টাস্ক চলে।

### উদাহরণ ১: সাধারণ সিঙ্ক্রোনাস কোড
```javascript
console.log('শুরু (Start)');
console.log('মাঝামাঝি (Middle)');
console.log('শেষ (End)');
```
**আউটপুট:**
```
শুরু (Start)
মাঝামাঝি (Middle)
শেষ (End)
```
**ব্যাখ্যা:** প্রত্যেক লাইন একের পর একটি করে চলে, কোনো বিলম্ব নেই।

### উদাহরণ ২: লুপ সহ সিঙ্ক্রোনাস কোড (ব্লকিং দেখানোর জন্য)
```javascript
console.log('শুরু (Start)');

for (let i = 0; i < 5; i++) {
    console.log(`লুপ ${i + 1}`);
}

console.log('শেষ (End)');
```
**আউটপুট:**
```
শুরু (Start)
লুপ 1
লুপ 2
লুপ 3
লুপ 4
লুপ 5
শেষ (End)
```
**ব্যাখ্যা:** লুপ শেষ না হওয়া পর্যন্ত 'শেষ' প্রিন্ট হবে না। যদি লুপটি খুব লম্বা হয় (যেমন ১০০০০০ বার), তাহলে অ্যাপ ফ্রিজ হবে।

## ২. অ্যাসিঙ্ক্রোনাস জাভাস্ক্রিপ্ট (Asynchronous JavaScript)

**সংজ্ঞা:** অ্যাসিঙ্ক্রোনাস কোডে, কিছু অপারেশন (যেমন নেটওয়ার্ক কল বা টাইমার) ব্যাকগ্রাউন্ডে চলে এবং মেইন থ্রেডকে ব্লক করে না। জাভাস্ক্রিপ্টের ইভেন্ট লুপ (Event Loop) এই কাজগুলো ম্যানেজ করে। ফলাফল পাওয়ার পর কলব্যাক বা প্রমিসের মাধ্যমে হ্যান্ডেল করা হয়।

**সুবিধা:**
- নন-ব্লকিং: অ্যাপ দ্রুত রেসপন্স দেয়।
- ভালো পারফরম্যান্স, বিশেষ করে I/O অপারেশনে।

**অসুবিধা:**
- "কলব্যাক হেল" (callback hell) বা প্রমিস চেইনিং কমপ্লেক্স হতে পারে (async/await দিয়ে সমাধান করা যায়)।

### অ্যাসিঙ্ক্রোনাস হ্যান্ডলিংয়ের উপায়:
- **কলব্যাক (Callbacks):** ফাংশনকে অ্যান্দরে অন্য ফাংশন পাস করা।
- **প্রমিস (Promises):** অবজেক্ট যা সাকসেস বা এরর হ্যান্ডেল করে।
- **অ্যাসিঙ্ক/অ্যাওয়েট (Async/Await):** প্রমিসকে সিঙ্ক্রোনাসের মতো লিখতে সাহায্য করে।

### উদাহরণ ১: সেটটাইমআউট দিয়ে অ্যাসিঙ্ক্রোনাস (কলব্যাক)
```javascript
console.log('শুরু (Start)');

setTimeout(() => {
    console.log('অ্যাসিঙ্ক কাজ সম্পন্ন (Async task done)');
}, 2000);  // ২ সেকেন্ড বিলম্ব

console.log('শেষ (End)');
```
**আউটপুট:**
```
শুরু (Start)
শেষ (End)
(২ সেকেন্ড পর)
অ্যাসিঙ্ক কাজ সম্পন্ন (Async task done)
```
**ব্যাখ্যা:** setTimeout ব্যাকগ্রাউন্ডে চলে, তাই 'শেষ' প্রিন্ট হয়ে যায়। ইভেন্ট লুপ ২ সেকেন্ড পর কলব্যাক চালায়।

### উদাহরণ ২: প্রমিস দিয়ে অ্যাসিঙ্ক্রোনাস
```javascript
console.log('শুরু (Start)');

const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('প্রমিস সাকসেসফুল! (Promise resolved!)');
    }, 1000);
});

myPromise
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log('এরর:', error);
    });

console.log('শেষ (End)');
```
**আউটপুট:**
```
শুরু (Start)
শেষ (End)
(১ সেকেন্ড পর)
প্রমিস সাকসেসফুল! (Promise resolved!)
```
**ব্যাখ্যা:** প্রমিস resolve হওয়ার পর .then() চলে। এটি চেইন করা যায় মাল্টিপল অ্যাসিঙ্ক টাস্কের জন্য।

### উদাহরণ ৩: অ্যাসিঙ্ক/অ্যাওয়েট দিয়ে (সবচেয়ে সহজ)
```javascript
console.log('শুরু (Start)');

async function fetchData() {
    try {
        const result = await new Promise((resolve) => {
            setTimeout(() => {
                resolve('ডেটা লোড হয়েছে! (Data loaded!)');
            }, 1500);
        });
        console.log(result);
    } catch (error) {
        console.log('এরর:', error);
    }
}

fetchData();
console.log('শেষ (End)');
```
**আউটপুট:**
```
শুরু (Start)
শেষ (End)
(১.৫ সেকেন্ড পর)
ডেটা লোড হয়েছে! (Data loaded!)
```
**ব্যাখ্যা:** async ফাংশনের ভিতরে await ব্যবহার করে প্রমিসকে সিঙ্ক্রোনাসের মতো অপেক্ষা করা হয়, কিন্তু মেইন থ্রেড ব্লক হয় না।

## তুলনামূলক টেবিল

| বৈশিষ্ট্য          | সিঙ্ক্রোনাস (Synchronous) | অ্যাসিঙ্ক্রোনাস (Asynchronous) |
|---------------------|---------------------------|--------------------------------|
| **ফ্লো**           | ব্লকিং (Blocking)       | নন-ব্লকিং (Non-blocking)     |
| **উদাহরণ**         | console.log, লুপ         | setTimeout, fetch API         |
| **সুবিধা**         | সহজ লেখা                | দ্রুত রেসপন্স                 |
| **অসুবিধা**        | UI ফ্রিজ                 | কমপ্লেক্স কোডিং              |
| **ব্যবহার**        | সাধারণ ক্যালকুলেশন      | API কল, টাইমার               |

# জাভাস্ক্রিপ্ট প্রমিস এবং এপিআই

## ১. প্রমিস কী? (What is a Promise?)

একটি **প্রমিস** হলো একটি অবজেক্ট যা অ্যাসিঙ্ক্রোনাস অপারেশনের শেষ হওয়া (বা ফেল হওয়া) এবং তার ফলাফলের মানের প্রতিনিধিত্ব করে। এটি একটি প্রক্সি হিসেবে কাজ করে যা এখনও উপলব্ধ নাও হতে পারে এমন মানের জন্য।

### মূল স্টেটসমূহ
- **পেন্ডিং (Pending)**: প্রাথমিক স্টেট—ন ফুলফিলড নই রিজেক্টেড।
- **ফুলফিলড (Fulfilled/Resolved)**: অপারেশন সাকসেসফুল; মান উপলব্ধ।
- **রিজেক্টেড (Rejected)**: অপারেশন ফেল; এরর উপলব্ধ।

একবার সেটেলড (ফুলফিলড বা রিজেক্টেড) হলে, এটি চিরকাল তেমনই থাকে।

**সুবিধাসমূহ:**
- "কলব্যাক হেল" (নেস্টেড কলব্যাক) এড়ানো যায়।
- সিকোয়েন্সিয়াল অ্যাসিঙ্ক্রোনাস অপারেশনের জন্য চেইনযোগ্য।
- `.catch()` দিয়ে এরর হ্যান্ডলিং।

## ২. প্রমিস তৈরি করা (Creating a Promise)

`Promise` কনস্ট্রাক্টর ব্যবহার করুন, যা `resolve` এবং `reject` প্যারামিটারসহ একটি ফাংশন নেয়।

### উদাহরণ: বেসিক প্রমিস তৈরি
```javascript
const myPromise = new Promise((resolve, reject) => {
    // অ্যাসিঙ্ক্রোনাস কাজের সিমুলেশন (যেমন এপিআই কল)
    setTimeout(() => {
        const success = true; // false করে এরর সিমুলেট করুন
        if (success) {
            resolve('সাকসেস! ডেটা লোড হয়েছে।'); // ফুলফিলড
        } else {
            reject('এরর: কিছু ভুল হয়েছে!'); // রিজেক্টেড
        }
    }, 2000); // ২ সেকেন্ড বিলম্ব
});
```

## ৩. প্রমিস ব্যবহার করা (Consuming a Promise)

সাকসেসের জন্য `.then()` এবং এররের জন্য `.catch()` ব্যবহার করুন। এগুলো চেইন করা যায়।

### উদাহরণ: প্রমিস হ্যান্ডলিং
```javascript
myPromise
    .then((result) => {
        console.log(result); // আউটপুট: সাকসেস! ডেটা লোড হয়েছে।
    })
    .catch((error) => {
        console.error(error); // আউটপুট: এরর: কিছু ভুল হয়েছে!
    })
    .finally(() => {
        console.log('প্রমিস সেটেলড (সবসময় চলে)।');
    });
```

**আউটপুট (যদি সাকসেস হয়):**
```
(২ সেকেন্ড পর)
সাকসেস! ডেটা লোড হয়েছে।
প্রমিস সেটেলড (সবসময় চলে)।
```

## ৪. এপিআই-এর সাথে প্রমিস (Promises with APIs)

এপিআইগুলো প্রায়শই অ্যাসিঙ্ক্রোনাস HTTP রিকোয়েস্ট জড়িত। আধুনিক `fetch()` ফাংশন একটি প্রমিস রিটার্ন করে, যা `Response` অবজেক্টে রিজলভ হয়। `.then()` দিয়ে JSON পার্স করুন বা ডেটা হ্যান্ডল করুন।

### এপিআই কলের মূল ধাপসমূহ:
১. `fetch(url)` কল করুন → প্রমিস<Response> রিটার্ন করে।
২. `.then(response => response.json())` → JSON পার্স করে (আরেকটি প্রমিস)।
৩. পরবর্তী `.then()`-এ ডেটা হ্যান্ডল করুন বা `.catch()`-এ এরর।

### উদাহরণ: পাবলিক এপিআই থেকে ডেটা ফেচ
JSONPlaceholder এপিআই (টেস্টিংয়ের জন্য ফ্রি ফেক এপিআই) ব্যবহার করা হয়েছে।

```javascript
// ইউজার লিস্ট ফেচ করুন
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
        if (!response.ok) {
            throw new Error('নেটওয়ার্ক রেসপন্স ঠিক ছিল না');
        }
        return response.json(); // JSON রিটার্ন করে
    })
    .then(data => {
        console.log('ইউজার ডেটা:', data); // ডেটা প্রিন্ট করুন
        // উদাহরণ: প্রথম ইউজারের নাম
        console.log('প্রথম ইউজার:', data[0].name);
    })
    .catch(error => {
        console.error('ফেচ এরর:', error);
    });
```

**আউটপুট (সংক্ষিপ্ত):**
```
ইউজার ডেটা: [ { id: 1, name: 'Leanne Graham', ... }, ... ]
প্রথম ইউজার: Leanne Graham
```

**ব্যাখ্যা:** fetch প্রমিস রিটার্ন করে। প্রথম `.then()`-এ রেসপন্স চেক করে JSON-এ কনভার্ট করে। দ্বিতীয় `.then()`-এ ডেটা ব্যবহার করুন। এরর হলে `.catch()` চলে।

### উদাহরণ: পোস্ট করা (POST Request)
```javascript
const postData = {
    title: 'ফোকাস টাইটেল',
    body: 'ফোকাস বডি',
    userId: 1
};

fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
})
.then(response => response.json())
.then(data => {
    console.log('পোস্ট সাকসেসফুল:', data);
})
.catch(error => {
    console.error('পোস্ট এরর:', error);
});
```

**আউটপুট:**
```
পোস্ট সাকসেসফুল: { id: 101, title: 'ফোকাস টাইটেল', body: 'ফোকাস বডি', userId: 1 }
```

## ৫. প্রমিস চেইনিং এবং এরর হ্যান্ডলিং (Promise Chaining and Error Handling)

মাল্টিপল অ্যাসিঙ্ক্রোনাস টাস্কের জন্য চেইন করুন।

### উদাহরণ: চেইনিং
```javascript
fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(response => response.json())
    .then(user => {
        console.log('ইউজার:', user.name);
        // পরবর্তী কল: ইউজারের পোস্ট ফেচ
        return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
    })
    .then(response => response.json())
    .then(posts => {
        console.log('পোস্ট সংখ্যা:', posts.length);
    })
    .catch(error => {
        console.error('কোনো এরর:', error);
    });
```

**আউটপুট:**
```
ইউজার: Leanne Graham
পোস্ট সংখ্যা: 10
```

## ৬. অ্যাসিঙ্ক/অ্যাওয়েট দিয়ে প্রমিস (Async/Await with Promises)

প্রমিসকে সিঙ্ক্রোনাসের মতো লিখতে async/await ব্যবহার করুন।

### উদাহরণ: async/await দিয়ে এপিআই কল
```javascript
async function getUserPosts(userId) {
    try {
        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const user = await userResponse.json();
        
        const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        const posts = await postsResponse.json();
        
        console.log(`${user.name}-এর পোস্ট সংখ্যা: ${posts.length}`);
    } catch (error) {
        console.error('এরর:', error);
    }
}

getUserPosts(1);
```

**আউটপুট:**
```
Leanne Graham-এর পোস্ট সংখ্যা: 10
```

**ব্যাখ্যা:** `await` প্রমিসকে অপেক্ষা করে, কিন্তু মেইন থ্রেড ব্লক করে না। try/catch দিয়ে এরর হ্যান্ডল করুন।

## তুলনামূলক টেবিল

| বৈশিষ্ট্য              | প্রমিস (.then/.catch) | অ্যাসিঙ্ক/অ্যাওয়েট |
|-------------------------|-----------------------|----------------------|
| **লেখার স্টাইল**       | চেইনিং               | সিঙ্ক্রোনাস-লাইক    |
| **এরর হ্যান্ডলিং**     | .catch()              | try/catch            |
| **সুবিধা**             | ফ্লেক্সিবল চেইনিং   | পড়তে সহজ            |
| **ব্যবহার**            | পুরনো কোড            | আধুনিক কোড          |

## পরামর্শ
- সবসময় এরর হ্যান্ডল করুন যাতে অ্যাপ ক্র্যাশ না করে।
- রিয়েল এপিআইয়ের জন্য অথেনটিকেশন (যেমন API keys) যোগ করুন।
- আরও শিখতে: MDN Web Docs (JavaScript Promises এবং Fetch API) পড়ুন।

যদি আরও উদাহরণ বা বিস্তারিত চান, জানান!