import express from "express"
import multer from "multer"

import {addFood,listFood, removeFood} from "../Controller/foodController.js"


const foodRouter = express.Router()

//Image Storage Engine (Saving Image to uploads folder & rename it)
   const storage = multer.diskStorage({
         destination: 'uploads',
         filename: (req, file, cb) => {
            return cb(null,`${Date.now()}${file.originalname}`);
         }
        })

const upload = multer({ storage: storage})

foodRouter.post("/add",upload.single('filename'),addFood)
foodRouter.post("/remove",removeFood)
foodRouter.get("/list",listFood)


export default foodRouter