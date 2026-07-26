import { Children, type ReactNode } from 'react';

const textOf = (node: ReactNode): string => {
  return Children.toArray(node)
    .map((child) =>
      typeof child === 'string' || typeof child === 'number'
        ? String(child)
        : ''
    )
    .join('')
    .trim();
};

export { textOf };
