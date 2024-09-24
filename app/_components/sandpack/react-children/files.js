//ParentComponent.tsx
const ParentComponentTsx = `import ChildComponent from "./ChildComponent"
export default function ParentComponent() {
  return <ChildComponent />
}
`

// ChildComponent.tsx
const ChildComponentTsx = `import { useState } from "react"
import { ExpensiveComponent } from "./ExpensiveComponent"

export default function ChildComponent() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <ExpensiveComponent />
    </div>
  )
}
`

// ExpensiveComponent.tsx
const ExpensiveComponentTsx = `const fibonacci = (n) => {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

export function ExpensiveComponent() {
  const fib = fibonacci(40)
  return <h1>{fib}</h1>
}
`

// Location of file as key (always starts with /)
const files = {
  "/ParentComponent.tsx": {
    code: ParentComponentTsx
  },
  "/ChildComponent.tsx": {
    code: ChildComponentTsx
  },
  "/ExpensiveComponent.tsx": {
    code: ExpensiveComponentTsx
  }
}

export default files
