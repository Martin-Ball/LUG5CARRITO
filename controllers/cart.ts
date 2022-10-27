import { Request, Response } from "express";
import cart from "../models/cart";


export const cartController = {

    newCart: async (req:Request, res:Response) => {
      const newCart = new cart({...req.body})
      newCart.save()
      res.send(newCart)  
    },

    getCart: async (req:Request, res:Response) => {

    },

    addProduct: async (req:Request, res:Response) => {

    },

    reduceProduct: async (req:Request, res:Response) => {

    },

    setAmount: async (req:Request, res:Response) => {

    },

    buyCart: async (req:Request, res:Response) => {

    },
  
};