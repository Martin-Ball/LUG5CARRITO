import { Request, Response } from "express";
import users from "../models/users";

export const userController = {

  listUsers: async (req:Request, res:Response) => {
    const allUsers = await users.find()
    res.send(allUsers);
  },

  deleteUser: async (req:Request, res:Response) => {
  
    users.findOneAndRemove({_id: req.body.id}, req.body, function(err,data){
      res.send(data?.toJSON())
      if(!err){
          console.log("Deleted");
      }  
    });
  }
}