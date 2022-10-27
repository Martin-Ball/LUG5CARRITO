import { Request, Response } from "express";
import provider from "../models/provider";


export const providerController = {

    newProvider: async (req:Request, res:Response) => {
      const newProvider = new provider({...req.body})
      newProvider.save()
      res.send(newProvider)  
    },

    getAllProviders: async (req:Request, res:Response) => {
        provider.find()
        .then((userAuthor) => {
            if(!userAuthor){
                return res.status(404).send()
            }
            res.send(userAuthor)
            }).catch((err) => {
            res.status(500).send(err)
        })
    },
};