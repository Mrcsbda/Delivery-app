import React from "react";
import "./profile.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../../store/api/firebaseApi";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slides/user/user";

const Profile = () => {
  const { idClient } = useParams()
  const profileSettings = [
    {
      image: "/images/account.svg",
      name: "Account edit",
    },
    {
      image: "/images/account-edit.svg",
      name: "Account edit",
    },
    {
      image: "/images/payment.svg",
      name: "Payment",
    },
    {
      image: "/images/language.svg",
      name: "Language",
    },
    {
      image: "/images/location-edit.svg",
      name: "Location",
    },
    {
      image: "/images/FAQ.svg",
      name: "FAQ",
    },
    {
      image: "/images/support.svg",
      name: "Support",
    },
    {
      image: "/images/logout.svg",
      name: "Logout",
    },
  ];
  const { data: user, isSuccess } = useGetUserByIdQuery(idClient)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const typeOfSettings = (index) => {
    switch (index) {
      case 1:
        return "switcher";
      case 3:
        return false;
      default:
        return "arrow-next";
    }
  };

  const settingsNavigate = (index) => {
    switch (index) {
      case 0:
        navigate("/edit-profile")
        break;
      case 2:
        navigate("/payment-methods")
        break;
      case 7:
        dispatch(logout())
        localStorage.clear()
        break;
      default:
        return;
    }
  }

  return (
    <article className="profile">
      <figure className="profile__picture-container">
        {
          isSuccess && (
            <>
              {
                user?.avatar ? (
                  <img className="profile__picture" src={user.avatar} alt="" />
                ) : (
                  <img className="profile__picture" src="http://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png" alt="" />
                )
              }
              <figcaption className="profile__user-name">{user.name}</figcaption>
            </>
          )
        }
      </figure>
      <section className="profile__settings-container">
        <ul className="profile__settings-list">
          {profileSettings.map((item, index) => {
            return (
              <li key={index} className="profile__list-item" onClick={() => settingsNavigate(index)}>
                <figure className="profile__settings-option-container">
                  <img src={item.image} alt="" className="profile__settings-option-icon" />
                  <figcaption className="profile__settings-option">{item.name}</figcaption>
                </figure>
                {typeOfSettings(index) ? (
                  <img className="profile__settings-icon" src={`/images/${typeOfSettings(index)}.svg`} alt="" />
                ) : (
                  <p className="profile__language">ENG</p>
                )}
              </li>
            );
          })}
          <li></li>
        </ul>
      </section>
    </article>
  );
};

export default Profile;
