import jwt from 'jsonwebtoken'

// Verify Access Token
const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization
        jwt.verify(token, process.env.SECRET, (err, user) => {
            if(err) 
                return res.sendStatus(403)
            if(user.refreshToken)
                return res.sendStatus(403)
            req.user = user
            next()
        })
    } catch (error) {
        console.log(error)
    }
}

export default auth