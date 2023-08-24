import React, { useState } from "react";
import "./profile.scss";

const Profile = () => {
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
  ];

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

  return (
    <article className="profile">
      <figure className="profile__picture-container">
        <img className="profile__picture" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="" />
        <figcaption className="profile__user-name">Alejandra Sanchez</figcaption>
      </figure>
      <section className="profile__settings-container">
        <ul className="profile__settings-list">
          {profileSettings.map((item, index) => {
            return (
              <li key={index} className="profile__list-item">
                <figure className="profile__settings-option-container">
                  <img src={item.image} alt="" className="profile__settings-option-icon"/>
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
