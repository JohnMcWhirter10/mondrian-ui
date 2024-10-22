# MondrianUI

**Version:** 1.0.0  
**License:** MIT  

## Description

MondrianUI is a modern and minimalist UI library designed for simplicity and elegance. It provides a set of flexible components that enable developers to create intuitive and aesthetically pleasing user interfaces with ease.

## Features

- **Minimalist Design:** Clean and simple components for a modern look.
- **Customizable Themes:** Easily set and switch themes with context-based theming.
- **Responsive Components:** All components are designed to be responsive and accessible.
- **Integration with Storybook:** Preview and test components in isolation.

## Installation

To install MondrianUI, use npm or yarn:

```bash
npm install mondrian-ui
```

or

```bash
yarn add mondrian-ui
```

## Usage

To use MondrianUI in your project, wrap your application with the `ThemeProvider` and start using the components:

```javascript
import React from 'react';
import { ThemeProvider } from 'mondrian-ui';
import Button from 'mondrian-ui/components/Button';

const App = () => {
    return (
        <ThemeProvider>
            <Button label="Primary Button" theme="primary" />
        </ThemeProvider>
    );
};

export default App;
```

## Components

- **Button**: A customizable button component with various themes.
- **[Add other components here]**: Brief descriptions and usage examples.

## Development

### Scripts

- **Start Storybook**: Run the following command to start the Storybook server:
  ```bash
  npm run storybook
  ```

- **Build Storybook**: To build the static Storybook files, use:
  ```bash
  npm run build-storybook
  ```

- **Run Tests**: Execute tests with:
  ```bash
  npm test
  ```

### Dependencies

- **React**: MondrianUI is built for React 18 and above.
- **Peer Dependencies**: Ensure that you have `react` and `react-dom` installed in your project.

### Dev Dependencies

- Jest, Storybook, Rollup, and other tools for development and testing.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
