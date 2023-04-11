// Create a mock function or spy for the function in the other file
import React from 'react';
import { render, fireEvent,screen } from '@testing-library/react';
import Bisection from './bisection'; // Import the component file that contains the showX function

test('showX updates state correctly', () => {
  // Set up any mock dependencies or initial state variables as needed
  const mockApi = [
    { value: 1, xl: 1.5, xr: 2, label: '(x^4)-13' },
  ];

  // Render the component and get access to the showX function
  const { container } = render(<Bisection />); // Replace with your component name
  const equation = screen.getByTestId('equation')
  const xl = screen.getByTestId('xl')
  const xr = screen.getByTestId('xr')
  const ans = screen.getByTestId('ans')
  const button = screen.getByTestId('button')
  

  // Call the showX function with the desired input value
  fireEvent.change(equation, { target: { value: mockApi[0].label } });
  fireEvent.change(xl, { target: { value: mockApi[0].xl } });
  fireEvent.change(xr, { target: { value: mockApi[0].xr } });
  fireEvent.click(button);
  console.log(ans.textContent);
  expect(ans.textContent).toBe("Ans = 1.898829")

  // Assert the expected behavior of the showX function
  // expect(mockApi[0].xl).toEqual('xl1');
  // expect(mockApi[0].xr).toEqual('xr1');
  // expect(mockApi[0].label).toEqual('label1');
  // Add more assertions as needed for other expected changes in state or function calls
});
