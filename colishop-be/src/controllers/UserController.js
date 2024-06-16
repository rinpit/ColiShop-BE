const UserService = require('../services/UserService')
const JwtService = require('../services/JWTService')


const createUser = async (req, res) => {
    try {
        // console.log(req.body)
        const { name, email, password, confirmPassword} = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!name || !email || !password || !confirmPassword ) {
            return res.status(200).json({
                status: 'ERRO',
                message: 'The input is required'
            })

        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERRO',
                message: 'The input is email'
            })

        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERRO',
                message: 'The password is equal confirmPassword'
            })
        }
        // console.log("isCheckEmail", isCheckEmail)
        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const loginUser = async (req, res) => {
    try {
        // console.log(req.body)
        const { email, password} = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!email || !password ) {
            return res.status(200).json({
                status: 'ERRO',
                message: 'The input is required'
            })

        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERRO',
                message: 'The input is email'
            })

        } 
        // console.log("isCheckEmail", isCheckEmail)
        const response = await UserService.loginUser(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if (!userId) {
            return res.status(200).json({
                status: 'ERRO',
                message: 'The userID is required'
            })
        }
        const response = await UserService.updateUser(userId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        
        if (!userId) {
            return res.status(200).json({
                status: 'ERRO',
                message: 'The userID is required'
            })
        }
        const response = await UserService.deleteUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id
        
        if (!userId) {
            return res.status(200).json({
                status: 'ERRO',
                message: 'The userID is required'
            })
        }
        const response = await UserService.getDetailsUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const refreshToken = async (req, res) => {
    try {
        const token = req.headers.token.split(' ')[1]
        
        if (!token) {
            return res.status(200).json({
                status: 'ERRO',
                message: 'The token is required'
            })
        }
        const response = await JwtService.refreshTokenJwtService(token)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken
}
