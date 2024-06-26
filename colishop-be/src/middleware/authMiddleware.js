const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authMiddleWare = (req, res, next) => {
    // console.log("check Token", req.headers.token)
    const token = req.headers.token.split(' ')[1]
    // const token = req.headers.token
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }
        const { payload } = user
        if (payload?.isAdmin) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }

    });
}

const authUserMiddleWare = (req, res, next) => {
    // console.log("check Token", req.headers.token)
    const token = req.headers.token.split(' ')[1]
    // const token = req.headers.token
    const userId = req.params.id
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }
        const { payload } = user
        if (payload?.isAdmin || payload?.id === userId) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }

    });
}

module.exports = {
    authMiddleWare,
    authUserMiddleWare
}