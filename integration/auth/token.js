import jwt from "jsonwebtoken"


export const generateAccessToken = (data) => {
    return jwt.sign({
        ...data,
        }, 
        process.env.SECRET,
        { expiresIn: "1h" }
    )
}

export const generateRefreshtoken = (data) => {
    return jwt.sign({
        ...data,
        }, 
        process.env.SECRET
    )    
}