import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { loginWithEmailAndPassword } from '../../firebase/providers'
import { setIsChecking } from '../../store/slides/user/user/user'
import "./login.scss"
import { getUser } from '../../store/slides/user/user/thunk'

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    dispatch(setIsChecking())
    const resp = await loginWithEmailAndPassword(data.email, data.password)
    if (resp.ok) {
      dispatch(getUser(resp.uid))
    } else {
      dispatch(setIsChecking())
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
        <p className='login__create-account'>Create account</p>
      </form>
    </main>
  )
}

export default Login