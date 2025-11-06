# React JS Class: Day 1 - Getting Started with React

Welcome to **Day 1** of our React JS class! Today, we'll cover the fundamentals to get you up and running. React is a powerful JavaScript library for building user interfaces, maintained by Facebook (now Meta). It's declarative, component-based, and excels at creating interactive UIs.

By the end of today, you'll:

- Understand what React is and why it's useful.
- Set up your development environment.
- Create your first React app.
- Learn about JSX and basic components.

## Prerequisites

Before diving in, ensure you have:

- Basic knowledge of HTML, CSS, and JavaScript (ES6+ features like arrow functions and destructuring).
- Node.js installed (version 14+). Download from [nodejs.org](https://nodejs.org/) if needed.
- A code editor like VS Code.

## Step 1: What is React?

React lets you build UIs as reusable **components**. Instead of manipulating the DOM directly, you describe what the UI should look like, and React handles the updates efficiently using a virtual DOM.

Key concepts we'll touch today:

- **JSX**: A syntax extension that looks like HTML but is JavaScript.
- **Components**: Functions or classes that return UI elements.
- **Rendering**: How React displays your components in the browser.

## Step 2: Setting Up Your Environment

We'll use **Create React App** (CRA), a tool that bootstraps a React project with zero configuration.

1. Open your terminal/command prompt.
2. Create a new app:
   ```
   npm create vite@latest
   ```
   This downloads and sets up everything (takes ~1-2 minutes).
3. Navigate to the project:
   ```
   cd my-first-react-app
   ```
4. Start the development server:
   ```
   npm run dev
   ```
   Your browser should open to `http://localhost:5173`, showing the default React logo and welcome page.

**Pro Tip**: The dev server auto-reloads on file changes—perfect for rapid development!

## Step 3: Your First React Component

Let's replace the default app with something simple. Open `src/App.js` in your editor.

Delete the contents and add this:

```jsx
import React from "react"; // Import React (required for JSX)

function App() {
  return (
    <div className="App">
      <h1>Hello, React World!</h1>
      <p>Welcome to Day 1 of our React class.</p>
    </div>
  );
}

export default App; // Export the component
```

- Save the file. The browser should update instantly!
- **What's happening?** `App` is a functional component (a JS function returning JSX). The `<div>` and `<h1>` are JSX elements.

## Step 4: Understanding JSX

JSX is like HTML in JS, but it's syntactic sugar—transpiled to `React.createElement()` calls by Babel.

Key rules:

- **CamelCase attributes**: `className` (not `class`), `onClick` (not `onclick`).
- **Self-closing tags**: `<img src="..." />` or `<br />`.
- **Expressions in `{}`**: Embed JS like `{2 + 2}` or `{userName}`.
- **Fragments**: Use `<>` and `</>` to wrap multiple elements without extra DOM nodes.

Example: Let's add a dynamic greeting. Update `App.js`:

```jsx
import React from "react";

function App() {
  const name = "React Student"; // JS variable
  const year = new Date().getFullYear();

  return (
    <>
      <h1>Hello, {name}!</h1>
      <p>Learning React in {year}.</p>
      <ul>
        <li>Day 1: Setup & JSX</li>
        <li>Day 2: Props & State</li>
      </ul>
    </>
  );
}

export default App;
```

- `{name}` interpolates the variable.
- The `<ul>` shows nesting.

## Step 5: Creating a Simple Component

Components are reusable. Let's make a `Greeting` component.

1. Create `src/Greeting.js`:

   ```jsx
   import React from "react";

   function Greeting(props) {
     return <h2>Hi, {props.name}!</h2>;
   }

   export default Greeting;
   ```

2. Import and use it in `App.js`:

   ```jsx
   import React from "react";
   import Greeting from "./Greeting";

   function App() {
     return (
       <div>
         <Greeting name="Alice" />
         <Greeting name="Bob" />
       </div>
     );
   }

   export default App;
   ```

- This renders two greetings. (We'll dive deeper into props tomorrow.)

## Homework

1. Customize the `App` component: Add your name, a list of your favorite React topics, and an image (use `import` for local images or a URL).
2. Read the [official React docs intro](https://react.dev/learn) (10-15 mins).
3. Experiment: What happens if you forget to close a tag or misuse `{}`?

---

# Props and Children

Welcome back, React builder! it's time to make components talk to each other. **Props** (short for "properties") let you pass data from parent to child components—like arguments to a function. **Children** is a special prop that captures whatever you put _between_ the opening and closing tags of a component, making it flexible for layouts or wrappers.

This builds on functional components (our modern focus), but concepts apply to classes too. By the end, you'll create reusable, data-driven UIs.

**Quick Setup Reminder**: In your `my-first-react-app`, we'll add new files. `npm run dev` to run.

## What Are Props?

Props are **read-only** data passed down from parent to child. They're like function parameters: immutable in the child (don't mutate them—use state for that).

- **Parent**: Defines and passes props via attributes (e.g., `<Child name="Alice" />`).
- **Child**: Receives via the `props` object (or destructured: `{ name }`).
- **Default Props**: Set fallbacks with `defaultProps` (classes) or inside the function.
- **PropTypes**: Optional validation (install `prop-types` via `npm install prop-types` for type checking).

Props enable **reusability**: One component, many uses.

### Example: Basic Props

Let's build a `ProfileCard` component that displays a name and age.

1. Create `src/ProfileCard.js`:

   ```jsx
   import React from "react";
   // Optional: import PropTypes from 'prop-types';

   function ProfileCard({ name, age }) {
     // Destructure props
     return (
       <div
         style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}
       >
         <h3>{name}</h3>
         <p>Age: {age}</p>
       </div>
     );
   }

   export default ProfileCard;
   ```

2. Use in `App.js`:

   ```jsx
   import React from "react";
   import ProfileCard from "./ProfileCard";

   function App() {
     return (
       <div>
         <ProfileCard name="Alice" age={25} />
         <ProfileCard name="Bob" /> {/* Uses default age: 0 */}
       </div>
     );
   }

   export default App;
   ```

- Render: Two cards with names and ages.
- **Why Destructure?** Cleaner than `props.name`. For functions: `({ name, age = 0 }) => ...`

### Props as Objects/Functions

Props can be anything: strings, numbers, objects, arrays, or even functions (for callbacks).

Example: Pass an array and a click handler. Update `ProfileCard`:

```jsx
function ProfileCard({ name, hobbies, onLike }) {
  // hobbies: array, onLike: function
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h3>{name}</h3>
      <ul>
        {hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li> // key for lists (more on Day 5)
        ))}
      </ul>
      <button onClick={onLike}>Like Profile</button>
    </div>
  );
}
```

In `App.js`:

```jsx
<ProfileCard
  name="Alice"
  hobbies={["Reading", "Coding"]}
  onLike={() => alert("Liked Alice!")}
/>
```

- Clicking calls the parent's function—great for events!

## What Are Children?

`children` is a **special prop**—it's automatically passed as whatever JSX is nested inside the component tag. Use it for flexible, composable components (e.g., buttons with icons, modals with content).

- Access: `{ props.children }` or destructured `{ children }`.
- Types: Can be elements, text, arrays—render with `{children}`.

### Example: A Wrapper Component

Create `src/Card.js` (a reusable container):

```jsx
import React from "react";

function Card({ title, children }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        margin: "10px",
      }}
    >
      <h2>{title}</h2>
      <div>{children}</div> {/* Renders nested content */}
    </div>
  );
}

export default Card;
```

Use in `App.js`:

```jsx
import React from "react";
import Card from "./Card";

function App() {
  return (
    <Card title="My Profile">
      <p>This is the content inside the card!</p>
      <button>Click me</button>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
    </Card>
  );
}

export default App;
```

- `{children}` renders the `<p>`, `<button>`, and `<ul>`—dynamic content!

**Advanced Children**: If multiple children, it's an array. Use `React.Children` utils for mapping/filtering (e.g., `React.Children.map(children, child => ...)`).

## Props + Children Together

Combine for powerful components. Update `ProfileCard` to wrap its content:

```jsx
function ProfileCard({ name, children }) {
  return (
    <Card title={name}>
      {" "}
      {/* Use our Card! */}
      {children}
    </Card>
  );
}
```

In `App.js`:

```jsx
<ProfileCard name="Alice">
  <p>Bio: Loves React.</p>
  <button onClick={() => alert("Hi!")}>Say Hi</button>
</ProfileCard>
```

- Props set the title; children fill the body.

## Best Practices & Pitfalls

- **Immutability**: Treat props as read-only—don't change them in child.
- **Spread Props**: `<Child {...otherProps} />` for dynamic passing.
- **Validation**: Use PropTypes in dev; TypeScript for prod.
- **Children Pitfall**: If no children, `{children}` is `undefined`—handle with `children || null`.
- **Performance**: For large props, use `React.memo` to skip re-renders.

| Concept         | Props                      | Children                            |
| --------------- | -------------------------- | ----------------------------------- |
| **Purpose**     | Pass explicit data/events  | Pass nested JSX/content             |
| **Access**      | `{ name }` or `props.name` | `{ children }`                      |
| **Mutable?**    | No (read-only)             | No, but can be mapped               |
| **Example Use** | `<Comp color="red" />`     | `<Layout><Header/><Main/></Layout>` |

## Homework

1. Build a `TodoItem` component: Takes `todo` prop (object: {text, completed}), renders with strike-through if completed. Add `onToggle` prop for checkbox.
2. Create a `Layout` wrapper: Uses children for `<header>`, `<main>`, `<footer>` slots (hint: Pass as separate props or use multiple children).
3. Integrate: In `App`, render a list of TodoItems inside a Card.
4. Read [React docs on props](https://react.dev/learn/passing-props-to-a-component) (10 mins).
5. Bonus: Add PropTypes and test defaults.

---

# Conditional Rendering

Hey, React wizard-in-training! After mastering props and children, let's make your UI dynamic: **conditional rendering** shows or hides elements based on conditions (like state, props, or logic). It's React's way of saying "if this, then that" in JSX—no messy `if` statements inside render!

This is essential for loading states, authentication, toggles, and more. We'll stick to functional components.

By the end, you'll:

- Use `&&`, ternary (`? :`), and `if/else` patterns.
- Handle loading/error states.
- Render lists conditionally (teaser for tomorrow).

Grab your `my-first-react-app`—`npm start` and let's code!

## Why Conditional Rendering?

React re-renders on state/prop changes, so conditions ensure the right JSX at the right time. It's declarative: Describe _what_ to show, not _how_ to toggle DOM.

Key: Conditions happen in the **render** (JSX return)—pure functions, no side effects.

## Method 1: Logical AND (`&&`) Operator

Short-circuit: If the left is truthy, render the right. Great for "show if true" (e.g., errors, loading).

Example: A toggleable message. Update `App.js`:

```jsx
import React, { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? "Log Out" : "Log In"}
      </button>
      {isLoggedIn && <p>Welcome back, user!</p>} {/* Shows only if true */}
    </div>
  );
}

export default App;
```

- Click "Log In": Message appears.
- Falsy values (`false`, `0`, `null`, `undefined`, `''`) hide the element—no render.

**Pro Tip**: For arrays/objects, `{data && <ul>{data.map(...)}</ul>}`—avoids errors if `data` is falsy.

## Method 2: Ternary Operator (`? :`)

"If-then-else" in one line. Use for two options.

Example: User greeting based on name prop. Create `src/Greeting.js`:

```jsx
import React from "react";

function Greeting({ name }) {
  return <h1>{name ? `Hello, ${name}!` : "Hello, stranger!"}</h1>;
}

export default Greeting;
```

In `App.js`:

```jsx
import React, { useState } from "react";
import Greeting from "./Greeting";

function App() {
  const [userName, setUserName] = useState("");

  return (
    <div>
      <input
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Enter name"
      />
      <Greeting name={userName} />
    </div>
  );
}

export default App;
```

- Empty input: "Hello, stranger!"
- Type: Personalized greeting.

**Nested Ternaries**: Possible but messy—avoid: `{condition ? (subCond ? 'A' : 'B') : 'C'}`. Use `&&` or functions instead.

In `App`: `<MoodDisplay mood="happy" />` → 😊

## Best Practices & Pitfalls

- **Falsy Gotchas**: `{0 && 'Count: 0'}` hides "0"—use `data.length > 0`.
- **Performance**: Conditions in render are fine; avoid heavy computations (use `useMemo`).
- **Accessibility**: Add `aria-hidden` for hidden elements; use semantic tags.
- **Fragments**: Wrap multiples: `{condition && (<> <p>A</p> <p>B</p> </>)}`
- **When to Use What**:
  | Scenario | Method |
  |----------|--------|
  | Show if true | `&&` |
  | True/False | Ternary |
  | Multiple/Complex | If/else or Enum |

## Homework

1. Enhance `ProfileCard` (from Day 4): Conditionally show "VIP" badge if `age > 18`. Use ternary for edit/delete buttons based on `isOwner` prop.
2. Build a `WeatherApp`: Fetch weather (use `fetch` in `useEffect`)—show loading, data, or error conditionally.
3. Add a theme toggle: Dark/light mode with CSS classes via ternary.
4. Read [React docs on conditional](https://react.dev/learn/conditional-rendering) (10 mins).
5. Bonus: Implement a fallback image: `{imgSrc ? <img src={imgSrc} /> : <div>No Image</div>}`.

## Quick Quiz

- Q: How do you show content only if `user` is truthy?  
  A: `{user && <Welcome user={user} />}`
- Q: What's better for three+ options: Nested ternary or if/else?  
  A: If/else (cleaner and more readable).

# Event Handling

Hello, React event maestro! After conditional rendering, let's wire up interactions: **event handling** captures user actions like clicks, inputs, and scrolls. React wraps native JS events in a synthetic system—consistent across browsers, with familiar props like `onClick`.

This is key for making UIs responsive. We'll focus on functional components, using inline handlers and state updates.

By the end, you'll:

- Handle common events (click, change, submit).
- Pass event data (e.g., `e.target.value`).
- Prevent defaults and bubble events.
- Build a simple form.

Fire up `my-first-react-app`—`npm start`!

## Why Event Handling in React?

Native JS: `addEventListener('click', handler)`. React: CamelCase props like `onClick={handler}`—declarative and composable. Events bubble up; you can stop them.

Handlers are functions—keep them lean or use `useCallback` for perf.

## Basic Event Handling

Attach to JSX elements: `<button onClick={handleClick}>Click</button>`.

Example: Counter with click. Update `App.js`:

```jsx
import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // No event param needed here
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}

export default App;
```

- Click: Increments state, re-renders.
- **Arrow vs. Declare**: `onClick={() => setCount(count + 1)}` works (inline), but creates new functions each render—use declared for stability.

## Event Object

Events pass a synthetic `event` (e.g., `onClick={(e) => ...}`). Use for details like `e.target.value`.

Example: Input that echoes value. Add to `App.js`:

```jsx
const [inputValue, setInputValue] = useState("");

const handleInputChange = (e) => {
  // e: event
  setInputValue(e.target.value);
};

return (
  <div>
    {/* ... counter ... */}
    <input
      type="text"
      value={inputValue}
      onChange={handleInputChange} // Fires on keystroke
      placeholder="Type here"
    />
    <p>You typed: {inputValue}</p>
  </div>
);
```

- Type: Mirrors input in real-time via controlled component (state = value).

## Common Events

| Event  | Element       | Prop                        | Use Case                |
| ------ | ------------- | --------------------------- | ----------------------- |
| Click  | Button, div   | `onClick`                   | Toggles, submits        |
| Change | Input, select | `onChange`                  | Form updates            |
| Submit | Form          | `onSubmit`                  | Form send               |
| Key    | Input         | `onKeyDown`, `onKeyPress`   | Shortcuts (e.g., Enter) |
| Mouse  | Any           | `onMouseOver`, `onMouseOut` | Tooltips                |
| Scroll | Window/div    | `onScroll`                  | Infinite scroll         |

Example: Form submit. Add:

```jsx
const [formData, setFormData] = useState({ name: "", email: "" });

const handleSubmit = (e) => {
  e.preventDefault(); // Stops page reload
  alert(`Submitted: ${formData.name} - ${formData.email}`);
};

const handleFormChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

return (
  <div>
    {/* ... previous ... */}
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleFormChange}
        placeholder="Name"
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleFormChange}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  </div>
);
```

- `e.preventDefault()`: Prevents default (e.g., form submit reload).
- Dynamic keys: `[e.target.name]` updates the right field.

## Quick Quiz

- Q: How do you prevent form submit reload?  
  A: `e.preventDefault()` in `onSubmit`.
- Q: What's the prop for input changes?  
  A: `onChange={(e) => ...}`.
