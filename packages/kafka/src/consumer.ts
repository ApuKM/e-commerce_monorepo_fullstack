import type { Kafka, Consumer } from "kafkajs";

export const createConsumer = (kafka: Kafka, groupId: string) => {
  const consumer: Consumer = kafka.consumer({ groupId });

  const connect = async () => {
    await consumer.connect();
    console.log("Kafka consumer connected: " + groupId);
  };

  /**
   * Subscribe to one or more topics and start processing messages.
   * Each topicHandler receives the already-JSON-parsed message value.
   * Errors inside a handler are caught, logged, and the message is
   * acknowledged (at-least-once delivery). Add a DLQ if needed.
   */
  const subscribe = async (
    topics: {
      topicName: string;
      topicHandler: (message: unknown) => Promise<void>;
    }[]
  ) => {
    await consumer.subscribe({
      topics: topics.map((topic) => topic.topicName),
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        try {
          const topicConfig = topics.find((t) => t.topicName === topic);
          if (topicConfig) {
            const raw = message.value?.toString();
            if (raw) {
              const parsed: unknown = JSON.parse(raw);
              await topicConfig.topicHandler(parsed);
            }
          }
        } catch (error) {
          console.error("Error processing Kafka message on topic:", topic, error);
        }
      },
    });
  };

  const disconnect = async () => {
    await consumer.disconnect();
  };

  return { connect, subscribe, disconnect };
};