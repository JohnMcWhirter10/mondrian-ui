import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  Square,
  SquareAlert,
  MondrianRightArrow,
  MondrianLeftArrow,
  MondrianUpArrow,
  MondrianDownArrow,
  Plus,
  Dash,
} from './index';

const icons = {
  Square,
  SquareAlert,
  MondrianRightArrow,
  MondrianLeftArrow,
  MondrianUpArrow,
  MondrianDownArrow,
  Plus,
  Dash,
};

describe.each(Object.entries(icons))('%s icon', (_name, Icon) => {
  test('is aria-hidden by default and not focusable', () => {
    const { container } = render(<Icon />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('focusable', 'false');
    expect(svg).not.toHaveAttribute('role');
    expect(svg?.querySelector('title')).toBeNull();
  });

  test('exposes an image with a name when title is given', () => {
    const { getByRole } = render(<Icon title="Status" />);
    const img = getByRole('img', { name: 'Status' });
    expect(img).not.toHaveAttribute('aria-hidden');
    expect(img.querySelector('title')).toHaveTextContent('Status');
  });

  test('is labelled by aria-label', () => {
    const { getByRole } = render(<Icon aria-label="Warning" />);
    expect(getByRole('img', { name: 'Warning' })).toBeInTheDocument();
  });

  test('draws with currentColor by default', () => {
    const { container } = render(<Icon />);
    const html = container.innerHTML;
    expect(html).toContain('currentColor');
    expect(html).not.toMatch(/#[0-9a-f]{3,6}/i);
  });
});
