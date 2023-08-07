import React from 'react';
import { render, screen, waitFor, fireEvent } from "@testing-library/react-native";
import App from './App';

describe('App', () => {
  beforeEach(() => {
    // Mock the fetch API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          {
            id: 1,
            first_name: 'Kelli',
            last_name: 'Lakin',
            address: '8637 Farrell Wells',
            job_title: 'Global Applications Analyst',
            personal_details: {
              date_of_birth: '2024-03-12T22:42:08.884Z',
              IBAN: 'PL59345071260900752743001389'
            }
          },
          {
            id: 2,
            first_name: 'Brady',
            last_name: 'Crona',
            address: '7568 Treva Crossing',
            job_title: 'Customer Metrics Producer',
            personal_details: {
              date_of_birth: '2023-09-22T16:16:21.626Z',
              IBAN: 'TR617817159316755068307188'
            }
          },
        ])
      })
    );
  });

  it('renders loading state initially', async () => {
    render(<App />);

    expect(screen.getByText('Loading...')).toBeInTheDocument;

    await waitFor(() => {
      expect(screen.getByText('Employee List')).toBeInTheDocument;
    });
  });

  it('renders employee list after data is fetched', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Employee List')).toBeInTheDocument;
    });

      expect(screen.getByText(`Name: Kelli Lakin`)).toBeInTheDocument;
      expect(screen.getByText(`Job title: Global Applications Analyst`)).toBeInTheDocument;
      expect(screen.getByText(`Address: 8637 Farrell Wells`)).toBeInTheDocument;
      expect(screen.getByText(`DOB: 2023-09-22T16:16:21.626Z`)).toBeInTheDocument;
  });

  

  it('renders error message when there is an error in fetching data', async () => {
    // Mock the fetch API to simulate an error
    global.fetch = jest.fn(() => Promise.reject(new Error('Failed to fetch data')));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch data')).toBeInTheDocument;
    });
  });
});

