import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';
import axios from "axios";

describe('Home page', () => {
  test('renders country names', async (object: T, method: M) => {
        const mockResponse = [
          {
            name: {common: 'Country 1'},
            region: 'America',
            flags: {png: 'image.png'}
          },
          {
            name: {common: 'Country 2'},
            region: 'Europe',
            flags: {png: 'image.png'}
          },
          // Agrega más datos de ejemplo según sea necesario
        ];

        jest.spyOn(axios, 'get')
            .mockResolvedValue({data: mockResponse});

        render(<Home/>);

        const countryNames = await screen.findAllByText(/Country/);

        expect(countryNames)
            .toHaveLength(mockResponse.length);
    }, 50000);
});
