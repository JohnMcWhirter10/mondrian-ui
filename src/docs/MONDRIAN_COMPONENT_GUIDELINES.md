# Mondrian UI Component Development Guidelines

This document serves as a quick reference for developing components that adhere to the Mondrian UI styling principles. All components in this library must follow these guidelines to maintain visual consistency and adhere to Piet Mondrian's neoplasticism style.

## Core Principles of Mondrian Neoplasticism

1. **Limited Color Palette**

   - Use ONLY colors from `colorUtils.ts`:
     - Primary: Red (`#D42029`), Blue (`#0D47A1`), Yellow (`#FFDE03`)
     - Structural: Black (`#000000`), White (`#FFFFFF`)
     - Success: Medium Sea Green (`#3CB371`) - the only non-Mondrian color allowed for UI semantics
   - No gradients, shadows, or color variations outside this palette

2. **Strong Grid Structure**

   - Use rectangular shapes exclusively - NO rounded corners
   - Implement clear black grid lines of consistent width
   - Maintain asymmetrical balance in layouts

3. **Typographic Clarity**
   - Use clean, sans-serif fonts (Helvetica/Arial)
   - Maintain hierarchical sizing according to the defined typography scale

## CSS Implementation Requirements

1. **Variable Naming**

   - All CSS variables MUST use the `--mondrian-*` prefix
   - Example: `--mondrian-font-size-medium`, `--mondrian-spacing-large`

2. **Component Class Naming**

   - Base class must follow the pattern: `mondrian-[component-name]`
   - Variant classes must follow: `mondrian-[component-name]-[variant]`
   - Example: `.mondrian-button`, `.mondrian-button-sm`

3. **Interactive States**
   - Hover/focus states must maintain Mondrian aesthetics
   - Use transforms (slight movement) and box-shadows with BLACK only
   - No opacity changes or blurs

## Dark Mode Implementation

Dark mode in Mondrian UI maintains the same aesthetic principles while inverting key colors:

1. **Color Inversion Pattern**

   - Background transitions from White to Black
   - Text transitions from Black to White
   - Primary colors (Red, Blue, Yellow) remain the same
   - Grid lines remain Black in both modes

2. **Dark Mode CSS Implementation**

   - Use the theme context's `isDarkMode` flag to switch color variables
   - Never hardcode dark mode colors - always use CSS variables
   - Example:
     ```css
     .component {
       background-color: var(
         --mondrian-background
       ); /* White in light mode, Black in dark mode */
       color: var(
         --mondrian-text
       ); /* Black in light mode, White in dark mode */
     }
     ```

3. **Component-Specific Dark Mode Adjustments**
   - Some components may need specific dark mode adaptations
   - Always use the `.dark` theme variant for dark-specific styles
   - Ensure sufficient contrast ratios are maintained

## Semantic Color Usage

| Color  | Light Mode Usage       | Dark Mode Usage | Semantic Meaning           |
| ------ | ---------------------- | --------------- | -------------------------- |
| Red    | Error states, Emphasis | Same            | Error, Danger, Importance  |
| Blue   | Primary actions, Focus | Same            | Primary, Action, Selection |
| Yellow | Warnings, Highlights   | Same            | Warning, Attention         |
| Black  | Text, Grid lines       | Grid lines      | Structure, Definition      |
| White  | Backgrounds            | Text            | Space, Canvas              |
| Green  | Success states         | Same            | Success, Completion        |

## Component Development Checklist

Before submitting a new component or updating an existing one, verify that:

- [ ] Component uses ONLY colors from the Mondrian palette
- [ ] All CSS variables use the `--mondrian-*` prefix
- [ ] Component implements proper black grid lines using `var(--mondrian-grid-width)`
- [ ] All shapes are rectangular with NO rounded corners
- [ ] Interactive states use transforms and box-shadows (not opacity or blurs)
- [ ] Dark mode is properly supported
- [ ] Typography uses the defined font family and size variables
- [ ] Spacing uses the defined spacing variables
- [ ] Component class naming follows the `mondrian-[component-name]` pattern
- [ ] Component is consistent with at least one other existing component

## Dark Mode Testing Requirements

Each component must be tested in dark mode to ensure:

- [ ] Proper color inversion according to guidelines
- [ ] Maintained readability and contrast
- [ ] Consistent grid line implementation
- [ ] Interactive states work properly in dark mode

## Example CSS Structure

```css
.mondrian-component {
  border: var(--mondrian-grid-width) solid var(--mondrian-border);
  background-color: var(--mondrian-background);
  color: var(--mondrian-text);
  padding: var(--mondrian-spacing-medium);
  font-family: var(--mondrian-font-family);
  font-size: var(--mondrian-font-size-medium);
}

.mondrian-component:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--mondrian-shadow);
}

.mondrian-component.primary {
  background-color: var(--mondrian-blue);
  color: var(--mondrian-white);
}
```

Remember to review the full [Mondrian UI Styling Guide](../../guide.mdc) for more detailed information.
