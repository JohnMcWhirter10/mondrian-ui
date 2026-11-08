# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.1.0] - Unreleased

First tagged version. Prepared for release; not yet published.

### Added

- Components: Button, Input, Textarea, DateField, TimeField, Checkbox, Toggle,
  RadioGroup, Select, Label, Box, Card, Alert, Badge, Accordion, Collapsible,
  Dialog, DropdownMenu, Tooltip, ScrollArea, Separator, AspectRatio, Avatar,
  Skeleton, Kbd, Heading, Text, Loader, Progress, Empty, Grid, Breadcrumb, Table.
- `ThemeProvider` with `mode` (`light`, `dark`, `system`) and `useTheme`.
- Icons: Check, Cross, Menu, Plus, Dash, Square, SquareAlert, and four arrows.
- `VisuallyHidden`, `Form`, and `DarkModeToggle` (the choice is saved, and `ThemeProvider` in `system` mode restores it).
- `DialogHeaderProps` and `DialogFooterProps` types.
- `package.json` `exports`, including `mondrian-ui/style.css`.
- GitHub Actions workflow: lint, Mondrian lint, tests, build.

### Changed

- Disabled and placeholder states no longer use opacity.
- `README.md` and `src/docs/Usage.md` match the public API.
- Every dependency is externalized from the build.
- The Mondrian linter no longer needs `chalk`, ignores comments, and accepts
  `--exit-with-error`.

### Fixed

- Login and ContactForm submit through `type="submit"`.
- Dialog no longer leaks a global `.sr-only` class.
- `ToggleProps` no longer documents `label` and `labelPosition`, which never existed.

### Removed

- The unrunnable visual regression harness and its `test:visual` scripts.
- The unused `asChild` prop on `InputProps`.
