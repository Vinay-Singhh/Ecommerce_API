const mongoose = require('mongoose');
const Product = require('../models/product');

// Show all products on request
module.exports.allProducts = async function (req, res) {
    try {
        let products = await Product.find({});

        if (products) {
            res.status(200).json({
                data: {
                    products
                }
            });
        } else {
            res.status(500).json({
                message: "Internal server error"
            });
        }
    } catch (err) {
        console.log("Error while showing all products", err);
        return;
    }
}

// function to incerease seq by 1 
// async function getNextSequence(name) {
//     var ret = await Counter.findOneAndUpdate(
//         { _id: name },
//         { $inc: { seq: 1 } },
//         { new: true }
//     );
//     console.log(ret);
//     return ret.seq;
// }

// Creating Product
module.exports.create = async function (req, res) {
    try {
        // let product = await Product.create({id: Product.length + 1},{name: req.body.name},{quantity:req.body.quantity});
        let product = await Product.create(req.body);
        if (product) {
            return res.status(200).json({
                data: {
                    product
                }
            });
        } else {
            return res.status(500).json({
                data: {
                    message: "Internal Server Erron"
                }
            });
        }
    } catch (err) {
        console.log("Error while creating product", err);
        return;
    }
}


// Delete a Product
module.exports.delete = async function (req, res) {
    try {
        let id = req.params.id;
        let product = await Product.findById(id);
        if (product) {
            await Product.findByIdAndDelete(id);

            return res.status(200).json({
                data: {
                    message: "Product deleted"
                }
            });
        } else {
            return res.status(404).json({
                data: {
                    message: "Product not found!!"
                }
            });
        }
    } catch (err) {
        console.log("Error while deleting product", err);
        return;
    }
}

// Update quantity of the product
module.exports.updateProduct = async function (req, res) {
    try {
        let id = req.params.id;
        const number = parseInt(req.body.number);
        let product = await Product.findById(id);
        if (product) {
            let q = product.quantity;
            let result = q + number;
            if (result < 0) {
                return res.json({
                    data: {
                        message: "You can not decrease quantity because you have less quantity"
                    }
                });
            } else if (result >= 0) {
                product.quantity += number;
                await product.save();
                return res.status(200).json({
                    product,
                    data: {
                        message: "Product updated successfully"
                    }
                });
            }

        } else {
            return res.status(400).json({
                data: {
                    message: "Product not found"
                }
            });
        }

    } catch (err) {
        console.log("error while updating product quantity", err);
        return;
    }

}