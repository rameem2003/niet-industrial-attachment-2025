# Ecommerce Project Documentation Day 22

## Industrial Attachment - NIET

## React Hooks & Patterns

## Overview

This document provides comprehensive coverage of key React functional component patterns and hooks for Day 2 of learning. Topics include:

- **useState**: Managing local state.
- **useEffect**: Handling side effects.
- **useRef**: Creating mutable references.
- **State Lifting**: Sharing state across components.
- **Props Drilling**: Passing data through component layers (and how to avoid it).
- **Context API**: Global state management to eliminate drilling.

These concepts enable building scalable, interactive UIs. All examples assume React 18+ and functional components. Code is in JSX; test in a sandbox like CodeSandbox.

**Prerequisites**: Basic JSX, components, and props.

**Best Practices**:

- Always provide dependencies in `useEffect` to avoid infinite loops.
- Use functional updates in `useState` for derived state.
- Prefer Context over deep drilling for app-wide data (e.g., theme, auth).

---

## 1. useState Hook

### Description

`useState` adds reactive state to functional components. It returns a tuple: `[state, setState]`. Changes to state trigger re-renders.

### Signature

```jsx
const [state, setState] = useState(initialState);
```

- `initialState`: Any value (primitive, object, array). Can be a function for lazy init: `() => expensiveValue`.
- `setState`: Function to update state. Supports direct values or functional updates: `setState(prev => prev + 1)`.

### Usage Guidelines

- For local, component-specific data (e.g., form inputs, toggles).
- Avoid in loops/conditions (hoist to top of component).
- Objects/arrays: Spread to avoid mutation: `setObj({ ...prev, key: newVal })`.

### Example

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prevCount) => prevCount + 1);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

### Common Pitfalls

| Issue                       | Solution                                        |
| --------------------------- | ----------------------------------------------- |
| Stale closures in callbacks | Use functional update: `setState(prev => ...)`  |
| Unnecessary re-renders      | Memoize callbacks with `useCallback` (advanced) |
| Mutating state directly     | Always use setter; React batches updates        |

---

## 2. useEffect Hook

### Description

`useEffect` runs side effects after render (e.g., data fetching, subscriptions). Supports cleanup via return function.

### Signature

```jsx
useEffect(() => {
  // Effect logic
  return () => {
    /* Cleanup */
  };
}, [dependencies]);
```

- **Effect Callback**: Runs post-render.
- **Cleanup**: Optional; runs before next effect or unmount.
- **Dependencies**: Array controlling re-runs. `[]` = mount only; omit = every render.

### Usage Guidelines

- Fetch data, set timers, manipulate DOM.
- Async: Wrap in inner async function (effect can't be async).
- ESLint rule (`exhaustive-deps`) helps catch missing deps.

### Example

```jsx
import { useState, useEffect } from "react";

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch("/api/data")
      .then((res) => res.json())
      .then((result) => {
        if (mounted) setData(result);
      });

    return () => {
      mounted = false;
    }; // Abort on unmount
  }, []); // Run once

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

### Common Pitfalls

| Issue                 | Solution                                  |
| --------------------- | ----------------------------------------- |
| Infinite loops        | Add all used values to deps array         |
| Memory leaks          | Always cleanup timers/subscriptions       |
| Effect runs too often | Use `useLayoutEffect` for sync DOM (rare) |

---

## 3. useRef Hook

### Description

`useRef` creates a `.current` property that persists across renders without triggering re-renders. Ideal for DOM refs or mutable values.

### Signature

```jsx
const ref = useRef(initialValue);
```

- `initialValue`: Starting `.current` (often `null` for DOM).
- Updates: `ref.current = newValue;` (no re-render).

### Usage Guidelines

- DOM manipulation (e.g., focus, scroll).
- Storing non-reactive data (e.g., prev props, intervals).
- Not for state; use `useState` if UI needs to update.

### Example

```jsx
import { useRef, useEffect } from "react";

function VideoPlayer({ src }) {
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current?.load();
    videoRef.current?.play();
  }, [src]);

  return <video ref={videoRef} src={src} controls />;
}

