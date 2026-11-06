import { consumer } from "./kafka.ts";
import { createOrder } from "./order.ts";

export const runKafkaSubscriptions = async () => {

  consumer.subscribe([
    {
      topicName: "payment.successful",
      topicHandler: async (message) => {
        const order = message.value;
        await createOrder(order);
      },
    },
  ]);
};