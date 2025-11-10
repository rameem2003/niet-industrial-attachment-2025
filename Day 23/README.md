# Ecommerce Project Documentation Day 23

## Industrial Attachment - NIET

## React Hooks

## Overview

- useMemo
- useCallback

### Easy Examples of `useMemo` and `useCallback`

Here are two straightforward examples to get you started. We'll use a simple counter app. Assume you have a basic React setup (e.g., via Create React App). These focus on the core ideas without extras like `React.memo`.

#### Example 1: `useMemo` – Memoizing an Expensive Calculation

**Scenario**: You have a list of numbers, and you want to compute their factorial sum (expensive for large lists). Without `useMemo`, it recalculates on _every_ render. With it, it only recomputes when the list changes.

**Code (App.js)**:

```jsx
import React, { useState, useMemo } from "react";

function factorial(n) {
  // Simulate expensive work (recursive for demo)
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

function App() {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
  const [count, setCount] = useState(0); // Unrelated state to trigger re-renders

  // Memoize the sum – only recompute if 'numbers' changes
  const expensiveSum = useMemo(() => {
    console.log("Computing sum..."); // You'll see this logs only when numbers change
    return numbers.reduce((sum, num) => sum + factorial(num), 0);
  }, [numbers]);

  return (
    <div>
      <h2>Expensive Sum: {expensiveSum}</h2>
      <button onClick={() => setNumbers([...numbers, numbers.length + 1])}>
        Add Number
      </button>
      <button onClick={() => setCount(count + 1)}>
        Irrelevant Click ({count})
      </button>
    </div>
  );
}

export default App;
```

**What happens**:

- Click "Irrelevant Click" → No recompute (no console log).
- Click "Add Number" → Recomputes only the sum.
- Test with larger numbers (e.g., add [10]) to feel the "expense."

#### Example 2: `useCallback` – Stabilizing a Function Reference

**Scenario**: A child component receives a callback prop. Without `useCallback`, the function gets a new reference on every parent render, causing unnecessary child re-renders (especially if the child is memoized).

**Code (Parent.js – the App)**:

```jsx
import React, { useState, useCallback } from "react";
import Child from "./Child";

function App() {
  const [name, setName] = useState("Grok");
  const [clicks, setClicks] = useState(0); // Triggers re-renders

  // Memoize the handler – stable reference unless 'name' changes
  const handleGreet = useCallback(
    (message) => {
      alert(`Hello, ${name}! ${message}`);
    },
    [name]
  );

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
      />
      <button onClick={() => setClicks(clicks + 1)}>Click Me ({clicks})</button>
      <Child onGreet={handleGreet} />
    </div>
  );
}

export default App;
```

**Code (Child.js)**:

```jsx
import React, { memo } from "react";

function Child({ onGreet }) {
  console.log("Child rendering..."); // Logs only when prop actually changes
  return <button onClick={() => onGreet("From Child!")}>Greet</button>;
}

export default memo(Child);
```

**What happens**:

- Change name → New function ref → Child re-renders (expected).
- Click "Click Me" → Same function ref → Child skips re-render (no console log).
- Without `useCallback`, _every_ parent render would force Child to re-render.

These are plug-and-play—copy into your project and tweak. If you want more (e.g., with arrays/objects), let me know! 🚀

---

# React.memo: Optimizing Component Re-renders

Hey! Building on our `useMemo` and `useCallback` chat, `React.memo` is the next piece of the performance puzzle. It's a higher-order component (HOC) that memoizes a _component_ itself, skipping re-renders if props haven't changed (via shallow equality check). Think of it as "lazy rendering" for pure functional components.

## Quick Refresher

- **Syntax**: `export default React.memo(MyComponent);` or `const Memoized = React.memo(MyComponent);`.
- **When to use**: For components that receive the same props often but re-render unnecessarily due to parent updates. Great for lists or expensive child components.
- **Caveats**:
  - Shallow compare only (primitives: `===`; objects/arrays: reference equality).
  - Overuse adds overhead—profile first!
  - Doesn't memoize hooks inside; pair with `useMemo`/`useCallback` for stable props.
