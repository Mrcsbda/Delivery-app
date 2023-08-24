import "./main.scss"


const SignUp = () => {
  return (
    <form className="signin">
        <h1 className="signin__title">Create account</h1>
        <span className="signin__label">Name</span>
        <input type="text" placeholder="Robert Foxy" className="signin__input"/>
        <span className="signin__label">Email</span>
        <input type="text" placeholder="example@gmail.com" className="signin__input"/>
        <span className="signin__label">password</span>
        <input type="password"  className="signin__input" placeholder="*****"/>
        <button type="submit" className="signin__submit">Sign Up</button>
    </form>
  )
}

export default SignUp