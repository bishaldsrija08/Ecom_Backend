
import Product from "../models/ProductModel.js"

// Create products
const createProduct = async (req, res) => {
    const { productName, description, price, ram, rom, gen, brand } = req.body
    try {
        if (!productName || !description || !price || !ram || !rom || !gen || !brand) {
            return res.status(400).json({
                message: "Please provide all the details."
            })
        }
        await Product.create({
            productName,
            description,
            price,
            ram,
            rom,
            gen,
            brand
        })
        res.status(201).json({
            message: "Product created successfully."
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

//get all products

const getAllProducts = async (req, res) => {
    try {
        const query = req.query
        // For sorting and filtering
        const sort = JSON.parse(query.sort || '{}')
        const data = await Product.find({}).sort(sort).limit(5)
        res.status(200).json({
            data,
            message: "All product fetch successfully!"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

//get single product

const getSingleProduct = async (req, res) => {
    const { id } = req.params
    try {
        const isData = await Product.findOne({ _id: id })
        if (!isData) {
            return res.status(400).json({
                message: "No product is found."
            })
        }
        const data = await Product.findOne({ _id: id })
        res.status(200).json({
            data,
            message: "Single product fetched successfully."
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

//Delete product

const deleteProduct = async (req, res) => {
    const { id } = req.params
    try {
        const data = await Product.findOne({ _id: id })
        if (!data) {
            return res.status(400).json({
                message: "No product is found."
            })
        }
        await Product.findByIdAndDelete(id)
        res.status(200).json({
            message: "Product deleted successfylly!"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}

const updateProduct = async (req, res) => {
    const { productName, description, price, ram, rom, gen, brand } = req.body
    const { id } = req.params
    try {
        const data = await Product.findOne({ _id: id })
        if (!data) {
            return res.status(400).json({
                message: "No product is found."
            })
        }
        await Product.findByIdAndUpdate(id, {
            productName,
            description,
            price,
            ram,
            rom,
            gen,
            brand
        }, { new: true })
        res.status(200).json({
            message: "Product updated successfully!"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export { createProduct, getAllProducts, getSingleProduct, deleteProduct, updateProduct }