- **Custom comparator**: Pass a function as second arg: `React.memo(Component, (prevProps, nextProps) => prevProps.id === nextProps.id);`.

React.memo shines in scenarios like the ones from our earlier examples (e.g., `CharacterMap` or `Child`). Let's break it down with **easy examples** and a **problem/solution** to see it in action.

---

## Easy Example 1: Basic Memoization (Parent-Child Scenario)

**Scenario**: A `CounterDisplay` child re-renders every time the parent updates unrelated state, even if the counter prop is unchanged.

**Without `React.memo` (Inefficient – App.js)**:

```jsx
import React, { useState } from "react";
import CounterDisplay from "./CounterDisplay";

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("World"); // Unrelated state

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <CounterDisplay count={count} />
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default App;
```

**CounterDisplay.js** (No memo yet):

```jsx
import React from "react";

function CounterDisplay({ count }) {
  console.log("CounterDisplay rendered"); // Logs on EVERY parent update!
  return <p>Count: {count}</p>;
}

export default CounterDisplay;
```

**Test it**: Type in the input—child logs "rendered" unnecessarily.

### With `React.memo` (Optimized):

Update `CounterDisplay.js`:

```jsx
import React, { memo } from "react";

function CounterDisplay({ count }) {
  console.log("CounterDisplay rendered"); // Now only on count change!
  return <p>Count: {count}</p>;
}

export default memo(CounterDisplay);
```

**Result**: Typing in name → No child render (no log). Increment → Renders as expected. Boom—fewer logs!

---

## Easy Example 2: Memoizing a List Item (With Objects)

**Scenario**: Rendering a list of users. Parent re-renders create new object props, breaking memoization unless you stabilize them.

**App.js**:

```jsx
import React, { useState } from "react";
import UserItem from "./UserItem";

const initialUsers = [
  { id: 1, name: "Alice", age: 30 },
  { id: 2, name: "Bob", age: 25 },
];

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [filter, setFilter] = useState(""); // Causes re-renders

  const handleAdd = () =>
    setUsers([...users, { id: users.length + 1, name: "New", age: 20 }]);

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter"
      />
      <button onClick={handleAdd}>Add User</button>
      <ul>
        {users
          .filter((user) => user.name.includes(filter))
          .map((user) => (
            <UserItem key={user.id} user={user} />
          ))}{" "}
        {/* New object each render? */}
      </ul>
    </div>
  );
}

export default App;
```

**UserItem.js (Without memo)**:

```jsx
import React from "react";

function UserItem({ user }) {
  console.log(`Rendering ${user.name}`); // Logs too often!
  return (
    <li>
      {user.name} ({user.age})
    </li>
  );
}

export default UserItem;
```

**Issue**: Even with memo, if `user` is a new object each render, it breaks (shallow compare fails).

### Optimized Version:

1. **Memoize the filtered list** in App (using `useMemo` from our last chat):

   ```jsx
   // In App.js
   import { useMemo } from "react";
   const filteredUsers = useMemo(
     () => users.filter((user) => user.name.includes(filter)),
     [users, filter]
   );
   // Then: {filteredUsers.map(user => <UserItem key={user.id} user={user} />)}
   ```

2. **Wrap UserItem with memo**:

   ```jsx
   // UserItem.js
   import React, { memo } from "react";

   function UserItem({ user }) {
     console.log(`Rendering ${user.name}`);
     return (
       <li>
         {user.name} ({user.age})
       </li>
     );
   }

   export default memo(UserItem);
   ```

**Result**: Typing filter → List re-renders, but individual `UserItem`s skip if their `user` prop is stable. Add user → Only new item renders.

---

## Problem: Deep Props Breaking Memoization

**Scenario**: Your `UserItem` now receives a computed `fullInfo` object (e.g., `{ name, age, isAdult: age >= 18 }`). Parent recreates it every render, so even with `React.memo`, the child re-renders always.

**Starter (Inefficient – App.js snippet)**:

