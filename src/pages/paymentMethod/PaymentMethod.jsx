import React, { useEffect, useState } from 'react'
import "./paymentMethod.scss"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deletePaymentMethods, getPaymentMethods } from '../../store/slides/user/thunk'
import Swal from 'sweetalert2'

const PaymentMethod = () => {
    const { key } = useSelector(state => state.user)
    const [methods, setMethods] = useState(null)
    const dispatch = useDispatch()
    const [change, setChange] = useState(false)

    useEffect(() => {
        paymentMethods()
    }, [change])


    const paymentMethods = async () => {
        const { data } = await dispatch(getPaymentMethods(key))
        !!data.length ? setMethods(data) : setMethods(null)
    }

    const getLastNumbers = (card) => {
        return card.slice(15, card.length)
    }

    const deleteCard = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {

            if (result.isConfirmed) {
                await dispatch(deletePaymentMethods(id,key))
                setChange(!change)
                Swal.fire(
                    'Deleted!',
                    'Your card has been deleted.',
                    'success'
                )
            }
        })

    }

    return (
        <article className="payment-method">
            <Link to={`/${key}`} className="payment-method__return">
                <img
                    src="/images/arrow-prev.svg"
                    alt="return icon"
                    className="payment-method__return--image"
                />
            </Link>
            <section className="payment-method__info-container">
                <h1 className="payment-method__title">Payment method</h1>
                <div className="payment-method__methods">
                    {
                        methods ? (
                            methods.map((method, i) => (
                                <div key={i} className="payment-method__method">
                                    <figure className="payment-method__card-info-container">
                                        <img
                                            src={`/images/${method.type}.svg`}
                                            alt={`${method.type} icon`}
                                            className="payment-method__card-icon" />
                                        <figcaption className="payment-method__card">
                                            {`**** **** **** ${getLastNumbers(method.card)}`}
                                        </figcaption>
                                    </figure>
                                    <img
                                        src="/images/delete.svg"
                                        alt="delete icon"
                                        className="payment-method__delete-icon"
                                        onClick={() => deleteCard(method.id)}
                                    />
                                </div>
                            ))
                        ) : (
                            <p className='payment-method__alert'>No tienes metodos de pagos disponibles, agrega uno</p>
                        )
                    }
                </div>
            </section>
            <button className="payment-method__add-new-card">
                <Link to="/add-new-card">
                    Add new card
                </Link>
            </button>
        </article>
    )

}

export default PaymentMethod