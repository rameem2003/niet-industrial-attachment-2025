# JavaSCript Documentation Day 8

## Industrial Attachment - NIET

## Overview

# ডাইনামিক ডেটা (যেমন অ্যারে অফ অবজেক্টস) জাভাস্ক্রিপ্ট দিয়ে HTML-এ প্রদর্শন করা

জাভাস্ক্রিপ্ট ব্যবহার করে ডাইনামিক ডেটা (যেমন একটি অ্যারে যাতে অবজেক্ট রয়েছে) HTML-এ প্রদর্শন করতে, আমরা DOM ম্যানিপুলেশন করি। এর জন্য:

- একটি HTML কনটেইনার (যেমন `<div>` বা `<ul>`) তৈরি করুন।
- জাভাস্ক্রিপ্টে অ্যারে লুপ করে প্রত্যেক অবজেক্টের ডেটা নেয়া।
- `document.createElement()` বা `innerHTML` ব্যবহার করে ডাইনামিকভাবে এলিমেন্ট তৈরি করে অ্যাপেন্ড করা।

`innerHTML` সহজ, কিন্তু সিকিউরিটি ইস্যুর জন্য বড় অ্যাপে `createElement` ভালো।

#### উদাহরণ: অ্যারে অফ অবজেক্টসকে একটি টেবিলে প্রদর্শন করা
ধরুন, আমাদের একটি অ্যারে রয়েছে যাতে ব্যক্তির তথ্য (নাম, বয়স, শহর)।

```html
<!DOCTYPE html>
<html lang="bn">
<head>
    <title>ডাইনামিক ডেটা প্রদর্শন</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    <h2>ব্যক্তির তালিকা</h2>
    <table id="dataTable">
        <thead>
            <tr>
                <th>নাম</th>
                <th>বয়স</th>
                <th>শহর</th>
            </tr>
        </thead>
        <tbody id="tableBody">
            <!-- এখানে ডাইনামিক ডেটা অ্যাড হবে -->
        </tbody>
    </table>

    <script>
        // ডাইনামিক ডেটা: অ্যারে অফ অবজেক্টস
        const people = [
            { name: "আলী", age: 25, city: "ঢাকা" },
            { name: "রহিম", age: 30, city: "চট্টগ্রাম" },
            { name: "করিম", age: 28, city: "সিলেট" },
            { name: "সারা", age: 22, city: "রাজশাহী" }
        ];

        // টেবিল বডি এলিমেন্ট খুঁজে বের করা
        const tableBody = document.getElementById("tableBody");

        // অ্যারে লুপ করে প্রত্যেক অবজেক্টের জন্য রো তৈরি করা
        people.forEach(person => {
            // নতুন <tr> তৈরি
            const row = document.createElement("tr");

            // নামের জন্য <td>
            const nameCell = document.createElement("td");
            nameCell.textContent = person.name;
            row.appendChild(nameCell);

            // বয়সের জন্য <td>
            const ageCell = document.createElement("td");
            ageCell.textContent = person.age;
            row.appendChild(ageCell);

            // শহরের জন্য <td>
            const cityCell = document.createElement("td");
            cityCell.textContent = person.city;
            row.appendChild(cityCell);

            // রোটি টেবিল বডিতে অ্যাপেন্ড করা
            tableBody.appendChild(row);
        });
    </script>
</body>
</html>
```

#### ব্যাখ্যা:
- **ডেটা স্ট্রাকচার**: `people` অ্যারে যাতে অবজেক্ট রয়েছে (প্রত্যেক অবজেক্টে কী-ভ্যালু পেয়ার)।
- **লুপ**: `forEach()` দিয়ে প্রত্যেক অবজেক্ট প্রসেস করা।
- **DOM ম্যানিপুলেশন**: `createElement("tr")` এবং `createElement("td")` দিয়ে এলিমেন্ট তৈরি, `textContent` দিয়ে ডেটা সেট, `appendChild()` দিয়ে অ্যাড করা।
- **আউটপুট**: পেজ লোড হলে টেবিলে ডেটা দেখা যাবে। এটি ডাইনামিক, অর্থাৎ অ্যারে চেঞ্জ করলে আউটপুট চেঞ্জ হবে।

#### অল্টারনেটিভ: innerHTML ব্যবহার করে
যদি সিম্পল হয়, তাহলে লুপে HTML স্ট্রিং তৈরি করে `innerHTML` সেট করুন:

```javascript
let htmlContent = "";
people.forEach(person => {
    htmlContent += `<tr>
        <td>${person.name}</td>
        <td>${person.age}</td>
        <td>${person.city}</td>
    </tr>`;
});
tableBody.innerHTML = htmlContent;
```

এটি দ্রুত, কিন্তু ইনপুট যদি ইউজার থেকে আসে তাহলে XSS অ্যাটাকের ঝুঁকি রয়েছে।

#### অ্যাডভান্সড টিপস:
- **আপডেট করা**: যদি ডেটা চেঞ্জ হয় (যেমন API থেকে), তাহলে ফাংশন তৈরি করে টেবিল ক্লিয়ার (`tableBody.innerHTML = "";`) করে নতুন করে রেন্ডার করুন।
- **লিস্টে প্রদর্শন**: টেবিলের পরিবর্তে `<ul id="list">` ব্যবহার করে `li` তৈরি করুন।
- **ফ্রেমওয়ার্ক**: বড় প্রজেক্টে React, Vue বা Angular ব্যবহার করুন, যা ডাইনামিক রেন্ডারিং সহজ করে।
- **ইভেন্ট যোগ**: প্রত্যেক রোতে ক্লিক ইভেন্ট যোগ করে ডিটেলস দেখান (পূর্ববর্তী উদাহরণের মতো `addEventListener` ব্যবহার)।

