import { LockOpenOutlined, MailOutline } from "@mui/icons-material"
import FaceIcon from "@mui/icons-material/Face"
import React, { Fragment, useState, useEffect, useRef } from "react"
import Profile from "../../images/Profile.png"
import Loading from "../layout/Loading/Loading"
import { Link, useNavigate } from "react-router-dom"
import "./LoginSignup.scss"

import { useSelector, useDispatch } from "react-redux"
import { userLogin, clearError, userRegister } from "../../redux/userSlice"
import { useAlert } from "react-alert"

const LoginSignup = () => {
  const [loginPassword, setLoginPassword] = useState("")
  const [loginEmail, setLoginEmail] = useState("")
  const [avatar, setAvatar] = useState(Profile)
  const [avatarPreview, setAvatarPreview] = useState(Profile)
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()

  const { loading, error, isAuthenticated } = useSelector((state) => state.user)
  const { name, email, password } = user

  const switcherTab = useRef(null)
  const loginTab = useRef(null)
  const registerTab = useRef(null)

  const switchTabs = (e, newTab) => {
    if (newTab === "Login") {
      switcherTab.current.classList.add("shiftToNeutral")
      switcherTab.current.classList.remove("shiftToRight")

      registerTab.current.classList.remove("shiftToNeutralForm")
      loginTab.current.classList.remove("shiftToLeft")
    }

    if (newTab === "Register") {
      switcherTab.current.classList.add("shiftToRight")
      switcherTab.current.classList.remove("shiftToNeutral")

      registerTab.current.classList.add("shiftToNeutralForm")
      loginTab.current.classList.add("shiftToLeft")
    }
  }

  useEffect(() => {
    if (error) {
      alert.error(error.message)
      dispatch(clearError())
    }

    if (isAuthenticated) {
      navigate("/account")
    }
  }, [dispatch, error, alert, navigate, isAuthenticated])

  const loginSubmit = (e) => {
    e.preventDefault()
    dispatch(userLogin({ loginEmail, loginPassword }))
  }

  const registerSubmit = (e) => {
    e.preventDefault()

    const myForm = new FormData()

    myForm.set("name", name)
    myForm.set("email", email)
    myForm.set("password", password)
    myForm.set("avatar", avatar)
    dispatch(userRegister(myForm))
  }

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result)
          setAvatar(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    } else {
      setUser({ ...user, [e.target.name]: e.target.value })
    }
  }

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <div className="login-signup-container">
            <div className="login-signup-box">
              <div>
                <div className="login-signup-toogle">
                  <p onClick={(e) => switchTabs(e, "Login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "Register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>

              <form
                className="login-form"
                ref={loginTab}
                onSubmit={loginSubmit}
              >
                <div className="login-email">
                  <MailOutline />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="login-password">
                  <LockOpenOutlined />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Forgot Password?</Link>
                <input type="submit" value="Login" className="login-button" />
              </form>

              <form
                className="signup-form"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signup-name">
                  <FaceIcon />
                  <input
                    type="text"
                    value={name}
                    placeholder="Name"
                    required
                    name="name"
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signup-mail">
                  <MailOutline />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    name="email"
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signup-password">
                  <LockOpenOutlined />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="register-image">
                  <img src={avatarPreview} alt="avatarPreview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input
                  type="submit"
                  onSubmit={registerSubmit}
                  value="Register"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default LoginSignup
