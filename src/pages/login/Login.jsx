import React from 'react'
import "./login.scss"

const Login = () => {
  return (
    <main className='login'>
      <img src="/logo.svg" alt="" />
      <form className='login__form'>
        <h1 className='login__title'>Login</h1>
        <input className='login__input' type="email" placeholder='Email' />
        <input className='login__input' type="password" placeholder='Password' />
        <div className='login__btns-container'>
          <button type="submit" className='login__btn-login'>Login</button>
          <button type="button" className='login__btn-google'>
            <img src="/images/google.svg" alt="google icon" />
            <p>Google</p>
          </button>
        </div>
        <p className='login__create-account'>Create account</p>
      </form>
    </main>
  )
}

export default Login