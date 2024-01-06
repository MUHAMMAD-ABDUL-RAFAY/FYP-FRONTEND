import React from 'react';
import '../../mocks/matchMedia';
import { fireEvent, getByRole, render,screen } from '@testing-library/react';
import Register from './Register';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';


test('registration page renders successfully',()=>{
    render(
        <MemoryRouter>
            <Register />
        </MemoryRouter>
    );
    expect(screen.getAllByText("Register")[0]).toBeInTheDocument();
    expect(screen.getByText("Happy to join you!")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email*")).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username*')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password*')).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

test('display required message when field is empty', () => {
  render(
      <MemoryRouter>
          <Register />
      </MemoryRouter>
  );
  const btn = screen.getByRole('button')
  fireEvent.click(btn)
  const EmailErrorMessage = screen.getByText('Email Required...!');
  const UserErrorMessage = screen.getByText('Username Required...!');
  const PwdErrorMessage = screen.getByText('Password Required...!');
  expect(EmailErrorMessage || UserErrorMessage || PwdErrorMessage).toBeInTheDocument();
});