// Mutable value example
function Tracker() {
  const prevCountRef = useRef();
  const [count, setCount] = useState(0);

  useEffect(() => {
    prevCountRef.current = count; // No re-render
  });

  return (
    <div>
      <p>
        Now: {count}, Prev: {prevCountRef.current}
      </p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
    </div>
  );
}
```

### Common Pitfalls

| Issue                    | Solution                                 |
| ------------------------ | ---------------------------------------- |
| Forgetting `.current`    | Always access via `ref.current`          |
| Using for reactive state | Switch to `useState` if re-render needed |
| Null refs                | Guard with `?.` or `if (ref.current)`    |

---

## 4. State Lifting

### Description

Move shared state from child components to their common ancestor (parent). Parent passes state and setters as props.

### When to Use

- Siblings need to sync (e.g., shared form data, counters).
- Avoids state duplication and inconsistencies.

### Guidelines

- Lift only as high as needed (not global unless using Context).
- Pass down read-only state; updaters as callbacks.

### Example

```jsx
function App() {
  const [name, setName] = useState("");

  return (
    <>
      <NameInput value={name} onChange={setName} />
      <NameDisplay name={name} />
    </>
  );
}

function NameInput({ value, onChange }) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />;
}

function NameDisplay({ name }) {
  return <p>Hello, {name || "World"}!</p>;
}
```

### Benefits vs. Alternatives

| Approach      | Pros                  | Cons                                    |
| ------------- | --------------------- | --------------------------------------- |
| State Lifting | Simple, no extra APIs | Increases prop passing                  |
| Context       | Global access         | Overkill for local sharing; indirection |

---

## 5. Props Drilling

### Description

Passing props through intermediate components that don't consume them, to reach deeper children. It's a byproduct of hierarchical data flow.

### When It Occurs

- Deeply nested components.
- App-wide data (e.g., user, theme) without Context.

### Guidelines

- Tolerate for 1-2 levels.
- Refactor if >3 levels: Use Context or composition (render props).

### Example (Problem)

```jsx
function App() {
  const user = { name: "Alice" };
  return <Layout user={user} />;
}

function Layout({ user }) {
  // Doesn't use user
  return <Sidebar user={user} />;
}

function Sidebar({ user }) {
  // Uses it
  return <p>Welcome, {user.name}!</p>;
}
```

### Mitigation Strategies

- **Composition**: Render children directly: `<Sidebar><UserGreeting user={user} /></Sidebar>`.
- See Context section below for full fix.

---

## 6. Context API

### Description

Provides a way to pass data through the component tree without props drilling. Creates a "global" scope for related components.

### Signature

```jsx
const MyContext = createContext(defaultValue);

function Provider({ children, value }) {
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}

function Consumer() {
  const value = useContext(MyContext);
  // Use value
}
```

### Usage Guidelines

- For app-wide data: theme, locale, auth.
- Wrap app or subtree in `<Provider>`.
- Use `useContext` in consumers; avoid class contexts.
- Dynamic values: Combine with `useState`/`useReducer` in provider.

### Example

```jsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext("light");

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return (
    <div>
      <ThemedButton />
      <LanguageSelector />
    </div>
  );
}

function ThemedButton() {
  const { theme } = useContext(ThemeContext);
  return (
    <button style={{ background: theme === "dark" ? "black" : "white" }}>
      I am styled by theme context.
    </button>
  );
}

function LanguageSelector() {
  const { setTheme } = useContext(ThemeContext); // No drilling!
  return (
    <button onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}>
      Toggle
    </button>
  );
}
```

### Common Pitfalls

| Issue                  | Solution                                                   |
| ---------------------- | ---------------------------------------------------------- |
| Unnecessary re-renders | Split contexts (e.g., Theme vs. User); use memoized values |
| No default value       | Provide sensible defaults in `createContext`               |
| Overuse                | Reserve for cross-cutting concerns; lift for local         |

---

## Practice Exercises

1. **Basic**: Build a counter with `useState` and `useEffect` for localStorage persistence.
2. **Intermediate**: Lift state for a multi-step form; use `useRef` to focus next input.
3. **Advanced**: Implement a theme toggle with Context; drill initially, then refactor to avoid it.
4. **Debug**: Intentionally cause an infinite `useEffect` loop and fix with deps.

## Resources

- Official Docs: [React Hooks](https://react.dev/reference/react), [Context](https://react.dev/reference/react/createContext).
- Tools: React DevTools for inspecting state/effects.

For Day 3 (e.g., useReducer, custom hooks), reply with topics! Questions? Let's debug code. 🚀
