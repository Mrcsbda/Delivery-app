import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { getDocs, getDoc, addDoc, doc, collection, serverTimestamp } from "firebase/firestore"
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
        })
    })

})
export const { useGetRestaurantsQuery, useAddRestaurantMutation, useGetRestaurantDishesQuery, useGetUserByIdQuery} = firebaseApi