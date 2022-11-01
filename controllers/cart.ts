import { Request, Response } from "express";
import cart from "../models/cart";
import product from "../models/product"


export const cartController = {

  newCart: async (req: Request, res: Response) => {

    const newCart = new cart({ ...req.body })
    newCart.save()
      .then((cart) => {
        if (!cart) {
          return res.status(404).send()
        }
        res.send(cart)
      }).catch((err) => {
        res.status(500).send(err)
      })
  },

  getCart: async (req: Request, res: Response) => {

    cart.find({ _id: req.body.idCart })
      .populate('products.product')
      .then((cart) => {
        if (!cart) {
          return res.status(404).send()
        }
        res.send(cart)
      }).catch((err) => {
        res.status(500).send(err)
      })
  },

  getAllCarts: async (req: Request, res: Response) => {

    cart.find({})
      .populate('products.product')
      .then((cart) => {
        if (!cart) {
          return res.status(404).send()
        }
        res.send(cart)
      }).catch((err) => {
        res.status(500).send(err)
      })
  },

  addProduct: async (req: Request, res: Response) => {
    cart.findById(req.body.idCart)
      .populate('products.product')
      .populate('products.product.detail')
      .then((productID) => {

        if (!productID) {
          return res.status(404).send()
        } else {
          const newProduct = {
            "product": req.body.productID,
            "amount": 0
          }
          productID.products.push(newProduct)

          if (productID.status == 'New') {
            productID.status = 'InProgress'
          }

          productID.save()
          res.send(productID)
        }

      }).catch((err) => {
        res.status(500).send(err)
      })
  },

  deleteProduct: async (req: Request, res: Response) => {

    cart.findById(req.body.idCart)
      .then((cartData) => {

        if (!cartData) {
          return res.status(404).send()
        } else {
          cartData?.products.splice(req.body.idDeleteProduct, 1)
          cartData.save()
          res.send(cartData)
        }

      }).catch((err) => {
        res.status(500).send(err)
      })
  },

  moreProduct: async (req: Request, res: Response) => {
    cart.findById(req.body.idCart)

      .then((productID) => {
        if (!productID) {
          return res.status(404).send()
        } else {
          productID.products[req.body.positionProduct].amount += 1
          productID.save()
          res.send(productID)
        }

      }).catch((err) => {
        res.status(500).send(err)
      })
  },

  lessProduct: async (req: Request, res: Response) => {
    cart.findById(req.body.idCart)

      .then((productID) => {
        if (!productID) {
          return res.status(404).send()
        } else {
          productID.products[req.body.positionProduct].amount -= 1
          productID.save()
          res.send(productID)
        }

      }).catch((err) => {
        res.status(500).send(err)
      })
  },

  setAmount: async (req: Request, res: Response) => {
    cart.findById(req.body.idCart)

      .then((productID) => {
        if (!productID) {
          return res.status(404).send()
        } else {
          productID.products[req.body.positionProduct].amount = req.body.amount
          productID.save()
          res.send(productID)
        }

      }).catch((err) => {
        res.status(500).send(err)
      })
  },

  buyCart: async (req: Request, res: Response) => {

    let total: number = 0

    cart.findById(req.body.idCart)
      .then((cartFound) => {

        if (!cartFound) {
          return res.status(404).send()
        } else {

          cartFound.products.forEach(async productFind => {
            const id = productFind.product?.toString()
            const amount: number = productFind.amount

            const productFound = await product.findById(id)
            const stock = productFound?.stock
            if (stock && stock.valueOf() < amount?.valueOf()) {
              console.log(`PRODUCT: ${stock}, STOCK: ${stock}, AMOUNT: ${amount}`)
              return res.status(500).send({ message: `Error: el producto ${productFound.desc} tiene stock ${stock} y se quiere comprar ${amount} unidades` })
            } else {
              if (stock && productFound.price) {
                productFound.stock = stock - amount
                total += amount * productFound.price
                await productFound?.save()
              }
            }
            cartFound.total = total
            cartFound.status = 'Bought'

            /*cartFound.products.forEach((amount) =>{
              amount.amount = 0
            })*/
            await cartFound.save()
            res.send(cartFound)
            console.log(total)
          })



        }

      }).catch((err) => {
        res.status(500).send(err)
      })
  },
};