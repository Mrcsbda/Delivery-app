import { createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react';
import {getDocs, addDoc, doc, collection, serverTimestamp} from "firebase/firestore"
import { firebaseDB } from '../../firebaseConfig';


export const firebaseApi = createApi({
   reducerPath: 'firebaseAPI',
   baseQuery: fakeBaseQuery(),
   endpoints: (builder) => ({
    getUsers: builder.query({
        providesTags: ['users', 'defaultCache'],
        async queryFn() {
                const deliveryRef = collection(firebaseDB, "users");
         try{
               const querySnapshot = await getDocs(deliveryRef);
                let delivery = [];

                querySnapshot?.forEach((doc)=>{
                    delivery.push({
                        id: doc.id,
                        ...doc.data()
                    });
                })
            return { data: delivery}
            }catch(error){
                console.log(error);
                return error
            }
        }
    }),
    getRestaurants: builder.query({
        providesTags: ['restaurants', 'defaultCache'],
        async queryFn() {
                const deliveryRef = collection(firebaseDB, "restaurants");
         try{
               const querySnapshot = await getDocs(deliveryRef);
                let delivery = [];

                querySnapshot?.forEach((doc)=>{
                    delivery.push({
                        id: doc.id,
                        ...doc.data()
                    });
                })
            return { data: delivery}
            }catch(error){
                console.log(error);
                return error
            }
        }
    }),
    getOrders: builder.query({
        providesTags: ['orders', 'defaultCache'],
        async queryFn() {
                const deliveryRef = collection(firebaseDB, "orders");
         try{
               const querySnapshot = await getDocs(deliveryRef);
                let delivery = [];

                querySnapshot?.forEach((doc)=>{
                    delivery.push({
                        id: doc.id,
                        ...doc.data()
                    });
                })
            return { data: delivery}
            }catch(error){
                console.log(error);
                return error
            }
        }
    }),
    addRestaurant: builder.mutation({
        async queryFn(data){
            try {
                await addDoc(collection(firebaseDB, `restaurants`), {
                    ...data,
                    timestamp: serverTimestamp(),
                });
                return {data: "ok"};
            }catch(error){
                console.log(error);
                return error
            }
        },
        invalidatesTags: ['restaurants']
    })
   })
       
 })
export const {useGetRestaurantsQuery, useAddRestaurantMutation, useGetUsersQuery, useGetOrdersQuery} = firebaseApi