import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { getDocs, getDoc, addDoc, doc, collection, serverTimestamp, updateDoc } from "firebase/firestore"
import { firebaseDB } from '../../firebase/firebaseConfig';
import { getAuth, updateEmail } from "firebase/auth";

export const firebaseApi = createApi({
  reducerPath: 'firebaseAPI',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getRestaurants: builder.query({
      providesTags: ['restaurants', 'defaultCache'],
      async queryFn() {
        const deliveryRef = collection(firebaseDB, "restaurants");
        try {
          const querySnapshot = await getDocs(deliveryRef);
          let delivery = [];

          querySnapshot?.forEach((doc) => {
            delivery.push({
              id: doc.id,
              ...doc.data()
            });
          })
          return { data: delivery }
        } catch (error) {
          console.log(error);
          return error
        }
      }
    }),
    getRestaurantDishes: builder.query({
      providesTags: ['restaurants', 'defaultCache'],
      async queryFn(idRestaurant) {
        const deliveryRef = collection(firebaseDB, `restaurants/${idRestaurant}/dishes`);
        try {
          const querySnapshot = await getDocs(deliveryRef);
          const dishes = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          return { data: dishes }
        } catch (error) {
          console.log(error);
          return error
        }
      }
    }),
    getUserById: builder.query({
      providesTags: ['user', 'defaultCache'],
      async queryFn(id) {
        try {
          const userRef = doc(firebaseDB, `users`, id);
          const userSnapshot = await getDoc(userRef);
          const user = userSnapshot.data();
          return { data: user }
        } catch (error) {
          console.log(error);
          return error
        }
      }
    }),
    addRestaurant: builder.mutation({
      async queryFn(data) {
        try {
          await addDoc(collection(firebaseDB, `restaurants`), {
            ...data,
            timestamp: serverTimestamp(),
          });
          return { data: "ok" };
        } catch (error) {
          console.log(error);
          return error
        }
      },
      invalidatesTags: ['restaurants']
    }),
    editInfoUser: builder.mutation({
      async queryFn({ formData, key }) {
        try {
          const userRef = doc(firebaseDB, `users`, key);
          const resp = await updateDoc(userRef, formData)
          if (formData?.email) {
            const auth = getAuth();
            const user = auth.currentUser;
            const newEmail = formData.email;
            await updateEmail(user, newEmail)
          }
          return true
        } catch (error) {
          console.log(error);
          return error
        }
      },
      invalidatesTags: ['user']
    }),
    getAllOrders: builder.query({
      providesTags: ['orders', 'defaultCache'],
      async queryFn() {
        const ordersRef = collection(firebaseDB, "orders");
        try {
          const querySnapshot = await getDocs(ordersRef);
          let ordersList = [];

          querySnapshot?.forEach((doc) => {
            ordersList.push({
              id: doc.id,
              ...doc.data()
            });
          })
          return { data: ordersList }
        } catch (error) {
          console.log(error);
          return error
        }
      }
    }),
    getOrdersByUserId: builder.mutation({
      providesTags: ['ordersUser', 'defaultCache'],
      async queryFn(idUser) {
        try {
          const allOrders = await getDoc(collection(firebaseDB, `orders`));
          const userOrders = (allOrders.data).filter(element => element.clientKey == idUser);
          return "hola"
        } catch (error) {
          console.log(error);
          return error
        }
      }
    }),
  })

})

export const {
  useGetRestaurantsQuery,
  useAddRestaurantMutation,
  useGetRestaurantDishesQuery,
  useGetUserByIdQuery,
  useEditInfoUserMutation,
  useGetAllOrdersQuery,
  useGetOrdersByUserIdMutation } =
  firebaseApi

  //el getAllOrders ya funciona para recibir todas las ordenes
  //el de recibir las ordenes por id no sirve
