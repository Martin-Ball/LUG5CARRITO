import { Request, Response } from "express";
import detail from "../models/detail";


export const detailController = {

    newDetail: async (req:Request, res:Response) => {
      const newProduct = new detail({...req.body})
      newProduct.save()
      res.send(newProduct)  
    },

    getDetail: async (req:Request, res:Response) => {
        detail.find()
        .then((userAuthor) => {
            if(!userAuthor){
                return res.status(404).send()
            }
            res.send(userAuthor)
            }).catch((err) => {
            res.status(500).send(err)
        })
    }
};