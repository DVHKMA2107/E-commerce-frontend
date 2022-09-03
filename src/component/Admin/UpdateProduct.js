import React, { Fragment, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { useAlert } from "react-alert"
import { Button } from "@mui/material"

import AccountTreeIcon from "@mui/icons-material/AccountTree"
import DescriptionIcon from "@mui/icons-material/Description"
import SpellCheckIcon from "@mui/icons-material/Spellcheck"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import StorageIcon from "@mui/icons-material/Storage"

import productSlice, {
  clearError,
  updateProduct,
  getProductDetail,
} from "../../redux/productSlice"

import SideBar from "./SideBar"
import MetaData from "../layout/MetaData"

const UpdateProduct = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [Stock, setStock] = useState(0)
  const [images, setImages] = useState([])
  const [oldImages, setOldImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])

  const { productDetail, isUpdated, loading, error } = useSelector(
    (state) => state.product
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()
  const { id: productId } = useParams()

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "Smartphone",
  ]

  const updateProductSubmitHadnler = (e) => {
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

    dispatch(updateProduct({ id: productId, updateData: myForm }))
  }

  const updateProductChange = (e) => {
    const files = Array.from(e.target.files)

    setImages([])
    setImagesPreview([])
    setOldImages([])

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
    if (productDetail && productDetail._id !== productId) {
      dispatch(getProductDetail(productId))
    } else {
      setName(productDetail.name)
      setPrice(productDetail.price)
      setDescription(productDetail.description)
      setCategory(productDetail.category)
      setStock(productDetail.Stock)
      setOldImages(productDetail.images)
    }
    if (error) {
      alert.error(error.message)
      dispatch(clearError())
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully!")
      navigate("/admin/products")
      dispatch(productSlice.actions.updateProductReset())
      dispatch(getProductDetail(productId))
    }
  }, [dispatch, alert, error, isUpdated, navigate, productId, productDetail])

  return (
    <Fragment>
      <MetaData title="UPDATE PRODUCT -- ADMIN" />
      <div className="dashboard">
        <SideBar />

        <div className="new-product__container">
          <form
            className="new-product__form"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHadnler}
          >
            <h1>Update Product</h1>

            <div>
              <SpellCheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              />
            </div>

            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose category</option>
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
                value={Stock}
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="new-product__form-file">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductChange}
                multiple
              />
            </div>

            <div id="new-product__form-image">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
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
              Submit
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default UpdateProduct
