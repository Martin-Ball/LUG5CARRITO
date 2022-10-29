import { Request, Response } from "express";
import cart from "../models/cart";
import product from "../models/product"
import detail from "../models/detail"


export const cartController = {

    newCart: async (req:Request, res:Response) => {

      const newCart = new cart({...req.body})
      newCart.save()
      .then((cart) => {
      if(!cart){
        return res.status(404).send()
      }
      res.send(cart)
      }).catch((err) => {
        res.status(500).send(err)
      })
    },

    getCart: async (req:Request, res:Response) => {
      
      cart.find({_id: req.body.idCart})
      .populate('products.product')
      .then((cart) => {
      if(!cart){
        return res.status(404).send()
      }
      res.send(cart)
      }).catch((err) => {
        res.status(500).send(err)
      })
    },

    getAllCarts: async (req:Request, res:Response) => {
      
      cart.find({})
      .populate('products.product')
      .then((cart) => {
      if(!cart){
        return res.status(404).send()
      }
      res.send(cart)
      }).catch((err) => {
        res.status(500).send(err)
      })
    },

    addProduct: async (req:Request, res:Response) => {
      cart.findById(req.body.idCart)
      .populate('products.product')
      .populate('products.product.detail')
      .then((productID) => {

        if(!productID){
          return res.status(404).send()
        }else{
          const newProduct = {
            "product" : req.body.productID,
            "amount" : 0
          }
          productID.products.push(newProduct)
          productID.save()
          res.send(productID)
        }
        
      }).catch((err) => {
        res.status(500).send(err)
      })
    },

    deleteProduct: async (req:Request, res:Response) => {

      cart.findOneAndRemove({_id: req.body.idCart}, req.body, function(err,data){
        
        if(!err){
            console.log("Deleted");
        }else{
          res.send(data)
        }
        });
      
    },

    moreProduct: async (req:Request, res:Response) => {
      cart.findById(req.body.idCart)

      .then((productID) => {
        if(!productID){
          return res.status(404).send()
        }else{
          productID.products[req.body.positionProduct].amount += 1
          productID.save()
          res.send(productID)
        }
        
      }).catch((err) => {
        res.status(500).send(err)
      })
    },

    lessProduct: async (req:Request, res:Response) => {
      cart.findById(req.body.idCart)

      .then((productID) => {
        if(!productID){
          return res.status(404).send()
        }else{
          productID.products[req.body.positionProduct].amount -= 1
          productID.save()
          res.send(productID)
        }
        
      }).catch((err) => {
        res.status(500).send(err)
      })
    },

    setAmount: async (req:Request, res:Response) => {
      cart.findById(req.body.idCart)

      .then((productID) => {
        if(!productID){
          return res.status(404).send()
        }else{
          productID.products[req.body.positionProduct].amount = req.body.amount
          productID.save()
          res.send(productID)
        }
        
      }).catch((err) => {
        res.status(500).send(err)
      })
    },

    buyCart: async (req:Request, res:Response) => {
      cart.findById(req.body.idCart)

      .then((productID) => {
        if(!productID){
          return res.status(404).send()
        }else{
          productID.products.forEach( productFind => {
            const id = productFind.product?.toString()
            const amount = productFind.amount
            console.log(`PRODUCTO: ${id}`)

            product.find({id})
            .then((productID2) => {
              const detailID = productID2.map( id => {
                console.log(`DETALLE: ${id.detail?.toString()}`)
              })
            })

          })
          // productID.status = 'Bought'
          // productID.save()
          res.send(productID)
        }
        
      }).catch((err) => {
        res.status(500).send(err)
      })
    },
  
};