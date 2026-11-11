import type { Kafka, Producer } from "kafkajs";

export const createProducer = (kafka: Kafka) => {
  const producer: Producer = kafka.producer();

  const connect = async () => {
    await producer.connect();
  };

  /**
   * Send a message to a Kafka topic. Always awaited so callers can confirm
   * delivery before returning an HTTP response.
   */
  const send = async (topic: string, message: object) => {
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  };

  const disconnect = async () => {
    await producer.disconnect();
  };

  return { connect, send, disconnect };
};