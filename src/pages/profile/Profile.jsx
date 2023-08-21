import React, { useState } from "react";
import "./profile.scss";

const Profile = () => {
  const [typeOfSettings, setTypeOfSettings] = useState();

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

  const getTypeOfSettings = (index) => {
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
    <article>
      <figure>
        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="" />
        <figcaption>Alejandra Sanchez</figcaption>
      </figure>
      <section>
        <ul>
          {profileSettings.map((item, index) => {
            return (
              <li key={index}>
                <figure>
                  <img src={item.image} alt="" />
                  <figcaption>{item.name}</figcaption>
                </figure>
                {getTypeOfSettings(index) ? (
                  <img src={`/images/${getTypeOfSettings(index)}.svg`} alt="" />
                ) : (
                  <p>ENG</p>
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
