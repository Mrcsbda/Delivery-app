import React from 'react';
import { render, screen, fireEvent,  waitFor  } from '@testing-library/react';
import NewOrder from './main.jsx';
import './main.scss'
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store.js'
import '@testing-library/jest-dom';

//Prueba de renderizado inciial
test('Renderizado inicial de NewOrder', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <NewOrder />
      </MemoryRouter>
    </Provider>
  );

  const titleElement = screen.getByText('New order');
  const payment = screen.getByText('Payment')
  expect(titleElement).toBeInTheDocument();
  expect(payment).toBeInTheDocument()
});


//Cambios de paymentMeth
test('cambia el estado paymentMeth al hacer clic en las opciones de pago', () => {
  render( 
    <Provider store={store}> 
  <MemoryRouter>
    <NewOrder />
  </MemoryRouter>
  </Provider>);
  // Verificamos que el estado inicial sea "cash"
  const paymentMethodText = screen.getByText('Payment');
  const masterCard = screen.getByRole('master')
  const visa = screen.getByRole('visa');
  const cash = screen.getByRole('cash')
  expect(paymentMethodText).toBeInTheDocument();
  expect(cash).toHaveClass('selected');
  expect(masterCard).not.toHaveClass('selected');
  expect(visa).not.toHaveClass('selected');
  // Hacemos clic en "Master Card"
  fireEvent.click(masterCard);
  // Verificamos que el estado se haya actualizado correctamente
  expect(cash).not.toHaveClass('selected');
  expect(masterCard).toHaveClass('selected');
  expect(visa).not.toHaveClass('selected');


  //Prueba unitaria visa
  fireEvent.click(visa);
  expect(cash).not.toHaveClass('selected');
  expect(masterCard).not.toHaveClass('selected');
  expect(visa).toHaveClass('selected');

  // Prueba unitaria cash
  fireEvent.click(cash);
  expect(cash).toHaveClass('selected');
  expect(masterCard).not.toHaveClass('selected');
  expect(visa).not.toHaveClass('selected');

});



test('Cambio de dirección de entrega', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <NewOrder />
      </MemoryRouter>
    </Provider>
  );
  const editAddressButton = screen.getByRole('editLocation');
  fireEvent.click(editAddressButton);

  await waitFor(() => {
    expect(window.location.pathname).toBe('/'); // Reemplaza con la URL correcta
  });

});

test('Prueba de nota de pedido', () => {
  render(
    <Provider store={store}>
    <MemoryRouter>
      <NewOrder />
    </MemoryRouter>
  </Provider>
  );
  const noteInput = screen.getByPlaceholderText('Write something'); 
  fireEvent.change(noteInput, { target: { value: 'Esta es una nota de prueba' } });
  expect(noteInput).toHaveValue('Esta es una nota de prueba');
});


// test('actualiza la cantidad de productos al hacer clic en los botones + y -', async () => {
//   const initialState = {
//     cart:{
//       orders: [
//         { additions: [],
//           idRestaurant:"AJ9SRg9aoXXEPLnjhBgk",
//           dish: 'Sample Dish',
//           quantity: 1,
//           price: 5.99,
//           basePrice:5.99,
//         },
//       ],
//       totalPrice: 5.99
//     }


  
//   };

//   // Renderiza el componente con el estado inicial simulado
//   render(
//     <Provider store={store}>
//       <MemoryRouter>
//         <NewOrder />
//       </MemoryRouter>
//     </Provider>,
//     { initialState }
//   );

//   const increaseButton = await screen.findByRole('increaseBtn'); 
//   const decreaseButton = await screen.findByRole('decrease'); 
//   const value = await screen.findByRole('value_quantity'); 
  
//   expect(value).toHaveTextContent(1);

//   // Test unitario del + (+)
//   fireEvent.click(increaseButton);
//   expect(value).toHaveTextContent(2);

//   // Test unitario del -
//   fireEvent.click(decreaseButton);
//   expect(value).toHaveTextContent(1);
// });