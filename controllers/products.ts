import { Request, Response } from "express";
import product from "../models/product";


export const productsController = {

    newProduct: async (req:Request, res:Response) => {
      const newProduct = new product({...req.body})
      newProduct.save()
      res.send(newProduct)  
    },

    getAllProducts: async (req:Request, res:Response) => {
        product.find()
        .populate('detail')
        .then((product) => {
            if(!product){
                return res.status(404).send()
            }
            res.send(product)
            }).catch((err) => {
            res.status(500).send(err)
        })
    },

    getProductByID: async (req:Request, res:Response) => {
        product.find()
        .then((product) => {
            if(!product){
                return res.status(404).send()
            }
            res.send(product)
            }).catch((err) => {
            res.status(500).send(err)
        })
    },
};