```jsx
// In map:
const fullInfo = { ...user, isAdult: user.age >= 18 }; // New object!
<UserItem key={user.id} fullInfo={fullInfo} />;
```

**UserItem.js**:

```jsx
function UserItem({ fullInfo }) {
  console.log("Re-render!"); // Always fires
  return (
    <li>
      {fullInfo.name} {fullInfo.isAdult ? "(Adult)" : "(Minor)"}
    </li>
  );
}

export default memo(UserItem); // Useless here
```

**Test it**: Any parent update → Child re-renders.

### Solution: Memoize Props in Parent + Custom Comparator

**Updated App.js** (Use `useCallback` for stability):

```jsx
import { useMemo, useCallback } from "react";

// In component:
const getFullInfo = useCallback(
  (user) => ({
    ...user,
    isAdult: user.age >= 18,
  }),
  []
);

{
  filteredUsers.map((user) => (
    <UserItem
      key={user.id}
      fullInfo={getFullInfo(user)} // Still new? Wait...
    />
  ));
}
```

Wait, that's not enough—`useCallback` stabilizes the _function_, but calls create new objects. Better: Memoize _per user_ or restructure.

**Best Fix: Compute Inside Child or Use Custom Prop Compare**:
Option 1: Move computation to child (simplest):

```jsx
// UserItem.js
function UserItem({ user }) {
  // Pass user, not fullInfo
  const fullInfo = useMemo(
    () => ({ ...user, isAdult: user.age >= 18 }),
    [user]
  );
  // Render with fullInfo
}
export default memo(UserItem, (prev, next) => prev.user.id === next.user.id); // Custom: Compare IDs
```

Option 2: In parent, memoize the entire prop object per user (if users are stable):

```jsx
// App.js
const memoizedUsers = useMemo(
  () =>
    filteredUsers.map((user) => ({
      ...user,
      isAdult: user.age >= 18,
    })),
  [filteredUsers]
);
// Then pass memoizedUsers[i]
```

**Result**: Re-renders only when actual user data changes. Use the custom comparator for "deep" equality on specific props.

---

## Key Takeaways

- `React.memo` + `useMemo`/`useCallback` = Optimization dream team.
- Always stable-ify object/function props first.
- Profile with React DevTools (highlight updates) to confirm wins.
- Not for class components (use `PureComponent` instead).

Try wrapping your examples from last time with `React.memo`—you'll see the magic. Got a specific scenario or code to debug? Hit me up! 🚀

---

# useMemo vs. React.memo: A Clear Comparison

In React's optimization toolkit, `useMemo` and `React.memo` both help reduce unnecessary work, but they target different levels: **values/computations** vs. **entire components**. Misusing them can lead to bugs or added overhead, so understanding the "why" and "when" is key. Let's break it down with a comparison table, examples, and best practices.

## Quick Comparison Table

| Aspect                    | `useMemo`                                                                                                                  | `React.memo`                                                                          |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **What it does**          | Memoizes a _value_ (e.g., result of a computation, object, or array). Skips recomputation if dependencies haven't changed. | Memoizes a _component_. Skips re-render if props are shallow-equal to previous ones.  |
| **Syntax**                | `const value = useMemo(() => computeExpensiveValue(), [dep1, dep2]);`                                                      | `const MemoComp = React.memo(Component);` or `export default React.memo(MyComp);`     |
| **Level of optimization** | Inside a component (e.g., avoids recalculating a filtered list).                                                           | At the component boundary (e.g., prevents child from re-rendering on parent updates). |
| **When it triggers**      | On every render, checks deps; recomputes if changed.                                                                       | On prop changes; skips render if props === previous props (shallow check).            |
| **Dependencies/Props**    | Explicit array of values the memoized value depends on.                                                                    | Implicit: Shallow comparison of all props. Custom comparator optional.                |
| **Common Pitfalls**       | Stale closures if deps are incomplete; over-memoizing cheap ops.                                                           | New object/function props break shallow check; doesn't handle internal state changes. |
| **Pairing**               | Often with `React.memo` to stabilize props.                                                                                | Often with `useMemo`/`useCallback` to keep props stable.                              |
| **Overhead**              | Low: Just skips computation.                                                                                               | Medium: Adds comparison on every potential re-render.                                 |
| **Use Case**              | Expensive derivations (e.g., sum of factorials).                                                                           | Pure components in lists or deep trees (e.g., memoized list items).                   |

