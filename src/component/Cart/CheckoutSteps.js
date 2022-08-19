import React, { Fragment } from "react"
import { Stepper, Typography, Step, StepLabel } from "@mui/material"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"

import "./CheckoutSteps.scss"

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Detail</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ]

  const stepStyles = {
    boxSinzing: "border-box",
  }
  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "tomato" : "rgba(0,0,0,0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  )
}

export default CheckoutSteps
