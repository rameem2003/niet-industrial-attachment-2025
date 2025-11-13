# Ecommerce Project Documentation Day 24

## Industrial Attachment - NIET

## Overview

- React Router Navigation
- React Form Handling

### Today, we'll dive into **React Router DOM** (focusing on navigation with data, getting URL params, and logical navigation) and **React form handling**. I'll assume you're using React Router v6 (the latest stable version as of 2025). We'll use functional components and hooks for modern React

Prerequisites: Basic React setup with `react-router-dom` installed (`npm install react-router-dom`). Wrap your app in `<BrowserRouter>` in `index.js` or `App.js`.

## Part 1: React Router DOM Basics

React Router handles client-side routing. Key concepts:

- **Routes**: Define paths and components.
- **Navigation**: Programmatic (via hooks) or declarative (via `<Link>`).
- **Params**: Dynamic URL segments (e.g., `/user/:id`).

### 1.1 Setting Up Routes

In `App.js`:

```jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import UserProfile from "./UserProfile";
import EditUser from "./EditUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </Router>
  );
}

export default App;
```

### 1.2 Getting URL Params (`useParams`)

Use the `useParams` hook to extract dynamic segments from the URL.

In `UserProfile.js`:

```jsx
import { useParams } from "react-router-dom";

function UserProfile() {
  const { id } = useParams(); // Extracts :id from /user/:id

  return (
    <div>
      <h1>User ID: {id}</h1>
      {/* Fetch user data based on id */}
    </div>
  );
}

export default UserProfile;
```

- **Use case**: Display a user's profile based on `/user/123`.
- **Tip**: Params are strings; convert to numbers if needed (`parseInt(id)`).

### 1.3 Navigating with Data (`useNavigate` + State)

Use the `useNavigate` hook for programmatic navigation. Pass data via the `state` option.

In `Home.js` (navigating to UserProfile with data):

```jsx
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to /user/123 and pass data
    navigate("/user/123", {
      state: { fromHome: true, userName: "Alice" }, // Custom data
    });
  };

  return <button onClick={handleClick}>Go to User Profile</button>;
}

export default Home;
```

Receiving data in `UserProfile.js`:

```jsx
import { useLocation } from "react-router-dom";

function UserProfile() {
  const { id } = useParams();
  const { state } = useLocation(); // Access passed state

  return (
    <div>
      <h1>User ID: {id}</h1>
      {state?.fromHome && <p>Welcome back from Home! Name: {state.userName}</p>}
    </div>
  );
}

export default UserProfile;
```

- **Why state?** It's ephemeral (lost on page refresh) and ideal for one-time data like form results.
- **Alternative for persistent data**: Use URL search params (`useSearchParams`) or context/Redux.

### 1.4 Navigating Logically

Navigate based on conditions, like after form submission or auth checks.

Example: In a login form (we'll tie this to forms next), redirect on success.

In `Login.js` (full example below):

```jsx
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login logic
    const isLoggedIn = true; // Replace with real auth

    if (isLoggedIn) {
      navigate("/dashboard", { replace: true }); // replace: Doesn't add to history stack
    } else {
      alert("Login failed");
    }
  };

  // ... form JSX
}

export default Login;
```

- **Logical patterns**:
  - **Success**: `navigate('/success', { state: { message: 'Saved!' } })`.
  - **Error**: `navigate(-1)` (go back) or `/error`.
  - **Conditional**: `if (user.role === 'admin') navigate('/admin'); else navigate('/user');`.
- **Options**:
  - `replace: true`: Replaces current entry in history (good for redirects).
  - `state`: As shown above.

## Part 2: React Form Handling

Forms in React use **controlled components**: Manage state with `useState` for inputs, handle changes, and submit.

### 2.1 Basic Controlled Form

In `EditUser.js` (ties into Router: editing via `/edit/:id`):

```jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Initial state (fetch from API in real app)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData); // Or API call
    // Logical navigation: Success redirect with data
    navigate(`/user/${id}`, {
      state: { updated: true, data: formData },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditUser;
```

- **Key hooks**:
  - `useState` for form state.
  - `handleChange`: Updates state on input change.
  - `handleSubmit`: Prevents default, processes data, navigates.
- **Validation**: Add checks in `handleSubmit` (e.g., `if (!formData.email) return;`).

### 2.2 Advanced: Validation & Libraries

- **Manual validation**: Use libraries like Yup or Zod for schemas.
- **Forms library**: For complex forms, use React Hook Form (`npm install react-hook-form`):

  ```jsx
  import { useForm } from "react-hook-form";

  function MyForm() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email", { required: true })} />
        {errors.email && <span>Required</span>}
        <button type="submit">Submit</button>
      </form>
    );
  }
  ```

  - Pros: Less boilerplate, built-in validation.

### 2.3 Integrating Forms with Router

- **Pre-populate**: In `EditUser`, fetch data on mount: `useEffect(() => { fetchUser(id).then(setFormData); }, [id]);`.
- **Post-submit**: Use `navigate` as shown—pass form data via state for confirmation pages.

## Exercises

1. Build a search form: Input queries URL params (`/search?q=react`) and navigate on submit.
2. Create a multi-step form: Use `useNavigate` to go between steps logically.
3. Add error handling: Redirect to `/error` on form/API failure.

## Resources

- [React Router Docs](https://reactrouter.com/en/main)
- [React Forms Guide](https://react.dev/reference/react-dom/components/input)

Practice these in a sandbox like CodeSandbox. Tomorrow: State management with Context/Zustand? Let me know! 🚀
