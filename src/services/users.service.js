import { Users } from "../schemas/index.js"
import { AppError } from "../utils/appError.js"
import { logger, createAccessAndRefresh, sendMail } from "../utils/index.js"




export const getUserSevice = async (type, data = "") => {
    try {
        switch (type) {
            case "all":
                const allUser = await Users.find()
                return allUser

            case "id":
                const byId = await Users.findById(data)
                return byId

            case "username":
                const byUsername = await Users.find({name: data})
                // if(byUsername.length === 0){
                //     throw new AppError('user name not found', 404)
                // }
                return byUsername

            case "email":
                const email = await Users.find({email: data})
                // if(email.length === 0){
                //     console.log(email);
                //     throw new AppError('user email not found', 404)
                // }
                return email

            case "phone_number":
                const phone_number = await Users.find({tag: data})
                if(phone_number.length !== 0){
                    throw new AppError('user phone number not found', 404)
                }
                return phone_number;
        }
    } catch (error) {
        throw new Error(error)
    }
}



export const createUserService = async (body) => {
    try {
        const {email, username, phone_number } = body

      
        const currentEmail = await getUserSevice("email", email)
        if (currentEmail.length > 0) {
            throw new AppError("email already exist")
        }

        const currentUsername = await getUserSevice("username", username)
        if (currentUsername.length > 0) {
            throw new AppError("username already exist")
        }

        const currentPhone = await getUserSevice("phone_number", phone_number)
        if (currentPhone.length > 0) {
            throw new AppError("phone number already exist")
        }
        const newData = await Users(body)
        await newData.save()
        return newData
    } catch (error) {
        logger.error(error)
        throw new Error(error)
    }
}

export const registerService = async (user) => {
    try {
        const link = `http://localhost:3000/api/v1/auth/active/${user.id}`

        await sendMail(user.email, "cative link", link)
    } catch (error) {
        logger.error(error)
        throw new Error(error)
    }
}

export const loginUserService = async (user) => {
    try {
        const currentUser = await getUserSevice("email", user.email)

        if (currentUser.length === 0) {
            throw new AppError("user or passowrd is wrong", 409)
        }
        if (!currentUser[0].is_active) {
            throw new AppError(`you aren't avtice`, 400)
        }

        if (currentUser[0].password !== user.password) {
            throw new AppError("user or passowrd is wrong", 409)
        }

        const tokens = createAccessAndRefresh(currentUser)
        return tokens
    } catch (error) {
        throw new Error(error)
    }
}

export const activeUserService = async (id) => {
    try {
        const activeUser = await getUserSevice("id", id)
        if (activeUser.length === 0) {
            throw new AppError('uset not found', 404)
        }

        const updateUser = await Users.findByIdAndUpdate(id, {is_active: true})
        return updateUser

    } catch (error) {
        throw new Error(error);

    }
}

export const updateUserService = async (id, data) => {
    try {
        const updateData = await Users.findByIdAndUpdate(id, data)
        if(updateData.length ===0){
            throw new AppError('uset not found', 404)
        }

        return updateData
    } catch (error) {
        logger.error(error)
        throw new Error(error)

    }
}

export const deleteUserService = async (id) => {
    try {
        
        const deleteUser = await Users.findByIdAndDelete(id)
        if(deleteUser.length === 0){
            throw new AppError('user not found', 404)
        }
        return deleteUser
    } catch (error) {
        logger.error(error)
        throw new Error(error)

    }
}

