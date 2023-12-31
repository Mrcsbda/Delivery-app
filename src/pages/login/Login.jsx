import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { loginWithEmailAndPassword } from '../../firebase/providers'
import "./login.scss"
import { getUser, startGoogleSignIn } from '../../store/slides/user/thunk'
import { setIsChecking } from '../../store/slides/user/user'
import Loader from '../../components/loader/Loader'

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const { isChecking } = useSelector(state => state.user)
  const [errorLogin, setErrorLogin] = useState(false)
  const [checkingGoogle, setCheckingGoogle] = useState(false)
  const [respGoogle, setRespGoogle] = useState(false)

  const onSubmit = async (data) => {
    setRespGoogle(false)
    dispatch(setIsChecking())
    const resp = await loginWithEmailAndPassword(data.email, data.password)
    if (resp.ok) {
      await dispatch(getUser(resp.uid))
      setErrorLogin(false)
    } else {
      dispatch(setIsChecking())
      setErrorLogin(true)
    }
  }

  const signInGoogle = async () => {
    setErrorLogin(false)
    setCheckingGoogle(true)
    const resp = await dispatch(startGoogleSignIn())
    resp ? setRespGoogle(false) : setRespGoogle(true)
    setCheckingGoogle(false)
  }

  return (
    <main className='login'>
      {
        isChecking &&(<Loader />)
      }
      {
        checkingGoogle &&(<Loader />)
      }
      <img src="/logo.svg" alt="" />
      <form className='login__form' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='login__title' role='Login'>Login</h1>
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
          <button type="button" className='login__btn-google' onClick={signInGoogle}>
            <img src="/images/google.svg" alt="google icon" />
            <p>Google</p>
          </button>
        </div>
        {
          errorLogin && (
            <p className='login__alert' >¡Informacion incorrecta, prueba nuevamente!</p>
          )
        }
        {
          respGoogle && (
            <p className='login__alert' >¡Error al autenticarte con Google, vuelve a intentarlo!</p>
          )
        }
        <NavLink to="/signUp" className='login__create-account'>Create account</NavLink>
      </form>
    </main>
  )
}

export default Login