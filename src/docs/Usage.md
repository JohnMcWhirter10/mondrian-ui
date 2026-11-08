# Mondrian UI Component Usage

Mondrian UI is a React component library styled after Piet Mondrian's neoplasticism. Components are built on Radix UI primitives. See the README for installation and the full component list.

## Setup

```bash
npm install mondrian-ui react react-dom
```

Wrap your app in `ThemeProvider`:

```jsx
import { ThemeProvider } from 'mondrian-ui';

<ThemeProvider mode="system">
  <App />
</ThemeProvider>;
```

## Rules that apply to every component

- No `className` prop. Use `theme` (`blue`, `neutral`, `red`, `green`, `yellow`) and `size` (`sm`, `default`, `lg`).
- No built-in labels. Put a `Label` next to the control and connect them with `htmlFor` and `id`.
- No generated ids. You supply every `id`.
- All components forward refs.

## Button

```jsx
import { Button } from 'mondrian-ui';

<Button theme="blue" onClick={() => console.log('Clicked')}>
  Click me
</Button>

<Button size="sm">Small</Button>
<Button size="lg" theme="red">Large red</Button>
```

Render another element with `asChild`:

```jsx
import { Link } from 'react-router-dom';

<Button asChild>
  <Link to="/dashboard">Go to dashboard</Link>
</Button>;
```

## Input and Label

```jsx
import { Input, Label } from 'mondrian-ui';

<Label htmlFor="email">Email</Label>
<Input
  id="email"
  type="email"
  placeholder="Enter your email"
  onChange={(e) => console.log(e.target.value)}
/>

<Label htmlFor="small">Small</Label>
<Input id="small" size="sm" />
```

### With form libraries

```jsx
import { Input, Label } from 'mondrian-ui';
import { useForm } from 'react-hook-form';

function MyForm() {
  const { register } = useForm();

  return (
    <form>
      <Label htmlFor="username">Username</Label>
      <Input id="username" {...register('username')} />
    </form>
  );
}
```

## Checkbox

Checkbox is built on Radix UI's Checkbox. It reports changes through `onCheckedChange`.

```jsx
import { Checkbox, Label } from 'mondrian-ui';
import { useState } from 'react';

function App() {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <Checkbox id="remember" checked={checked} onCheckedChange={setChecked} />
      <Label htmlFor="remember">Remember me</Label>
    </>
  );
}
```

Indeterminate state:

```jsx
<Checkbox id="some" checked="indeterminate" />
<Label htmlFor="some">Select some options</Label>
```

## Dark mode

`ThemeProvider` accepts `mode="light" | "dark" | "system"`. `useTheme()` reads the current mode inside the provider.

## Refs

```jsx
import { Button } from 'mondrian-ui';
import { useRef } from 'react';

function App() {
  const buttonRef = useRef(null);

  return (
    <Button ref={buttonRef} onClick={() => buttonRef.current.focus()}>
      Focus me
    </Button>
  );
}
```
