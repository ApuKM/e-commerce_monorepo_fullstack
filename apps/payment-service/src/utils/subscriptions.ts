import { consumer } from "./kafka.js";
import { createStripeProduct, deleteStripeProduct } from "./stripeProduct.js";

export const runKafkaSubscriptions = async () => {
  await consumer.subscribe([
    {
      topicName: "product.created",
      topicHandler: async (message) => {
        const product = message as { value: { id: string; name: string; price: number } };
        console.log("Received message: product.created", product.value);
        await createStripeProduct(product.value);
      },
    },
    {
      topicName: "product.deleted",
      topicHandler: async (message) => {
        const payload = message as { value: number };
        console.log("Received message: product.deleted", payload.value);
        await deleteStripeProduct(payload.value);
      },
    },
  ]);
};

