import stripe from "stripe";

export const Stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2022-11-15",
  appInfo: {
    Name: "Spotify",
    version: "0.1.0",
  },
});
