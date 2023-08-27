import { useForm } from "react-hook-form"
import "./main.scss"
import { useDispatch } from "react-redux"
import { signUpWithEmailAndPassword } from "../../store/slides/user/thunk"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"


const SignUp = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const resp = await dispatch(signUpWithEmailAndPassword(data))
    if(resp) {
      Swal.fire(
        'Excelente!',
        'Registro Exitoso!',
        'success'
      ).then(
        reset(),
        navigate("/login")
      )
    } else {
      Swal.fire(
        'Ooppss!',
        'Hubo un error, vuelve a intentarlo!',
        'error'
      )
    }
  }
  return (
    <form className="signin" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="signin__title">Create account</h1>
      <span className="signin__label">Name</span>
      <input type="text" placeholder="Robert Foxy" className="signin__input" {...register("name", { required: true })}/>
      <span className="signin__label">Email</span>
      <input type="email" placeholder="example@gmail.com" className="signin__input" {...register("email", { required: true })}/>
      <span className="signin__label">password</span>
      <input type="password" className="signin__input" placeholder="min 6 characters" {...register("password", { required: true })}/>
      <button type="submit" className="signin__submit">Sign Up</button>
    </form>
  )
}

export default SignUp