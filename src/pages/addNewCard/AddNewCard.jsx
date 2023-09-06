import React from 'react'
import "./addNewCard.scss"
import InputMask from 'react-input-mask';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { addPaymentMethods } from '../../store/slides/user/thunk';

const AddNewCard = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { key } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const saveCard = (data) => {
        const validate = data.card.includes("_") ? false : true


        if (validate) {
            const lastNumbers = Number(data.card.slice(15, data.card.length))
            const type = validateType(lastNumbers)
            const cardInfo = {
                card: data.card,
                createdAt: new Date().getTime(),
                type,
                updatedAt: new Date().getTime(),
            }

            dispatch(addPaymentMethods(key, cardInfo))
            Swal.fire(
                'Excelent!',
                'Information saved successfully!',
                'success'
            ).then(
                () => {
                    navigate("/payment-methods")
                }
            )
        } else {
            Swal.fire(
                'Oopps!',
                'Información incompleta!',
                'error'
            )
        }
    }

    const validateType = (lastNumbers) => {
        switch (true) {
            case lastNumbers < 3333: return "visa"
            case lastNumbers >= 3333 && lastNumbers < 6666: return "mastercard"
            default: return "amex"
        }
    }

    return (
        <article className="add-new-card">
            <Link to="/payment-methods">
                <img
                    src="/images/arrow-prev.svg"
                    alt="return icon"
                    className="add-new-card__return"
                />
            </Link>
            <form className="add-new-card__form" onSubmit={handleSubmit(saveCard)}>
                <div className="add-new-card__form-container">
                    <h1 className="add-new-card__title">Add new card</h1>
                    <input
                        type="text"
                        placeholder='Card name'
                        className="add-new-card__input"
                        required
                    />
                    <InputMask
                        mask="9999 9999 9999 9999"
                        placeholder='Card number'
                        className="add-new-card__input"
                        required
                        {...register("card")}
                    />
                    <div className="add-new-card__inputs-container">
                        <InputMask mask="99/99" placeholder='MM/YY' className="add-new-card__input" required />
                        <InputMask mask="999" placeholder='CVV' className="add-new-card__input" required />
                    </div>
                </div>
                <button type="submit" className="add-new-card__btn-save">Save</button>
            </form>
        </article>
    )
}

export default AddNewCard