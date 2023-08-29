import React, { useState } from "react";
import "./editProfile.scss";
import { useGetUserByIdQuery } from "../../store/api/firebaseApi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const EditProfile = () => {
  const [name, setName] = useState(true);
  const [email, setEmail] = useState(true);
  const [number, setNumber] = useState(true);
  const [birthday, setBirthday] = useState(true);
  const [address, setAddress] = useState(true);
  const [image, setImage] = useState(false);
  const { key } = useSelector(state => state.user)
  const { data: user, isSuccess } = useGetUserByIdQuery(key)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const editInfo = (type) => {
    switch (type) {
      case "name": setName(!name);
        break;
      case "email": setEmail(!email);
        break;
      case "number": setNumber(!number);
        break;
      case "birthday": setBirthday(!birthday);
        break;
      case "image": setImage(!image);
        break;
      case "address": setAddress(!address);
        break;
      default: return ""
    }
  }

  const saveInfo = (data) => {
    console.log(data)
  }

  return (
    <article className="edit-profile">
      <Link to={`/${key}`}>
        <img
          src="/images/arrow-prev.svg"
          alt="return icon"
          className="edit-profile__return"
        />
      </Link>
      {
        isSuccess && (
          <>
            <figure className="edit-profile__picture-container">
              <figcaption className="edit-profile__title">Profile</figcaption>
              {
                user?.avatar ? (
                  <img
                    className="edit-profile__picture"
                    src={user.avatar}
                    alt="profile picture"
                  />
                ) : (
                  <img
                    className="edit-profile__picture"
                    src="http://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png"
                    alt="profile picture"
                  />
                )
              }
              <img
                className="edit-profile__camera-icon"
                src="/images/camera.svg"
                alt="camera icon"
                onClick={() => editInfo("image")}
              />
            </figure>
            <form className={`edit-profile__change-image ${image ? "" : "edit-profile__hidden"}`}>
              <input type="file" />
              <button type="submit" className="edit-profile__btn-change"> Change </button>
            </form>
            <form className="edit-profile__form" onSubmit={handleSubmit(saveInfo)}>
              <section className="edit-profile__form-container">
                <div className={`edit-profile__input-container ${name ? "" : "edit-profile__edit"}`}>
                  <input
                    type="text"
                    disabled={name ? "disabled" : ""}
                    defaultValue={user.name}
                    {...register("name")}
                  />
                  <img src="/images/edit.svg" alt="edit icon" onClick={() => editInfo("name")} />
                </div>
                <div className={`edit-profile__input-container ${email ? "" : "edit-profile__edit"}`}>
                  <input
                    type="email"
                    disabled={email ? "disabled" : ""}
                    defaultValue={user.email}
                    {...register("email")}
                  />
                  <img src="/images/edit.svg" alt="edit icon" onClick={() => editInfo("email")} />
                </div>
                <div className={`edit-profile__input-container ${number ? "" : "edit-profile__edit"}`}>
                  <input
                    type="text"
                    disabled={number ? "disabled" : ""}
                    defaultValue={user?.number ? user.number :""}
                    placeholder={!user?.number && "Please enter a number"}
                    {...register("number")}
                  />
                  <img src="/images/edit.svg" alt="edit icon" onClick={() => editInfo("number")} />
                </div>
                <div className={`edit-profile__input-container ${birthday ? "" : "edit-profile__edit"}`}>
                  <input
                    type="text"
                    disabled={birthday ? "disabled" : ""}
                    defaultValue={user?.birthday ? user.birthday :""}
                    placeholder={!user?.birthday && "Please enter your birth date"}
                    {...register("birthday")}
                  />
                  <img src="/images/edit.svg" alt="edit icon" onClick={() => editInfo("birthday")} />
                </div>
                <div className={`edit-profile__input-container ${address ? "" : "edit-profile__edit"}`}>
                  <input
                    type="text"
                    disabled={address ? "disabled" : ""}
                    defaultValue={user?.address ? user.address :""}
                    placeholder={!user?.address && "Please enter your address"}
                    {...register("address")}
                  />
                  <img src="/images/edit.svg" alt="edit icon" onClick={() => editInfo("address")} />
                </div>
              </section>
              <button type="submit" className="edit-profile__btn-save">Save</button>
            </form>
          </>
        )
      }

    </article>
  );
};

export default EditProfile;
