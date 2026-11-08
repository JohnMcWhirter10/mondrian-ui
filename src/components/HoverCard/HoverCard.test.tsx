/** @jsxRuntime classic */
/** @jsx React.createElement */
import * as React from 'react';
import { act, fireEvent, screen } from '@testing-library/react';
import { itForwardsRef, renderWithTheme } from '../../test-utils';
import { Avatar, AvatarFallback } from '../Avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './HoverCard';

const renderCard = (rootProps = {}, contentProps = {}) =>
  renderWithTheme(
    <HoverCard {...rootProps}>
      <HoverCardTrigger href="#user">@mondrian</HoverCardTrigger>
      <HoverCardContent {...contentProps}>
        <Avatar>
          <AvatarFallback>PM</AvatarFallback>
        </Avatar>
        Piet Mondrian
      </HoverCardContent>
    </HoverCard>
  );

describe('HoverCard', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('is closed until hovered', () => {
    renderCard();
    expect(screen.queryByText('Piet Mondrian')).not.toBeInTheDocument();
  });

  it('opens only after the short default delay', () => {
    renderCard();
    fireEvent.pointerEnter(screen.getByText('@mondrian'));

    act(() => {
      jest.advanceTimersByTime(150);
    });
    expect(screen.queryByText('Piet Mondrian')).not.toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(screen.getByText('Piet Mondrian')).toBeInTheDocument();
  });

  it('honours a custom openDelay', () => {
    renderCard({ openDelay: 1000 });
    fireEvent.pointerEnter(screen.getByText('@mondrian'));
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.queryByText('Piet Mondrian')).not.toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(600);
    });
    expect(screen.getByText('Piet Mondrian')).toBeInTheDocument();
  });

  it('opens on keyboard focus', () => {
    renderCard();
    act(() => {
      screen.getByText('@mondrian').focus();
      jest.advanceTimersByTime(250);
    });
    expect(screen.getByText('Piet Mondrian')).toBeInTheDocument();
  });

  it('closes when the pointer leaves', () => {
    renderCard();
    const trigger = screen.getByText('@mondrian');
    fireEvent.pointerEnter(trigger);
    act(() => {
      jest.advanceTimersByTime(250);
    });
    expect(screen.getByText('Piet Mondrian')).toBeInTheDocument();

    fireEvent.pointerLeave(trigger);
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.queryByText('Piet Mondrian')).not.toBeInTheDocument();
  });

  it('renders the content with the Mondrian frame class and placement', () => {
    renderCard({ defaultOpen: true }, { side: 'bottom' });
    const content = document.querySelector('.mondrian-hover-card-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute('data-side', 'bottom');
    expect(screen.getByText('PM')).toBeInTheDocument();
  });

  itForwardsRef<HTMLDivElement>({
    render: (ref) => (
      <HoverCard defaultOpen>
        <HoverCardTrigger>t</HoverCardTrigger>
        <HoverCardContent ref={ref}>Body</HoverCardContent>
      </HoverCard>
    ),
    tagName: 'DIV',
    className: 'mondrian-hover-card-content',
  });
});
