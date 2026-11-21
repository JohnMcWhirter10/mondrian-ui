import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  PLANE_THEMES_WITH_GREEN,
  itAppliesThemeClasses,
  itForwardsRef,
  itPassesThroughAttributes,
} from '../../test-utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';
import type { TabsProps } from './Tabs.types';

const renderTabs = (props: Partial<TabsProps> = {}) =>
  render(
    <Tabs defaultValue="one" {...props}>
      <TabsList aria-label="Sections">
        <TabsTrigger value="one">One</TabsTrigger>
        <TabsTrigger value="two">Two</TabsTrigger>
        <TabsTrigger value="three" disabled>
          Three
        </TabsTrigger>
      </TabsList>
      <TabsContent value="one">First panel</TabsContent>
      <TabsContent value="two">Second panel</TabsContent>
      <TabsContent value="three">Third panel</TabsContent>
    </Tabs>
  );

describe('Tabs', () => {
  it('exposes tablist, tab and tabpanel roles', () => {
    renderTabs();
    expect(screen.getByRole('tablist', { name: 'Sections' })).toBeVisible();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('First panel');
  });

  it('renders only the active panel', () => {
    renderTabs();
    expect(screen.getByText('First panel')).toBeInTheDocument();
    expect(screen.queryByText('Second panel')).not.toBeInTheDocument();
    expect(screen.queryByText('Third panel')).not.toBeInTheDocument();
  });

  it('marks the active trigger with aria-selected', () => {
    renderTabs();
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute(
      'aria-selected',
      'false'
    );
  });

  it('switches panels when a trigger is clicked', async () => {
    const user = userEvent.setup();
    renderTabs();
    await user.click(screen.getByRole('tab', { name: 'Two' }));
    expect(screen.getByText('Second panel')).toBeInTheDocument();
    expect(screen.queryByText('First panel')).not.toBeInTheDocument();
  });

  it('moves between tabs with the arrow keys and skips disabled ones', async () => {
    const user = userEvent.setup();
    renderTabs();
    await user.tab();
    expect(screen.getByRole('tab', { name: 'One' })).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'One' })).toHaveFocus();
  });

  it('does not select a disabled tab', async () => {
    const user = userEvent.setup();
    renderTabs();
    await user.click(screen.getByRole('tab', { name: 'Three' }));
    expect(screen.queryByText('Third panel')).not.toBeInTheDocument();
  });

  it('calls onValueChange', async () => {
    const user = userEvent.setup();
    const onValueChange = jest.fn();
    renderTabs({ onValueChange });
    await user.click(screen.getByRole('tab', { name: 'Two' }));
    expect(onValueChange).toHaveBeenCalledWith('two');
  });

  it('supports vertical orientation', () => {
    renderTabs({ orientation: 'vertical' });
    expect(screen.getByRole('tablist')).toHaveAttribute(
      'aria-orientation',
      'vertical'
    );
  });

  itForwardsRef<HTMLDivElement>({
    render: (ref) => (
      <Tabs ref={ref} defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
        </TabsList>
      </Tabs>
    ),
    tagName: 'DIV',
    className: 'mondrian-tabs',
  });

  itPassesThroughAttributes({
    render: (attributes) => (
      <Tabs defaultValue="a" {...attributes}>
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
        </TabsList>
      </Tabs>
    ),
  });

  itAppliesThemeClasses({
    themes: PLANE_THEMES_WITH_GREEN,
    defaultTheme: 'yellow',
    render: (theme) => (
      <Tabs defaultValue="a" theme={theme}>
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
        </TabsList>
      </Tabs>
    ),
    classFor: (theme) => `mondrian-tabs-${theme}`,
  });
});
