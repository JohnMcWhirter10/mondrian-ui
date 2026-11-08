# Mondrian UI

A React component library styled after Piet Mondrian's neoplasticism: primary colors, black grid lines, and rectangular planes. Built on Radix UI primitives for accessibility.

## Installation

```bash
npm install mondrian-ui react react-dom
```

`react` and `react-dom` (18+) are peer dependencies. The Radix UI packages the components use are regular dependencies of `mondrian-ui` and install with it.

## Quick Start

Import the stylesheet once, and wrap your app in `ThemeProvider`. Every component reads its colors from it.

```jsx
import 'mondrian-ui/style.css';
import { ThemeProvider, Button, Input, Label, Checkbox } from 'mondrian-ui';

function App() {
  return (
    <ThemeProvider>
      <Label htmlFor="username">Username</Label>
      <Input id="username" placeholder="Enter your username" />

      <Checkbox id="remember" defaultChecked />
      <Label htmlFor="remember">Remember me</Label>

      <Button theme="blue">Sign in</Button>
    </ThemeProvider>
  );
}
```

Components never render their own labels. Put a `Label` beside the control and connect them with `htmlFor` and the control's `id`. Components do not generate ids.

## Components

Exported from `mondrian-ui`:

- **Actions and inputs:** `Button`, `Input`, `Textarea`, `DateField`, `TimeField`, `Checkbox`, `Toggle`, `RadioGroup`, `RadioItem`, `Select` parts, `Label`
- **Overlays and menus:** `Dialog` parts (including `DialogHeader`, `DialogFooter`), `DropdownMenu` parts, `Tooltip` parts
- **Disclosure:** `Accordion` parts, `Collapsible` parts
- **Layout and surfaces:** `Box`, `Card` parts, `Grid`, `GridItem`, `Separator`, `AspectRatio`, `ScrollArea`, `Empty` parts, `Table` parts
- **Feedback:** `Alert` parts, `Badge`, `Loader`, `Progress`, `Skeleton`
- **Content:** `Heading`, `Text`, `Kbd`, `Avatar` parts, `Breadcrumb` parts
- **Accessibility:** `VisuallyHidden`
- **Icons:** `Square`, `SquareAlert`, `Plus`, `Dash`, `Check`, `Cross`, `Menu`, and the four `Mondrian*Arrow` icons

Each component's props are documented in Storybook (`npm run storybook`).

### Button

```jsx
<Button theme="blue" size="default">Blue</Button>
<Button theme="neutral" size="sm">Small neutral</Button>
<Button theme="red">Red</Button>

// Render your own element with asChild
<Button asChild>
  <a href="/dashboard">Dashboard</a>
</Button>
```

### Input, Textarea, and Label

```jsx
<Label htmlFor="email">Email</Label>
<Input id="email" type="email" placeholder="you@example.com" />

<Label htmlFor="message">Message</Label>
<Textarea id="message" rows={4} />
```

### Checkbox and RadioGroup

```jsx
<Checkbox id="terms" />
<Label htmlFor="terms">Accept terms</Label>

<Checkbox id="some" checked="indeterminate" />
<Label htmlFor="some">Some options</Label>

<RadioGroup defaultValue="a">
  <RadioItem id="a" value="a" />
  <Label htmlFor="a">Option A</Label>
  <RadioItem id="b" value="b" />
  <Label htmlFor="b">Option B</Label>
</RadioGroup>
```

### Theme names

| Theme     | Plane                      | Usage                         |
| --------- | -------------------------- | ----------------------------- |
| `blue`    | Primary blue               | Default, primary actions      |
| `neutral` | Background and text colors | Secondary actions, forms      |
| `red`     | Primary red                | Warnings, destructive actions |
| `green`   | Success green              | Confirmations, success states |
| `yellow`  | Primary yellow             | Highlights, attention         |

## Dark Mode

`ThemeProvider` takes a `mode` prop: `'system'` (default, follows the OS), `'light'`, or `'dark'`. Changing the prop switches modes at runtime.

```jsx
<ThemeProvider mode="dark">
  <App />
</ThemeProvider>
```

Use `useTheme()` inside the provider to read the current mode.

There is no dark mode toggle component. Build one with your own control, and pass its value to `mode`.

## Styling

Components expose no `className` prop. Appearance is set only through the `theme` and `size` props, so the Mondrian rules hold everywhere. Read `src/docs/MONDRIAN_COMPONENT_GUIDELINES.md` for the rules.

## Linter Tool

A CSS linter checks the components against the Mondrian rules:

```bash
npm run lint:mondrian
npm run lint:mondrian:ci   # exits non-zero on violations
```

## License

MIT
