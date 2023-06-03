import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, screen } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom';
import DashboardPage from '@/app/dashboard/page';

describe('Dashboard page', () => {
  it('should render properly', () => {
    render(<DashboardPage />);

    const header = screen.getByRole('heading');
    const headerText = 'Hello world';

    expect(header).toHaveTextContent(headerText);
  });
});
