import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '../../themes';
import { Button } from '../Button/Button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './Dialog';

// Define the component metadata for Storybook
const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
          The Dialog component follows Mondrian's neoplasticism principles with rectangular shapes,
          strong grid lines, and primary colors. It provides a modal interface for displaying content
          that requires user attention or interaction.
          
          You can use the DialogTrigger in two ways:
          - With \`asChild\` prop to use a Button component (recommended for complex triggers)
          - Without \`asChild\` to use the built-in button styling (convenient for simple cases)
          
          Note: Always use \`<DialogClose>\` to wrap buttons that should close the dialog, like Cancel or Close buttons.
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

// Base Dialog example
export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a description of the dialog content. It provides context for
            the user.
          </DialogDescription>
        </DialogHeader>
        <p>Dialog content goes here. This can contain any React component.</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button theme="neutral">Cancel</Button>
          </DialogClose>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Example of trigger usage patterns
export const TriggerUsage: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
      <div>
        <h3>Using with asChild + Button</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog with Button</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Using asChild + Button</DialogTitle>
              <DialogDescription>
                This approach is recommended for complex triggers or when you
                need more control.
              </DialogDescription>
            </DialogHeader>
            <p>
              Using the asChild prop with Button allows for more customization
              and better component composition.
            </p>
            <DialogFooter>
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <h3>Using DialogTrigger Directly</h3>
        <Dialog>
          <DialogTrigger>Open Dialog (Built-in Styling)</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Using DialogTrigger Directly</DialogTitle>
              <DialogDescription>
                DialogTrigger now has built-in button styling for convenience.
              </DialogDescription>
            </DialogHeader>
            <p>
              This approach is simpler and requires less code for basic use
              cases.
            </p>
            <DialogFooter>
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <h3>DialogTrigger Themes</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <Dialog>
            <DialogTrigger theme="blue">Blue</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Blue Theme Trigger</DialogTitle>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger theme="neutral">Neutral</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Neutral Theme Trigger</DialogTitle>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger theme="contrast">Contrast</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Contrast Theme Trigger</DialogTitle>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger theme="red">Red</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Red Theme Trigger</DialogTitle>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <h3>DialogTrigger Sizes</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Dialog>
            <DialogTrigger size="sm">Small</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Small Size Trigger</DialogTitle>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger>Default</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Default Size Trigger</DialogTitle>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger size="lg">Large</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Large Size Trigger</DialogTitle>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  ),
};

// Theme variants
export const BlueTheme: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Blue Dialog</Button>
      </DialogTrigger>
      <DialogContent theme="blue">
        <DialogHeader>
          <DialogTitle>Blue Theme</DialogTitle>
          <DialogDescription>
            This dialog uses the blue theme variant.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button theme="neutral">Cancel</Button>
          </DialogClose>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const ErrorTheme: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button theme="red">Red Dialog</Button>
      </DialogTrigger>
      <DialogContent theme="red">
        <DialogHeader>
          <DialogTitle>Red Theme</DialogTitle>
          <DialogDescription>
            This dialog uses the red theme variant, suitable for error or
            warning messages.
          </DialogDescription>
        </DialogHeader>
        <p>
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
        <DialogFooter>
          <DialogClose asChild>
            <Button theme="neutral">Cancel</Button>
          </DialogClose>
          <Button theme="red">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const SuccessTheme: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button theme="green">Green Dialog</Button>
      </DialogTrigger>
      <DialogContent theme="green">
        <DialogHeader>
          <DialogTitle>Green Theme</DialogTitle>
          <DialogDescription>
            This dialog uses the green theme variant, suitable for success
            messages.
          </DialogDescription>
        </DialogHeader>
        <p>Your changes have been saved successfully!</p>
        <DialogFooter>
          <Button theme="green">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Size variants
export const SizeVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Small Dialog</Button>
        </DialogTrigger>
        <DialogContent size="sm">
          <DialogHeader>
            <DialogTitle>Small Dialog</DialogTitle>
            <DialogDescription>
              This dialog uses the small size variant.
            </DialogDescription>
          </DialogHeader>
          <p>Compact dialog for simple messages or confirmations.</p>
          <DialogFooter>
            <DialogClose asChild>
              <Button theme="neutral">Cancel</Button>
            </DialogClose>
            <Button>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Default Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Default Dialog</DialogTitle>
            <DialogDescription>
              This dialog uses the default size variant.
            </DialogDescription>
          </DialogHeader>
          <p>Standard dialog for most use cases.</p>
          <DialogFooter>
            <DialogClose asChild>
              <Button theme="neutral">Cancel</Button>
            </DialogClose>
            <Button>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Large Dialog</Button>
        </DialogTrigger>
        <DialogContent size="lg">
          <DialogHeader>
            <DialogTitle>Large Dialog</DialogTitle>
            <DialogDescription>
              This dialog uses the large size variant.
            </DialogDescription>
          </DialogHeader>
          <p>Spacious dialog for complex content or forms.</p>
          <DialogFooter>
            <DialogClose asChild>
              <Button theme="neutral">Cancel</Button>
            </DialogClose>
            <Button>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
};

// Example showcasing the enhanced Mondrian styling
export const MondrianStyled: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Mondrian Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mondrian's Neoplasticism</DialogTitle>
          <DialogDescription>
            This dialog showcases Piet Mondrian's neoplasticism style with its
            distinctive primary colors, black grid lines, and asymmetrical
            balance.
          </DialogDescription>
        </DialogHeader>
        <div style={{ marginBottom: '20px' }}>
          <p style={{ marginBottom: '12px' }}>
            Notice the colored accents in the header and footer, inspired by
            Mondrian's signature style using:
          </p>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Primary colors: red, blue, yellow</li>
            <li>Strong black grid lines</li>
            <li>Rectangular shapes without curves</li>
            <li>Asymmetrical balance in design elements</li>
          </ul>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button theme="neutral">Close</Button>
          </DialogClose>
          <Button theme="blue">Learn More</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Complex example with form
export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Subscribe</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Subscribe to Newsletter</DialogTitle>
          <DialogDescription>
            Enter your email to receive updates about our products and
            announcements.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // Handle form submission
          }}
        >
          <div style={{ marginBottom: '16px' }}>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 'bold',
              }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              style={{
                width: '100%',
                padding: '8px',
                border: '2px solid var(--mondrian-border)',
              }}
              required
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button theme="neutral">Close</Button>
            </DialogClose>
            <Button theme="blue">Learn More</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  ),
};
