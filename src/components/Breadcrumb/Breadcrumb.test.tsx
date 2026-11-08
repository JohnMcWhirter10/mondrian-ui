import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './index';

const renderTrail = () =>
  render(
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator data-testid="sep" />
        <BreadcrumbItem>
          <BreadcrumbPage>Current</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

describe('Breadcrumb', () => {
  test('renders a nav with an accessible name and an ordered list', () => {
    renderTrail();

    const nav = screen.getByRole('navigation', { name: 'Breadcrumb' });
    expect(nav).toHaveClass('mondrian-breadcrumb');
    expect(screen.getByRole('list').tagName).toBe('OL');
  });

  test('allows overriding the aria-label', () => {
    render(<Breadcrumb aria-label="Trail" />);
    expect(
      screen.getByRole('navigation', { name: 'Trail' })
    ).toBeInTheDocument();
  });

  test('marks the current page with aria-current', () => {
    renderTrail();

    expect(screen.getByText('Current')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('Home')).not.toHaveAttribute('aria-current');
  });

  test('renders links as anchors', () => {
    renderTrail();

    const link = screen.getByRole('link', { name: 'Home' });
    expect(link).toHaveAttribute('href', '/');
    expect(link).toHaveClass('mondrian-breadcrumb-link');
  });

  test('separator is a hidden black rectangle, not a glyph', () => {
    renderTrail();

    const sep = screen.getByTestId('sep');
    expect(sep).toHaveClass('mondrian-breadcrumb-separator');
    expect(sep).toHaveAttribute('aria-hidden', 'true');
    expect(sep).toBeEmptyDOMElement();
  });

  test('asChild renders the passed element with link classes', () => {
    render(
      <BreadcrumbLink asChild>
        <button type="button">Custom</button>
      </BreadcrumbLink>
    );

    const el = screen.getByRole('button', { name: 'Custom' });
    expect(el).toHaveClass('mondrian-breadcrumb-link');
    expect(screen.queryByRole('link')).toBeNull();
  });

  test('forwards refs', () => {
    const navRef = React.createRef<HTMLElement>();
    const linkRef = React.createRef<HTMLAnchorElement>();
    render(
      <Breadcrumb ref={navRef}>
        <BreadcrumbLink ref={linkRef} href="/">
          Home
        </BreadcrumbLink>
      </Breadcrumb>
    );

    expect(navRef.current?.tagName).toBe('NAV');
    expect(linkRef.current?.tagName).toBe('A');
  });

  test('current page is a non-link with aria-current and its own class', () => {
    renderTrail();
    const page = screen.getByText('Current');
    expect(page).toHaveClass('mondrian-breadcrumb-page');
    expect(page.tagName).toBe('SPAN');
    expect(screen.queryByRole('link', { name: 'Current' })).toBeNull();
  });
});
