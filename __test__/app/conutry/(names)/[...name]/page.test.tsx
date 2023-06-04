import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import Page from '@/app/country/(names)/[[...name]]/page';

jest.mock('axios');

describe('Page component', () => {
  const mockCountryData = {
    name: {
      common: 'Country Name',
      nativeName: {
        lang1: {
          official: 'Official Name 1',
          common: 'Common Name 1',
        },
        lang2: {
          official: 'Official Name 2',
          common: 'Common Name 2',
        },
      },
    },
    languages: {
      lang1: 'Language 1',
      lang2: 'Language 2',
    },
    currencies: {
      currency1: {
        name: 'Currency Name 1',
        symbol: 'Currency Symbol 1',
      },
      currency2: {
        name: 'Currency Name 2',
        symbol: 'Currency Symbol 2',
      },
    },
    tld: ['Top Level Domain'],
    capital: ['Capital'],
    subregion: 'Subregion',
    region: 'Region',
    population: 12345678,
    flags: {
      png: 'https://flagcdn.com/w320/co.png',
      svg: 'https://flagcdn.com/co.svg',
      alt: 'Flag Alt Text',
    },
  };

  it('should render the page with country details', async () => {
    useRouter.mockImplementationOnce(() => ({
      query: {
        name: 'country-name',
      },
    }));
    axios.get.mockResolvedValueOnce({ data: [mockCountryData] });

    let container;
    await act(async () => {
      const { container: renderContainer } = render(<Page />);
      container = renderContainer;
      await waitFor(() => expect(axios.get).toHaveBeenCalled());
    });

    expect(container.querySelector('img')).toHaveAttribute('src', 'https://flagcdn.com/w320/co.png');
    expect(container.querySelector('img')).toHaveAttribute('alt', 'Flag Alt Text');
    expect(container.querySelector('h1')).toHaveTextContent('Country Name');
    expect(container.querySelectorAll('p').length).toBe(9);
    expect(container.querySelectorAll('span').length).toBe(4);
  });

  it('should render "loading..." when country data is not available', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    let container;
    await act(async () => {
      const { container: renderContainer } = render(<Page params={{ name: 'country-name' }} />);
      container = renderContainer;
      await waitFor(() => expect(axios.get).toHaveBeenCalled());
    });

    expect(container.textContent).toBe('loading...');
  });

  it('should handle error when fetching country data', async () => {
    const errorMessage = 'Error fetching data';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    let consoleError;
    await act(async () => {
      console.error = jest.fn((error) => {
        consoleError = error;
      });
      render(<Page params={{ name: 'country-name' }} />);
      await waitFor(() => expect(axios.get).toHaveBeenCalled());
    });

    expect(consoleError).toEqual(new Error(errorMessage));
  });
});
