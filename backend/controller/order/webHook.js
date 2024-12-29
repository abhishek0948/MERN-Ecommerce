const stripe = require("../../config/stripe.js");
const orderModel = require("../../models/orderModel.js");
const addToCartModel = require("../../models/cartModel.js");

const endpointSecret = process.env.STRIPE_ENDPOINT_WEB_HOOK_SECRET_KEY;

async function getLineItems(lineItems) {
  let ProductItems = [];

  if (lineItems?.data?.length) {
    for (const item of lineItems.data) {
      const product = await stripe.products.retrieve(item.price.product);
      const ProductData = {
        productId: product.metadata.productId,
        name: product.name,
        price: item.price.unit_amount / 100,
        quantity: item.quantity,
        image: product.images,
      };

      ProductItems.push(ProductData);
    }
  }

  return ProductItems;
}

const webHook = async (req, res) => {
  const signature = req.headers["stripe-signature"];

  const payloadString = JSON.stringify(req.body);

  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: endpointSecret,
  });

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payloadString,
      header,
      endpointSecret
    );
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return response.sendStatus(400);
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;

      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );

      const productDetails = await getLineItems(lineItems);

      const orderDetails = {
        productDetails: productDetails,
        email: session.customer_email,
        userId: session.metadata.userId,
        paymentDetails: {
          paymentId: session.payment_intent,
          payment_method_types: session.payment_method_types,
          payment_status: session.payment_status,
        },
        shipping_options: session.shipping_options.map((s,idx) => {
            return {
                ...s,
                shipping_amount: s.shipping_amount / 100
            }
        }),
        totalAmount: session.amount_total / 100,
        address: session.customer_details.address,
      };

      const order = new orderModel(orderDetails);
      const saveOrder = await order.save();

      if(saveOrder?._id) {
        const deleteCart = await addToCartModel.deleteMany({userId:session.metadata.userId})
      }

      break;
    case "payment_method.attached":
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  res.status(200).send();
};

module.exports = webHook;
