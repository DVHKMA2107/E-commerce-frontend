import React, { Fragment, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useAlert } from "react-alert"
import MailOutlinedIcon from "@mui/icons-material/MailOutlined"
import FaceIcon from "@mui/icons-material/Face"
import Profile from "../../images/Profile.png"

import { loadUser } from "../../redux/userSlice"
import profileSlice, {
  clearError,
  updateProfile,
} from "../../redux/profileSlice"

import Loading from "../layout/Loading/Loading"
import MetaData from "../layout/MetaData"
import "./UpdateProfile.scss"

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
      dispatch(profileSlice.actions.updateReset())
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
                  <FaceIcon />
                  <input
                    type="text"
                    value={name}
                    placeholder="Name"
                    required
                    name="name"
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="update-profile__mail">
                  <MailOutlinedIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    name="email"
                    onFocus={(e) => e.target.select()}
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
