const Product = require('../models/ProductModel')
const bcrypt = require("bcrypt")

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { id, name, image, type, rating, description, price, countInStock } = newProduct
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct !== null) {
                resolve({
                    status: 'OK',
                    message: 'The name of product is already'
                })
            }

            const newProduct = await Product.create({
                id,
                name,
                image,
                type,
                rating,
                description,
                price,
                countInStock
            })
            if (newProduct) {
                resolve({
                    status: 'OK',
                    message: 'CREATE PRODUCT SUCCESS',
                    data: newProduct
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })

            console.log('checkProduct', checkProduct)

            if (checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }

            const updateProduct = await Product.findByIdAndUpdate(id, data, { new: true })
            // console.log('updateUser', updateUser)
            resolve({
                status: 'OK',
                message: 'UPDATE_SUCCESS',
                data: updateProduct
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })

            if (product === null) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'GET_DETAIL_PRODUCT_SUCCESS',
                data: product
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })

            // console.log('checkUser', checkUser)

            if (checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }

            await Product.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'DELETE_SUCCESS'
            })
        } catch (e) {
            reject(e)
        }
    })
}



const getAllProduct = (limit, page, sort, filter) => {
    // console.log('sort', sort)
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments()
            // console.log('filter', filter)

            if (filter) {
                const objectFilter = {}
                objectFilter[filter[0]] = filter[1]
                console.log('objectFilter', objectFilter)

                const label = filter[0];
                console.log('label', label)

                const allObjectFilter = await Product.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(page * limit)
                resolve({
                    status: 'OK',
                    message: 'GET_ALL_SUCCESS',
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }


            // sort
            // if (sort) {
            //     console.log('okok sort')
            //     const objectSort = {}
            //     objectSort[sort[1]] = sort[0]
            //     console.log('objectSort', objectSort)
            //     const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort)
            //     resolve({
            //         status: 'OK',
            //         message: 'GET_ALL_SUCCESS',
            //         data: allProductSort,
            //         total: totalProduct,
            //         pageCurrent: Number(page + 1),
            //         totalPage: Math.ceil(totalProduct / limit)
            //     })
            // }
            // Get All

            const allProduct = await Product.find().limit(limit).skip(page * limit)
            resolve({
                status: 'OK',
                message: 'GET_ALL_SUCCESS',
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            })
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct
}