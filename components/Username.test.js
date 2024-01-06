import React from 'react';
import '../../mocks/matchMedia';
import { fireEvent, getByRole, render,screen } from '@testing-library/react';
import Username from './Username';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';


test('page renders successfully',()=>{
    render(
        <MemoryRouter>
            <Username />
        </MemoryRouter>
    );
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();

});

test('display username entered',()=>{
    render(
        <MemoryRouter>
            <Username />
        </MemoryRouter>
    );
    userEvent.type(screen.getByPlaceholderText("Username"),'testuser');
    expect(screen.getByPlaceholderText("Username")).toHaveValue('testuser')

});
test('should display error message when username is empty', () => {
    render(
        <MemoryRouter>
            <Username />
        </MemoryRouter>
    );
    const btn = screen.getByRole('button')
    fireEvent.click(btn)
    const errorMessage = screen.getByText('Username Required...!');
    expect(errorMessage).toBeInTheDocument();
});
    