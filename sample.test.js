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
            "id": 1,
            "first_name": "Santino",
            "last_name": "Bahringer",
            "address": "030 Eldora Motorway",
            "job_title": "Forward Infrastructure Specialist",
            "personal_details": {
            "date_of_birth": "2024-01-14T09:57:40.712Z",
            "IBAN": "GR701958007L01V858406503901"
            }
          },
          {
            "id": 2,
            "first_name": "Diana",
            "last_name": "Jakubowski",
            "address": "581 Cierra Gateway",
            "job_title": "Principal Mobility Director",
            "personal_details": {
            "date_of_birth": "2024-07-19T02:05:41.431Z",
            "IBAN": "AZ50DJUG00100700971605550100"
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

      expect(screen.getByText(`Name: Santino Bahringer`)).toBeInTheDocument;
      expect(screen.getByText(`Job title: Forward Infrastructure Specialist`)).toBeInTheDocument;
      expect(screen.getByText(`Address: 030 Eldora Motorway`)).toBeInTheDocument;
      expect(screen.getByText(`DOB: 2024-01-14T09:57:40.712Z`)).toBeInTheDocument;
  });

  
  it("filters employees by last name using search input", async () => {
    
   

    const { getByPlaceholderText, getByText } = render(<App />);
    
    await waitFor(() => {
      fireEvent.changeText(getByPlaceholderText("Search by last name"), "Jakubowski");
      expect(getByText("Name: Diana Jakubowski")).toBeTruthy();
    });

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

