# Mondrian UI

A React component library with a style inspired by Piet Mondrian's neoplasticism, characterized by primary colors, bold lines, and geometric shapes. Built with Radix UI primitives for enhanced accessibility and composability.

## Features

- **Accessibility First**: Built on top of Radix UI primitives for excellent accessibility
- **Composable Components**: Support for the `asChild` pattern for advanced component composition
- **Mondrian-Inspired Design**: Distinctive visual style based on Piet Mondrian's art
- **Fully Typed**: Written in TypeScript with comprehensive type definitions
- **Customizable**: Easy to adapt to your project's needs
- **Dark Mode Support**: Built-in theming system that works seamlessly in both light and dark modes

## Installation

```bash
npm install mondrian-ui
```

Additionally, you need to install the peer dependencies:

```bash
npm install react react-dom @radix-ui/react-slot @radix-ui/react-checkbox
```

## Quick Start

```jsx
import { Button, Input, Checkbox } from 'mondrian-ui';

function App() {
  return (
    <div>
      <h1>Mondrian UI Example</h1>

      <Button theme="blue">Click Me</Button>

      <Input label="Username" placeholder="Enter your username" />

      <Checkbox label="Remember me" defaultChecked />
    </div>
  );
}
```

## Components

### Button

```jsx
<Button theme="blue" size="default">Blue Button</Button>
<Button theme="neutral" size="sm">Small Neutral Button</Button>
<Button theme="contrast" size="lg">Large Contrast Button</Button>
<Button theme="red">Red Button</Button>
<Button theme="green">Green Button</Button>

// Polymorphic usage with asChild
<Button asChild>
  <Link to="/dashboard">Navigate with Router</Link>
</Button>
```

### Theme System

Mondrian UI uses a semantic theme naming system that makes it easy to create consistent UI components:

#### Color Theme Names

| Theme Name | Description                        | Usage                          |
| ---------- | ---------------------------------- | ------------------------------ |
| `blue`     | Primary blue color                 | Default theme, primary actions |
| `neutral`  | Uses background/text colors        | Secondary actions, forms       |
| `contrast` | High contrast with inverted colors | For emphasis, headers          |
| `red`      | Bright red                         | Warnings, destructive actions  |
| `green`    | Success green                      | Confirmations, success states  |
| `yellow`   | Accent yellow                      | Highlights, attention          |

### Input

```jsx
<Input label="Email" placeholder="Enter your email" />
<Input label="Password" type="password" size="sm" />
<Input label="Search" size="lg" theme="neutral" />
```

### Checkbox

```jsx
<Checkbox label="Accept terms" />
<Checkbox label="Subscribe to newsletter" defaultChecked />
<Checkbox label="Indeterminate option" checked="indeterminate" />
```

### DarkModeToggle

```jsx
// Simple usage
<DarkModeToggle />

// With custom label
<DarkModeToggle label="Switch Theme" />

// Without label
<DarkModeToggle label={undefined} />
```

## Dark Mode Support

Mondrian UI includes built-in dark mode support that maintains neoplasticism principles:

```jsx
// Add the ThemeProvider to your app
import { ThemeProvider } from 'mondrian-ui';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}

// Use the DarkModeToggle component anywhere within the ThemeProvider
import { DarkModeToggle } from 'mondrian-ui';

function Header() {
  return (
    <header>
      <h1>My App</h1>
      <DarkModeToggle />
    </header>
  );
}
```

Dark mode in Mondrian UI:

- Inverts background (white to black) and text (black to white)
- Preserves primary colors (red, blue, yellow) in both modes
- Maintains black grid lines and rectangular shapes
- Ensures proper contrast and readability

## Styling

All components come with Mondrian-inspired styles by default. You can customize further with the `className` prop:

```jsx
<Button className="my-custom-button">Custom Button</Button>
```

## Mondrian UI Guidelines

All components in this library adhere to strict Mondrian neoplasticism principles:

1. **Limited Color Palette**

   - Primary: Red, Blue, Yellow
   - Structural: Black, White
   - Semantic: Success (Green)

2. **Strong Grid Structure**

   - Rectangular shapes only (no rounded corners)
   - Clear black grid lines
   - Asymmetrical balance

3. **Interactive States**
   - Transforms for movement
   - Box-shadows for depth
   - No opacity changes or blurs

For detailed guidelines, see the [Mondrian Component Guidelines](src/docs/MONDRIAN_COMPONENT_GUIDELINES.md).

### Linter Tool

This library includes a CSS linter to ensure all components adhere to Mondrian styling principles:

```bash
# Run the linter tool on all CSS files
node src/utils/mondrianLintCheck.js

# Check a specific directory
node src/utils/mondrianLintCheck.js src/components/Button
```

## About Piet Mondrian

Piet Mondrian (1872-1944) was a Dutch painter and art theoretician who is regarded as one of the greatest artists of the 20th century. He is known for being one of the pioneers of 20th-century abstract art and a leading member of the De Stijl movement.

Mondrian's work evolved from figurative painting to an increasingly abstract style, until he reached a point where his artistic vocabulary was reduced to simple geometric elements:

- Primary colors (red, blue, and yellow)
- Black grid lines
- White backgrounds
- Rectangular shapes

This library draws inspiration from Mondrian's neoplasticism style, applying these principles to UI components for a distinctive and harmonious visual design.

## License

MIT
