import React, { Fragment, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useAlert } from "react-alert"
import productSlice, {
  clearError,
  createNewProduct,
} from "../../redux/productSlice"

import AccountTreeIcon from "@mui/icons-material/AccountTree"
import DescriptionIcon from "@mui/icons-material/Description"
import SpellCheckIcon from "@mui/icons-material/Spellcheck"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import StorageIcon from "@mui/icons-material/Storage"

import MetaData from "../layout/MetaData"
import SideBar from "./SideBar"
import { Button } from "@mui/material"
import "./NewProduct.scss"

const NewProduct = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [Stock, setStock] = useState(0)
  const [images, setImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])

  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "Smartphone",
  ]

  const { success, loading, error } = useSelector((state) => state.product)

  const newProductFormSubmitHandler = (e) => {
    e.preventDefault()
    const myForm = new FormData()

    myForm.set("name", name)
    myForm.set("price", price)
    myForm.set("description", description)
    myForm.set("category", category)
    myForm.set("Stock", Stock)

    images.forEach((image) => {
      myForm.append("images", image)
    })

    dispatch(createNewProduct(myForm))
  }

  const createProductImageChange = (e) => {
    const files = Array.from(e.target.files)

    setImages([])
    setImagesPreview([])

    files.forEach((file) => {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result])
          setImagesPreview((old) => [...old, reader.result])
        }
      }

      reader.readAsDataURL(file)
    })
  }

  useEffect(() => {
    if (error) {
      alert.error(error.message)
      dispatch(clearError())
    }

    if (success) {
      alert.success("Product Created Successfully!")
      navigate("/admin/products")
      dispatch(productSlice.actions.newProductReset())
    }
  }, [dispatch, alert, error, success, navigate])

  return (
    <Fragment>
      <MetaData title="CREATE PRODUCT -- ADMIN" />
      <div className="dashboard">
        <SideBar />

        <div className="new-product__container">
          <form
            className="new-product__form"
            encType="multipart/form-data"
            onSubmit={newProductFormSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellCheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>

            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>

            <div>
              <DescriptionIcon />
              <textarea
                placeholder="Product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
                onFocus={(e) => e.target.select()}
              />
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Chose category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>

            <div id="new-product__form-file">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImageChange}
                multiple
              />
            </div>

            <div id="new-product__form-image">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="new-product__button"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default NewProduct
