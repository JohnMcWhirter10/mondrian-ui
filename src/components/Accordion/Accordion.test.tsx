import { screen, fireEvent } from '@testing-library/react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './Accordion';
import {
  PLANE_THEMES_WITH_GREEN,
  itAppliesThemeClasses,
  itForwardsRef,
  itPassesThroughAttributes,
  renderWithTheme,
} from '../../test-utils';

const renderAccordion = (props = {}) => {
  return renderWithTheme(
    <Accordion type="single" defaultValue="item-1" {...props}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Trigger 1</AccordionTrigger>
        <AccordionContent>Content 1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Trigger 2</AccordionTrigger>
        <AccordionContent>Content 2</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const accordionWith = (props: Record<string, unknown> = {}) => (
  <Accordion type="single" {...props}>
    <AccordionItem value="a">
      <AccordionTrigger>T</AccordionTrigger>
      <AccordionContent>C</AccordionContent>
    </AccordionItem>
  </Accordion>
);

describe('Accordion', () => {
  it('renders the accordion with default props', () => {
    renderAccordion();

    expect(screen.getByText('Trigger 1')).toBeInTheDocument();
    expect(screen.getByText('Trigger 2')).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeInTheDocument();

    // Content 2 should be hidden initially since we defaulted to item-1
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });

  it('applies the correct size class', () => {
    renderAccordion({ size: 'sm' });

    const accordion = document.querySelector('.mondrian-accordion');
    expect(accordion).toHaveClass('mondrian-accordion-sm');
  });

  it('toggles content when trigger is clicked', () => {
    renderAccordion();

    // Initially item-1 is open
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

    // Click on trigger 2
    fireEvent.click(screen.getByText('Trigger 2'));

    // Now item-2 should be open and item-1 closed
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('supports multiple type accordion', () => {
    renderAccordion({
      type: 'multiple',
      defaultValue: ['item-1'],
    });

    // Initially only item-1 is open
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

    // Click on trigger 2
    fireEvent.click(screen.getByText('Trigger 2'));

    // Now both item-1 and item-2 should be open
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('has no accessibility violations', () => {
    renderAccordion();

    // Radix renders open panels as labelled regions
    const panel = screen.getByText('Content 1').closest('[role="region"]');
    expect(panel).toHaveAttribute('aria-labelledby');

    const triggers = document.querySelectorAll('.mondrian-accordion-trigger');
    triggers.forEach((trigger) => {
      expect(trigger).toHaveAttribute('aria-expanded');
    });
  });

  itAppliesThemeClasses({
    themes: PLANE_THEMES_WITH_GREEN,
    defaultTheme: 'blue',
    render: (theme) => accordionWith({ theme }),
    classFor: (theme) => theme,
  });

  itForwardsRef<HTMLDivElement>({
    render: (ref) => accordionWith({ ref }),
    tagName: 'DIV',
    className: 'mondrian-accordion',
  });

  itPassesThroughAttributes({
    render: (props) => accordionWith(props),
  });

  it('updates aria-expanded and keeps the glyph decorative', () => {
    renderAccordion();
    const trigger = screen.getByRole('button', { name: 'Trigger 2' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger).toHaveAttribute('data-state', 'open');
    const glyph = trigger.querySelector('.mondrian-accordion-icon');
    expect(glyph).toHaveAttribute('aria-hidden', 'true');
    expect(glyph).toBeEmptyDOMElement();
  });
});
