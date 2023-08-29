import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import uploadFile from '../../services/updaloadFile'
import { useEditInfoUserMutation } from '../../store/api/firebaseApi'
import Swal from 'sweetalert2'

const ChangeImageForm = ({ id: key, setImage, image }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [editInfoUser] = useEditInfoUserMutation()

    const saveImage = async (data) => {
        if (data.avatar.length > 0) {
            const avatar = await uploadFile(data.avatar[0])
            const formData = { avatar }
            await editInfoUser({ formData, key })
            reset()
            setImage(false)
            Swal.fire(
                'Excelente!',
                'Fotografia actualizada con existo!',
                'success'
            )
        }
    }
    return (
        <form
            className={`edit-profile__change-image ${image ? "" : "edit-profile__hidden"}`}
            onSubmit={handleSubmit(saveImage)}
        >
            <input type="file" {...register("avatar")} />
            <button type="submit" className="edit-profile__btn-change"> Change </button>
        </form>
    )
}

export default ChangeImageForm