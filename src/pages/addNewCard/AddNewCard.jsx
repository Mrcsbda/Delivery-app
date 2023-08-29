import React from 'react'
import "./addNewCard.scss"
import InputMask from 'react-input-mask';
import { Link } from 'react-router-dom';

const AddNewCard = () => {
    return (
        <article className="add-new-card">
            <Link to="/payment-methods">
                <img
                    src="/images/arrow-prev.svg"
                    alt="return icon"
                    className="add-new-card__return"
                />
            </Link>
            <form className="add-new-card__form">
                <div className="add-new-card__form-container">
                    <h1 className="add-new-card__title">Add new card</h1>
                    <input type="text" placeholder='Card name' className="add-new-card__input" />
                    <InputMask mask="9999 9999 9999 9999" placeholder='Card number' className="add-new-card__input" />
                    <div className="add-new-card__inputs-container">
                        <InputMask mask="99/99" placeholder='MM/YY' className="add-new-card__input" />
                        <InputMask mask="9999" placeholder='CVV' className="add-new-card__input" />
                    </div>
                </div>
                <button type="submit" className="add-new-card__btn-save">Save</button>
            </form>
        </article>
    )
}

export default AddNewCard