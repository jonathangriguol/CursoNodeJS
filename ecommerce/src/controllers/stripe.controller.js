import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripeController = async (req, res) => {
  const { purchase, total_amount, shipping_fee } = req.body;
  console.log("🚀 ~ stripeController ~ req.body:", req.body)
  const calculateOrderAmount = () => {
    return total_amount + shipping_fee;
  };

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: "usd",
  });

  res.json({ clientSecret: paymentIntent.client_secret });
};

export default stripeController;
