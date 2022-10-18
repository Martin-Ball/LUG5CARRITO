import { Request, Response } from "express";
import blogs from "../models/blogs";


export const blogController = {

  addComment: async (req:Request, res:Response) => {

    blogs.findById(req.body.idBlog)
    .populate('author')
    .populate('comments')
    .then((userAuthor) => {
      if(!userAuthor){
        return res.status(404).send()
      }else{
        userAuthor.comments.push(req.body.idComment)
        userAuthor.save()
        res.send(userAuthor)
      }
      
    }).catch((err) => {
      res.status(500).send(err)
    })
  },

  deleteComment: async (req:Request, res:Response) => {

    blogs.findOneAndRemove({_id: req.body.id}, req.body, function(err,data){
      
      if(!err){
          console.log("Deleted");
      }else{
        res.send(data?.toJSON())
      }
      });
    
  },

  newBlog: async (req:Request, res:Response) => {
    {
      const newBlog = new blogs({...req.body})
      newBlog.save()
      console.log("post in db")
      res.send("post")
    }
  },

  listBlogs: async (req:Request, res:Response) => {
    blogs.find()
    .populate('author')
    .populate('comments')
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
