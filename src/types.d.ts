import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// Ensure the module is treated as a module
export {};

// Add Jest DOM type declarations
import '@testing-library/jest-dom';
