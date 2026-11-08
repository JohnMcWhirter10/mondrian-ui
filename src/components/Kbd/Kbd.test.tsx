import { render, screen } from '@testing-library/react';
import {
  PLANE_THEMES,
  itAppliesThemeClasses,
  itForwardsRef,
  itPassesThroughAttributes,
} from '../../test-utils';
import { Kbd } from './index';

describe('Kbd', () => {
  test('renders a native kbd element', () => {
    render(<Kbd>Ctrl</Kbd>);
    const key = screen.getByText('Ctrl');
    expect(key.tagName).toBe('KBD');
    expect(key).toHaveClass('mondrian-kbd');
  });

  test('renders keys side by side', () => {
    render(
      <>
        <Kbd>Ctrl</Kbd>
        <Kbd>K</Kbd>
      </>
    );
    expect(document.querySelectorAll('kbd')).toHaveLength(2);
  });

  itForwardsRef<HTMLElement>({
    render: (ref) => <Kbd ref={ref}>Esc</Kbd>,
    tagName: 'KBD',
  });

  itPassesThroughAttributes({
    render: (props) => <Kbd {...props}>Esc</Kbd>,
  });

  itAppliesThemeClasses({
    themes: PLANE_THEMES,
    defaultTheme: 'neutral',
    render: (theme) => <Kbd theme={theme}>K</Kbd>,
    classFor: (theme) => `mondrian-kbd-${theme}`,
  });
});
