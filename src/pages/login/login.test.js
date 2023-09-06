import React from 'react';
import { render, screen, fireEvent,  waitFor  } from '@testing-library/react';
import Login from './Login.jsx';
import './main.scss'
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store.js'
import '@testing-library/jest-dom';

//Prueba de renderizado inciial
test('Renderizado inicial de Login', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );

  const titleElement = screen.getByRole('Login');
  const Google = screen.getByText('Google')
  expect(titleElement).toBeInTheDocument();
  expect(Google).toBeInTheDocument()
});
