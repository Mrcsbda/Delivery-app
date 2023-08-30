import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { getDocs, getDoc, addDoc, doc, collection, serverTimestamp, updateDoc } from "firebase/firestore"
import { firebaseDB } from '../../firebase/firebaseConfig';

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
          return true
        } catch (error) {
          console.log(error);
          return error
        }
      },
      invalidatesTags: ['user']
    }),
    getUserOrderById: builder.query({
      providesTags: ['orders', 'defaultCache'],
      async queryFn(id) {

        try {
          const queryRef = doc(firebaseDB, 'orders');
          const queryOrders = await getDocs(queryRef);
          const allOrders = queryOrders.data();
          //let ordersList = queryOrders.filter((doc) => doc.clientKey == id)
          return { data: allOrders }
        } catch (error) {
          console.log(error);
          return error
        }
      }
    }),
    getRestaurantDishesAll: builder.mutation({
      providesTags: ['orders', 'defaultCache'],
      async queryFn(idUser) {
        try {
          const allOrders = await getDoc(collection(firebaseDB, `orders`));
          console.log(allOrders);
          const userOrders = (allOrders.data).filter(element => element.clientKey == idUser);
          return { userOrders }
        } catch (error) {
          console.log(error);
          return error
        }
      }
    }),

  })

})
export const { useGetRestaurantsQuery, useAddRestaurantMutation, useGetRestaurantDishesQuery, useGetUserByIdQuery, useEditInfoUserMutation, useGetUserOrderByIdQuery, useGetRestaurantDishesAllMutation } = firebaseApi