----
----
# প্রোডাক্ট লিস্ট কার্ড হিসেবে প্রদর্শন: অবাঞ্ছিত কমা সমস্যা এবং join() দিয়ে সমাধান

জাভাস্ক্রিপ্টে প্রোডাক্ট লিস্ট (অ্যারে অফ অবজেক্টস) কার্ড হিসেবে রেন্ডার করার সময়, যদি কোনো অ্যারে (যেমন প্রোডাক্টের ফিচারস) সরাসরি টেক্সট হিসেবে সেট করা হয়, তাহলে অটোম্যাটিক্যালি কমা (,) যোগ হয়। এই সমস্যা প্রতিরোধ করতে `join()` মেথড ব্যবহার করুন, যা ফিচারগুলোকে পছন্দমতো সেপারেটর (যেমন স্পেস বা লাইন ব্রেক) দিয়ে জয়েন করে।

#### উদাহরণ: প্রোডাক্ট কার্ডস তৈরি
ধরুন, প্রোডাক্ট লিস্টে প্রত্যেক প্রোডাক্টের নাম, দাম এবং ফিচারস (অ্যারে) রয়েছে। আমরা দুটি সেকশন দেখাব: একটিতে অবাঞ্ছিত কমা যোগ হবে, অন্যটিতে join() দিয়ে সমাধান।

```html
<!DOCTYPE html>
<html lang="bn">
<head>
    <title>প্রোডাক্ট কার্ডস</title>
    <style>
        .container {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
        }
        .card {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 16px;
            width: 250px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            background-color: #f9f9f9;
        }
        .card h3 {
            margin-top: 0;
        }
        .features {
            font-style: italic;
        }
    </style>
</head>
<body>
    <h2>প্রোডাক্ট লিস্ট (কার্ডস)</h2>
    
    <h3>অবাঞ্ছিত কমা যোগ হওয়া উদাহরণ</h3>
    <div id="cardsWithoutJoin" class="container"></div>
    
    <h3>join() দিয়ে সমাধান</h3>
    <div id="cardsWithJoin" class="container"></div>

    <script>
        // প্রোডাক্ট ডেটা: অ্যারে অফ অবজেক্টস
        const products = [
            { name: "স্মার্টফোন", price: 15000, features: ["4GB RAM", "64GB স্টোরেজ", "HD ক্যামেরা"] },
            { name: "ল্যাপটপ", price: 50000, features: ["i5 প্রসেসর", "8GB RAM", "512GB SSD"] },
            { name: "হেডফোন", price: 2000, features: ["নয়েজ ক্যান্সেলিং", "ওয়্যারলেস", "লং ব্যাটারি"] }
        ];

        // অবাঞ্ছিত কমা যোগ হওয়া সেকশন
        const containerWithout = document.getElementById("cardsWithoutJoin");
        products.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <h3>${product.name}</h3>
                <p>দাম: ${product.price} টাকা</p>
                <p class="features">ফিচারস: ${product.features}</p>  <!-- এখানে কমা যোগ হবে -->
            `;
            containerWithout.appendChild(card);
        });
        // আউটপুট: ফিচারসে "4GB RAM,64GB স্টোরেজ,HD ক্যামেরা" (কমা যোগ হয়েছে)

        // join() দিয়ে সমাধান সেকশন
        const containerWith = document.getElementById("cardsWithJoin");
        products.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <h3>${product.name}</h3>
                <p>দাম: ${product.price} টাকা</p>
                <p class="features">ফিচারস: ${product.features.join(", ")}</p>  <!-- কমা এবং স্পেস দিয়ে জয়েন -->
            `;
            containerWith.appendChild(card);
        });
        // আউটপুট: ফিচারসে "4GB RAM, 64GB স্টোরেজ, HD ক্যামেরা" (নিয়ন্ত্রিত ফরম্যাট)
    </script>
</body>
</html>
```

#### ব্যাখ্যা:
- **প্রোডাক্ট ডেটা**: `products` অ্যারে যাতে প্রত্যেক অবজেক্টে `features` অ্যারে রয়েছে।
- **কার্ড তৈরি**: `forEach()` লুপ দিয়ে প্রত্যেক প্রোডাক্টের জন্য একটি `<div class="card">` তৈরি করা হয়েছে। `innerHTML` দিয়ে কনটেন্ট সেট করা।
- **অবাঞ্ছিত কমা**: `${product.features}` করলে অ্যারে `toString()` হয়ে কমা দিয়ে জয়েন হয় (যেমন "4GB RAM,64GB স্টোরেজ,HD ক্যামেরা") – স্পেস ছাড়া অসুন্দর।
- **join() সমাধান**: `${product.features.join(", ")}` দিয়ে কমা এবং স্পেস দিয়ে জয়েন করা হয়েছে। আপনি সেপারেটর চেঞ্জ করতে পারেন:
  - `join(" - ")`: ড্যাশ দিয়ে (যেমন "4GB RAM - 64GB স্টোরেজ - HD ক্যামেরা")।
  - `join("<br>")`: লাইন ব্রেক দিয়ে (প্রত্যেক ফিচার নতুন লাইনে)।
- **CSS**: কার্ডগুলোকে সুন্দর লেআউট দেওয়ার জন্য ফ্লেক্সবক্স ব্যবহার করা হয়েছে।

এই কোড HTML ফাইলে সেভ করে ব্রাউজারে চালান। দেখবেন প্রথম সেকশনে কমা সমস্যা, দ্বিতীয়টিতে সমাধান। যদি আরও কাস্টমাইজেশন (যেমন ইমেজ যোগ) চান, তাহলে জানান!