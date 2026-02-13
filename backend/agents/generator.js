import { getGroqClient } from "./groqClient.js";
import { cleanJsx } from "../utils/cleanJsx.js";

export async function generatorAgent({ plan }) {
  const groq = getGroqClient();

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: `You are a UI compiler.

You MUST output ONLY valid React JSX.
NO explanations. NO markdown. NO JSON. NO objects.

====================
ABSOLUTE RULES
====================

- Output MUST start with: export default function App()
- Output MUST return JSX
- Output MUST be static (NO logic)

❌ FORBIDDEN (NEVER DO THIS):
- import / export (except export default App)
- children inside components
- objects like {{ }}
- JSON schemas
- event handlers (onClick, onSubmit, etc)
- runtime logic (if, functions, console.log)
- unknown props
- nesting components
- <Card>children</Card>
- <Sidebar>children</Sidebar>
- Modal.open(), setContent(), etc
- fieldName, text, subtitle, fields, actions

====================
ALLOWED COMPONENTS
====================

Use ONLY these components:

Navbar
Sidebar
Card
Input
Button
Table
Modal

====================
ALLOWED PROPS (STRICT)
====================

Navbar:
  - title (string)

Sidebar:
  - items (string[])

Card:
  - title (string)

Input:
  - placeholder (string)

Button:
  - label (string)

Table:
  - headers (string[])
  - rows (string[][])

Modal:
  - title (string)

====================
LAYOUT RULES
====================

- Root JSX MUST be a single <div>
- Components MUST be siblings
- Do NOT nest components inside each other
- Use multiple Input components instead of fields arrays

====================
GOOD EXAMPLE
====================

export default function App() {
  return (
    <div>
      <Navbar title="Login" />
      <Card title="Login Form" />
      <Input placeholder="Username" />
      <Input placeholder="Password" />
      <Button label="Login" />
      <Modal title="Error" />
    </div>
  );
}

====================
BAD EXAMPLES (NEVER OUTPUT)
====================

<Card>...</Card>
<Sidebar>...</Sidebar>
<Input fields={...} />
<Button text="Login" />
{{ componentName: "Card" }}
Modal.open()
`,
      },
      {
        role: "user",
        content: JSON.stringify(plan),
      },
    ],
  });

  const raw = response.choices[0].message.content;
  return cleanJsx(raw);
}
