import { UserController } from "../controllers/UserController.js"
import {Authorization} from "../controllers/MiddlewareController.js"
import express from 'express';
const userRouter = express.Router();
const userController = new UserController()


userRouter.get("/users/:id",Authorization, userController.getone)
userRouter.get("/users",Authorization, userController.getall)
userRouter.delete("/users/:id",Authorization, userController.delete)
userRouter.put("/users/:id", userController.update)
userRouter.post('/create', userController.create)
userRouter.post('/login', userController.login)
userRouter.get("/logout", userController.logout)
userRouter.get("/profile",Authorization ,userController.profile)
 
export {userRouter}


