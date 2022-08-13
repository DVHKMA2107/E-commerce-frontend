import React, { Fragment, useState, useEffect } from "react"
import { MailOutline, Face } from "@mui/icons-material"
// import FaceIcon from "@mui/icons-material/Face"
import Profile from "../../images/Profile.png"
import Loading from "../layout/Loading/Loading"
import MetaData from "../layout/MetaData"
import { useNavigate } from "react-router-dom"
import profileSlice, {
  clearError,
  updateProfile,
} from "../../redux/profileSlice"
import "./UpdateProfile.scss"

import { useSelector, useDispatch } from "react-redux"
import { useAlert } from "react-alert"
import { loadUser } from "../../redux/userSlice"

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user)
  const { error, loading, isUpdated } = useSelector((state) => state.profile)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [avatar, setAvatar] = useState(Profile)
  const [avatarPreview, setAvatarPreview] = useState(Profile)

  const updateProfileSubmit = (e) => {
    e.preventDefault()

    const myForm = new FormData()

    myForm.set("name", name)
    myForm.set("email", email)
    myForm.set("avatar", avatar)
    dispatch(updateProfile(myForm))
  }

  const updateProfileDataChange = (e) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result)
        setAvatar(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setAvatarPreview(user.avatar.url)
    }

    if (error) {
      alert.error(error.message)
      dispatch(clearError())
    }

    if (isUpdated) {
      alert.success("Profile updated succesfully")
      dispatch(loadUser())

      navigate("/account")
      dispatch(profileSlice.actions.updateProfileReset())
    }
  }, [dispatch, error, alert, navigate, isUpdated, user])
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="update-profile__container">
            <div className="update-profile__box">
              <h2 className="update-profile__heading">Update Profile</h2>
              <form
                className="update-profile__form"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="update-profile__name">
                  <Face />
                  <input
                    type="text"
                    value={name}
                    placeholder="Name"
                    required
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="update-profile__mail">
                  <MailOutline />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="update-profile__image">
                  <img src={avatarPreview} alt="avatarPreview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  onSubmit={updateProfileSubmit}
                  value="Update"
                  className="update-profile__btn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default UpdateProfile
