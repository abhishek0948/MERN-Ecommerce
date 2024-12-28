const stripe = require('../../config/stripe.js');
const userModel = require('../../models/userModel.js');

exports.payment = async (req,res) => {
    try {   
        const {cartItems} = req?.body;
        const userId = req?.user._id;

        const user  = await userModel.findById(userId);

        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {
                    shipping_rate: 'shr_1QaWwQ093v1VV952OWnn27pP'
                }
            ],
            customer_email: user.email,
            line_items: cartItems.map((item,idx) => {
                return {
                    price_data: {
                        currency: 'inr',
                        product_data :{
                            name: item.productName,
                            images: item.productImages,
                            metadata: {
                                productId : item.productId
                            }
                        },
                        unit_amount: item.sellingPrice * 100
                    },
                    adjustable_quantity :{
                        enabled: true,
                        minimum: 1
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.FRONT_END_URL}/success`,
            cancel_url: `${process.env.FRONT_END_URL}/cancel`,
        }

        const session = await stripe.checkout.sessions.create(params);
        res.status(200).json(session)
    } catch (error) {
        return res.json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
}