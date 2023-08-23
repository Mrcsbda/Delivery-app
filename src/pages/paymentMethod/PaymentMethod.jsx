import React from 'react'
import "./paymentMethod.scss"

const PaymentMethod = () => {

    const methods = [
        {
            card: "1234 1234 1234 1234",
            type: "visa"
        },
        {
            card: "1234 1234 1234 1234",
            type: "mastercard"
        },
        {
            card: "1234 1234 1234 1234",
            type: "amex"
        }
    ]
    return (
        <article className="payment-method">
            <img
                src="/images/arrow-prev.svg"
                alt="return icon"
                className="payment-method__return"
            />
            <section className="payment-method__info-container">
                <h1 className="payment-method__title">Payment method</h1>
                <div className="payment-method__methods">
                    {
                        methods.map((method, i) => (
                            <div key={i} className="payment-method__method">
                                <figure className="payment-method__card-info-container">
                                    <img
                                        src={`/images/${method.type}.svg`}
                                        alt={`${method.type} icon`}
                                        className="payment-method__card-icon" />
                                    <figcaption className="payment-method__card">{method.card}</figcaption>
                                </figure>
                                <img src="/images/delete.svg" alt="" className="payment-method__delete-icon" />
                            </div>
                        ))
                    }
                </div>
            </section>
            <button className="payment-method__add-new-card">Add new card</button>
        </article>
    )

}

export default PaymentMethod