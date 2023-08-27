import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { loginWithEmailAndPassword } from '../../firebase/providers'
import "./login.scss"
import { getUser } from '../../store/slides/user/thunk'
import { setIsChecking } from '../../store/slides/user/user'

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState(false)

  const onSubmit = async (data) => {
    dispatch(setIsChecking())
    const resp = await loginWithEmailAndPassword(data.email, data.password)
    if (resp.ok) {
      await dispatch(getUser(resp.uid))
      setError(false)
    } else {
      dispatch(setIsChecking())
      setError(true)
    }
  }

  return (
    <main className='login'>
      <img src="/logo.svg" alt="" />
      <form className='login__form' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='login__title'>Login</h1>
        <input
          className='login__input'
          type="email"
          placeholder='Email' {...register("email", { required: true })} />
        <input
          className='login__input'
          type="password"
          placeholder='Password' {...register("password", { required: true })} />
        <div className='login__btns-container'>
          <button type="submit" className='login__btn-login'>Login</button>
          <button type="button" className='login__btn-google'>
            <img src="/images/google.svg" alt="google icon" />
            <p>Google</p>
          </button>
        </div>
        {
          error && (
            <p className='login__alert' >¡Informacion incorrecta, prueba nuevamente!</p>
          )
        }
        <NavLink to="/signUp" className='login__create-account'>Create account</NavLink>
      </form>
    </main>
  )
}

export default Login