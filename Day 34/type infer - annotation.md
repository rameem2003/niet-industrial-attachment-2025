### Type Annotations and Inference in TypeScript

TypeScript's power comes from its type system, which helps prevent bugs by enforcing data shapes at compile-time. Two core mechanisms enable this: **type annotations** (explicitly declaring types) and **type inference** (TypeScript automatically deducing types). Together, they make code safer and more readable without excessive boilerplate.

Annotations are optional—TypeScript is a superset of JavaScript—so you can mix them with plain JS. Inference kicks in when you skip annotations, reducing verbosity while maintaining safety.

#### 1. Type Annotations

These are explicit declarations using the colon (`:`) syntax. They tell TypeScript exactly what type a value, parameter, or return should have. This is crucial for APIs, function signatures, and complex objects.

**Key Syntax**:

- Variables: `let variable: Type = value;`
- Functions: `function name(param: Type): ReturnType { ... }`
- Objects/Arrays: Inline types or interfaces.

**Examples**:

**Basic Primitives**:

```typescript
let age: number = 30; // Explicitly a number
let name: string = "Alice";
let isActive: boolean = true;

// TypeScript errors if mismatched, e.g., age = "thirty"; // Error!
```

**Functions**:

```typescript
function add(a: number, b: number): number {
  return a + b;
}

// Usage: add(5, 3); // OK → 8
// add("5", 3); // Error: Argument of type 'string' is not assignable to 'number'
```

**Objects and Arrays**:

```typescript
// Inline object type
let user: { name: string; age: number } = { name: "Bob", age: 25 };

// Array of strings
let hobbies: string[] = ["reading", "coding"]; // Or Array<string>

// With interfaces (reusable)
interface Person {
  name: string;
  age: number;
  greet(): string; // Method signature
}

let employee: Person = {
  name: "Carol",
  age: 35,
  greet() {
    return `Hi, I'm ${this.name}`;
  },
};
```

Annotations shine in:

- Public APIs (e.g., library functions).
- When inference might fail (e.g., ambiguous unions).

#### 2. Type Inference

TypeScript infers types based on the initial value or context, without needing `: Type`. It's "smart" and context-aware, using heuristics like:

- From assignment: `let x = 42;` → `x` is `number`.
- In loops/conditionals: Infers from iterated values.
- Contextual: In arrow functions or generics.

This keeps code concise—annotations only where needed.

**Examples**:

**Basic Inference**:

```typescript
let count = 10; // Inferred as number (not any or unknown)
count = "ten"; // Error! Type 'string' is not assignable to 'number'

// String literal inference
let message = "Hello"; // Inferred as 'Hello' (literal type, subtype of string)
```

**Functions**:

```typescript
// Parameters and return inferred from usage
const multiply = (x: number, y: number) => x * y; // Return inferred as number

// Full inference (no annotations!)
const getFullName = (first: string, last: string) => `${first} ${last}`;
// Inferred: (first: string, last: string) => string
```

**Advanced Inference**:

```typescript
// Const assertion for literals
const directions = ["up", "down"] as const; // Inferred as readonly ["up", "down"]
// Without 'as const', it's string[] (loses specificity)

// Discriminated unions (inferred from context)
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };
function area(shape: Shape) {
  switch (
    shape.kind // 'kind' inferred as "circle" | "square"
  ) {
    case "circle":
      return Math.PI * shape.radius ** 2; // 'radius' safe here
    case "square":
      return shape.side ** 2;
  }
}
```

Inference fails in edge cases (e.g., empty arrays: `let arr = [];` → `any[]`), so use `never[]` or annotations.

#### Annotations vs. Inference: When to Use What?

Use inference for internal logic to keep code clean. Annotate for clarity in shared code or when inference is weak.

| Aspect             | Type Annotations                                                    | Type Inference                                               |
| ------------------ | ------------------------------------------------------------------- | ------------------------------------------------------------ |
| **Syntax**         | Explicit (`: Type`)                                                 | Automatic (no syntax)                                        |
| **Use Case**       | Function params/returns, complex objects, APIs                      | Variables, simple expressions, internal helpers              |
| **Pros**           | Precise control, self-documenting, catches ambiguities              | Concise, reduces boilerplate, "fail-fast" on mismatches      |
| **Cons**           | Verbose if overused                                                 | Can be too loose (e.g., infers `any` in JS interop)          |
| **Error Handling** | Compile-time checks on declared types                               | Compile-time based on inferred types                         |
| **Best Practice**  | Use for public interfaces; enable `"strict": true` in tsconfig.json | Rely on it; override with `!` (non-null assertion) sparingly |

#### Tips and Best Practices

- **tsconfig.json**: Set `"strict": true` for stricter inference (e.g., no implicit `any`).
- **Union Types**: `string | number`—annotate for clarity.
- **Generics**: Inference works well: `function id<T>(arg: T): T { return arg; }` → Calls infer `T`.
- **Debugging**: Hover in VS Code for inferred types; use `typeof` for runtime checks if needed.
- **Migration**: Start with inference on JS → TS, add annotations iteratively.

For hands-on, try the TypeScript Playground (typescriptlang.org/play). If you want examples in a framework like React or deeper dives (e.g., mapped types), just ask!
