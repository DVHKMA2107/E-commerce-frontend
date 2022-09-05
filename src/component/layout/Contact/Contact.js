import React from "react"
import { Button } from "@mui/material"
import "./Contact.scss"

const Contact = () => {
  return (
    <div className="contact-container">
      <a className="mailBtn" href="mailto:hoadamviet@gmail.com">
        <Button>Contact: hoadamviet@gmail.com</Button>
      </a>
    </div>
  )
}

export default Contact
