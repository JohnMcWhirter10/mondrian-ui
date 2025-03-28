'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronRight } from '../icons';
import {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
} from './Accordion.types';
import './Accordion.css';

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(
  (
    {
      children,
      theme = 'blue',
      size = 'default',
      collapsible = true,
      ...props
    },
    ref
  ) => {
    const accordionClassName = [
      'mondrian-accordion',
      theme,
      size === 'sm' ? 'mondrian-accordion-sm' : '',
      size === 'lg' ? 'mondrian-accordion-lg' : '',
    ]
      .filter(Boolean)
      .join(' ');

    // Ensure collapsible prop is passed to RadixUI Accordion when type is 'single'
    const accordionProps = {
      ...props,
      // Only add collapsible when type is single or not specified (defaults to single)
      ...(props.type !== 'multiple' && { collapsible }),
    };

    return (
      <AccordionPrimitive.Root
        className={accordionClassName}
        ref={ref}
        {...(accordionProps as any)}
      >
        {children}
      </AccordionPrimitive.Root>
    );
  }
);
Accordion.displayName = 'Accordion';

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ children, ...props }, ref) => (
  <AccordionPrimitive.Item
    className="mondrian-accordion-item"
    ref={ref}
    {...props}
  >
    {children}
  </AccordionPrimitive.Item>
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ children, ...props }, ref) => (
  <AccordionPrimitive.Header className="mondrian-accordion-header">
    <AccordionPrimitive.Trigger
      className="mondrian-accordion-trigger"
      ref={ref}
      {...props}
    >
      <ChevronRight className="mondrian-accordion-icon" />
      <span className="mondrian-accordion-trigger-text">{children}</span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ children, ...props }, ref) => (
  <AccordionPrimitive.Content
    className="mondrian-accordion-content"
    ref={ref}
    {...props}
  >
    <div className="mondrian-accordion-content-inner">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
