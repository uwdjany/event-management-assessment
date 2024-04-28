import {Response} from 'express'
import { comparePassword, hashPassword } from '../utils/password'
import { UserService } from '../services/userService'
import { generateToken } from '../utils/token'

class UserController{
    static async createUser(req:any, res:Response){
        const {name,email,password} = req.body
        const hashedPassword = await hashPassword(password)
        const data = await UserService.create({
                name,
                email,
                password:hashedPassword
            })
         return res.status(200).json({
            messsage:"User created successfully",
            status:200,
            data
         })   
    }

    static async login(req:any, res:Response){
        const {email,password} = req.body
        const user:any = await UserService.getUser({email})
        const comparedPassword = await comparePassword(password, user?.password)
        if(!comparedPassword)return res.status(409).json({
            status:409,
            message:"Invalid or Wrong password"
        })
       const isFound = user
       
       if(!isFound.isLoggedIn){
          await UserService.update(isFound.id,{
            isLoggedIn:true
          })
       }
        isFound.password = ""
        const token = generateToken({...isFound})
        return res.status(201).json({
            status:201,
            message:"User logged in successfully",
            token
        })
    }

    static async logout(req:any, res:Response){
        const {id} = req.user
        const user = await UserService.getUser({id})
        if(user){
            await UserService.update(id,{
                isLoggedIn:false
            })
        }
        if(req.session)return req.session.destroy()
            
        return res.status(201).json({message:"User logged out successfully"})
    }
}

export default UserController