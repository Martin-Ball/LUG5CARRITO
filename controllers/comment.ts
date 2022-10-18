import { Request, Response } from "express";
import blogs from "../models/blogs";
import comments from "../models/comments";

export const commentController = {

  newComment: async (req:Request, res:Response) =>{
        const newComment = new comments({...req.body})
        newComment.save()
        console.log("post in db")
        res.send(newComment)
  },

  listComment: async (req:Request, res:Response) => {
    comments.find({})
    .populate('author')
    .then((userAuthor) => {
      if(!userAuthor){
        return res.status(404).send()
      }
      res.send(userAuthor)
    }).catch((err) => {
      res.status(500).send(err)
    })
  },

  deleteComment: async (req:Request, res:Response) => {

    blogs.findById(req.body.idBlog)
    .populate('author')
    .populate('comments')
    .then((userAuthor) => {
      if(!userAuthor){
        return res.status(404).send()
      }else{
        var index = userAuthor.comments.findIndex(x => x == req.body.idComment)
        userAuthor.comments.splice(index, 1);
        userAuthor.save()
        res.send(userAuthor)
      }
      
    }).catch((err) => {
      res.status(500).send(err)
    })
  },

}