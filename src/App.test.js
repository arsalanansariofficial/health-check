import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

/*
  Test to render a div element
  Created By- Arsalan Ansari
 */

test('Renders div element', () => {
  render(<div>Hello World</div>);
  const div = screen.getByText("Hello World", {exact: true});
  expect(div).toBeInTheDocument();
});
