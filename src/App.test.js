import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
const temp = [
  { 's.no': 0, 'amt.pledged': 15823, 'percentage.funded': 186 },
  { 's.no': 1, 'amt.pledged': 6859, 'percentage.funded': 8 },
  { 's.no': 2, 'amt.pledged': 10500, 'percentage.funded': 55 },
  { 's.no': 3, 'amt.pledged': 9200, 'percentage.funded': 75 },
  { 's.no': 4, 'amt.pledged': 12000, 'percentage.funded': 95 },
  { 's.no': 5, 'amt.pledged': 8000, 'percentage.funded': 45 },
  { 's.no': 6, 'amt.pledged': 11500, 'percentage.funded': 85 },
  { 's.no': 7, 'amt.pledged': 13000, 'percentage.funded': 98 },
  { 's.no': 8, 'amt.pledged': 15000, 'percentage.funded': 50 },
  { 's.no': 9, 'amt.pledged': 11000, 'percentage.funded': 63 },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ projects: temp }),
  })
);

describe('Pagination and Serial Number Tests', () => {
  test('Serial numbers start from 0 and increment correctly', async () => {
    render(<App />);

    const rows = await screen.findAllByRole('row');
    expect(rows[1].children[0].textContent).toBe('0');
    expect(rows[2].children[0].textContent).toBe('1');
    expect(rows[3].children[0].textContent).toBe('2');
    expect(rows[4].children[0].textContent).toBe('3');
    expect(rows[5].children[0].textContent).toBe('4');
  });

  test(' Next and Previous buttons', async () => {
    render(<App />);

    const nextButtons = screen.getByText('Next');
    const rows = await screen.findAllByRole('row');

    expect(rows[1].children[0].textContent).toBe('0');
    fireEvent.click(nextButtons);

    const rowsAfterNext = await screen.findAllByRole('row');
    expect(rowsAfterNext[1].children[0].textContent).toBe('5');

    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);
    const rowsAfterPrev = await screen.findAllByRole('row');
    expect(rowsAfterPrev[1].children[0].textContent).toBe('0');
  });

  test('No projects to display when there is no data', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ projects: [] }),
      })
    );

    render(<App />);

    expect(screen.getByText('No projects to display')).toBeInTheDocument();
  });
});
