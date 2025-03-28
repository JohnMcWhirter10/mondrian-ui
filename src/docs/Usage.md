# Mondrian UI Component Usage

Mondrian UI is a React component library built with a distinctive style inspired by Piet Mondrian's work, characterized by primary colors, bold lines, and geometric shapes. The components are built using Radix UI primitives for enhanced accessibility and component composition.

## Installation

```bash
npm install mondrian-ui
```

Additionally, you need to install the peer dependencies:

```bash
npm install react react-dom @radix-ui/react-slot @radix-ui/react-checkbox
```

## Button Component

The Button component has been enhanced with the asChild pattern from Radix UI, allowing you to compose it with other components.

### Basic Usage

```jsx
import { Button } from 'mondrian-ui';

function App() {
  return (
    <Button theme="blue" onClick={() => console.log('Clicked!')}>
      Click Me
    </Button>
  );
}
```

### Size Variants

```jsx
<Button size="default">Default Size</Button>
<Button size="sm">Small Button</Button>
<Button size="lg">Large Button</Button>
```

### Theme Variants

```jsx
<Button theme="blue">Blue</Button>
<Button theme="neutral">Neutral</Button>
<Button theme="contrast">Contrast</Button>
<Button theme="red">Red</Button>
<Button theme="green">Green</Button>
<Button theme="yellow">Yellow</Button>
```

### Polymorphic Usage (asChild)

```jsx
import { Button } from 'mondrian-ui';
import { Link } from 'react-router-dom';

function App() {
  return (
    <Button asChild>
      <Link to="/dashboard">Go to Dashboard</Link>
    </Button>
  );
}
```

## Input Component

The Input component supports labels and different themes.

### Basic Usage

```jsx
import { Input } from 'mondrian-ui';

function App() {
  return (
    <Input
      label="Email"
      placeholder="Enter your email"
      type="email"
      onChange={(e) => console.log(e.target.value)}
    />
  );
}
```

### Size Variants

```jsx
<Input label="Default" size="default" />
<Input label="Small" size="sm" />
<Input label="Large" size="lg" />
```

### Using with Form Libraries

```jsx
import { Input } from 'mondrian-ui';
import { useForm } from 'react-hook-form';

function MyForm() {
  const { register } = useForm();

  return (
    <form>
      <Input label="Username" {...register('username')} />
    </form>
  );
}
```

## Checkbox Component

The Checkbox component is built on top of Radix UI's Checkbox primitive for enhanced accessibility.

### Basic Usage

```jsx
import { Checkbox } from 'mondrian-ui';

function App() {
  return (
    <Checkbox
      label="Accept terms and conditions"
      onChange={(e) => console.log(e.target.checked)}
    />
  );
}
```

### Controlled Usage

```jsx
import { Checkbox } from 'mondrian-ui';
import { useState } from 'react';

function App() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      label="Remember me"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}
```

### Indeterminate State

```jsx
import { Checkbox } from 'mondrian-ui';

function App() {
  return <Checkbox checked="indeterminate" label="Select some options" />;
}
```

## Styling

All components come with Mondrian-inspired styling by default. The styling can be further customized with the `className` prop.

```jsx
<Button className="my-custom-button">Custom Button</Button>
```

## Using with Ref

All components use React's forwardRef, allowing you to access the underlying DOM elements.

```jsx
import { Button } from 'mondrian-ui';
import { useRef } from 'react';

function App() {
  const buttonRef = useRef(null);

  return (
    <Button ref={buttonRef} onClick={() => buttonRef.current.focus()}>
      Focus Me
    </Button>
  );
}
```
