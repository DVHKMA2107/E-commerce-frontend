import React from "react"
import { Button, Typography, Avatar } from "@mui/material"
import FacebookIcon from "@mui/icons-material/Facebook"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import "./About.scss"

const About = () => {
  return (
    <div className="about-section">
      <div></div>
      <div className="about-section__gradient"></div>
      <div className="about-section__container">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar src="../../../images/" alt="Founder" />
            <Typography>Dam Viet Hoa</Typography>
            <Button onClick={() => {}}>Visit Facebook</Button>
            <span>
              {
                "This is ecommerce website made by @damviethoa. Only with purpose learn and practice ReactJs & NodeJs"
              }
            </span>
          </div>
          <div className="about-section__container2">
            <Typography component="h2">My Brands</Typography>
            <a href="https://www.facebook.com/hoadamviet/" target="blank">
              <FacebookIcon className="facebook-icon" />
            </a>

            <a
              href="https://www.linkedin.com/in/ho%C3%A0-%C4%91%C3%A0m-vi%E1%BB%87t-983576229/"
              target="blank"
            >
              <LinkedInIcon className="linkedin-icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