Both are "lazy"—they cache to avoid work—but `useMemo` is for _what_ you compute, while `React.memo` is for _whether_ you render.

---

## Example 1: `useMemo` in Action (Memoizing a Value)

**Scenario**: In a `TodoStats` component, you compute "completed percentage" from a large todo list. Without `useMemo`, it recalculates on every render (e.g., when toggling unrelated UI).

**Code (TodoStats.js)**:

```jsx
import React, { useState, useMemo } from "react";

function TodoStats({ todos }) {
  const [filter, setFilter] = useState("all"); // Unrelated state triggers re-renders

  // Without useMemo: Recomputes every time!
  // const completedPercentage = (todos.filter(t => t.completed).length / todos.length) * 100;

  const completedPercentage = useMemo(() => {
    const completed = todos.filter((t) => t.completed).length;
    return Math.round((completed / todos.length) * 100);
  }, [todos]); // Only recompute if 'todos' changes

  return (
    <div>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option>All</option>
        <option>Active</option>
      </select>
      <p>Completed: {completedPercentage}%</p>
    </div>
  );
}

export default TodoStats;
```

**Result**: Changing `filter` → No recompute (fast). Updating `todos` → Recomputes as needed.

---

## Example 2: `React.memo` in Action (Memoizing a Component)

**Scenario**: `TodoItem` is a child in a list. Parent `TodoList` re-renders on search input, but most items' props haven't changed—without `React.memo`, all items re-render.

**Code (TodoList.js – Parent)**:

```jsx
import React, { useState } from "react";
import TodoItem from "./TodoItem";

const initialTodos = [
  { id: 1, text: "Learn React", completed: false },
  { id: 2, text: "Build app", completed: true },
  // ... more
];

function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [search, setSearch] = useState(""); // Triggers parent re-render

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
```

**TodoItem.js (Without memo – Inefficient)**:

```jsx
import React from "react";

function TodoItem({ todo }) {
  console.log(`Rendering ${todo.text}`); // Logs for ALL items on search!
  return (
    <li>
      <input type="checkbox" checked={todo.completed} readOnly />
      {todo.text}
    </li>
  );
}

export default TodoItem;
```

### With `React.memo` (Optimized):

```jsx
import React, { memo } from "react";

function TodoItem({ todo }) {
  console.log(`Rendering ${todo.text}`); // Now only for changed/searched items!
  return (
    <li>
      <input type="checkbox" checked={todo.completed} readOnly />
      {todo.text}
    </li>
  );
}

export default memo(TodoItem);
```

**Result**: Typing in search → Only matching `TodoItem`s render (fewer logs). But if `todo` is a new object each time, add `useMemo` in parent for `filteredTodos`.

---

## When to Use Which (and Together)

- **Use `useMemo` alone**: For internal computations that are expensive but don't affect rendering (e.g., parsing JSON once).
- **Use `React.memo` alone**: For simple, prop-driven components where shallow equality holds (e.g., static badges).
- **Use both**: Classic combo! Memoize props in parent (`useMemo` for objects/arrays, `useCallback` for functions), then wrap child with `React.memo`. From our earlier chats: Stabilize `transformer` with `useCallback`, compute `characters` with `useMemo`, wrap `CharacterMap` with `React.memo`.
- **Don't use**: For trivial ops (e.g., `a + b`)—React is fast enough. Profile with DevTools first.

**Pro Tip**: If shallow compare fails (e.g., deep objects), use a custom comparator in `React.memo`: `(prevProps, nextProps) => prevProps.user.id === nextProps.user.id`.

These tools can cut re-renders by 50-90% in large apps. Experiment with the todo example—add 100 items and search to feel the difference. What's your next React curiosity? 🚀
