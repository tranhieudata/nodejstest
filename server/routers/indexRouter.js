import { UserController } from "../controllers/UserController.js"
import { userRouter } from "./userRouter.js";

const userController = new UserController()


function router(app) {

    app.use('/api',userRouter)

    // app.use('/',(req,res)=>{
    //     res.send("HOME")
    // })

}
export {router}


