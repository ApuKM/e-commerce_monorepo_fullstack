import { Kafka, type SASLOptions } from "kafkajs";

/**
 * Creates a KafkaJS client configured for the target environment.
 *
 * Local dev  -> set KAFKA_BROKERS=localhost:9094,localhost:9095,localhost:9096
 *               (leave KAFKA_USERNAME / KAFKA_PASSWORD unset -> plaintext)
 *
 * Production -> set KAFKA_BROKERS=<bootstrap-server>:9092
 *               KAFKA_USERNAME=<api-key-or-username>
 *               KAFKA_PASSWORD=<api-secret-or-password>
 *               KAFKA_SASL_MECHANISM=plain | scram-sha-256 | scram-sha-512
 *                 (defaults to "plain" for Confluent Cloud; use "scram-sha-256" for Redpanda)
 */
export const createKafkaClient = (service: string) => {
  const brokers = (process.env.KAFKA_BROKERS ?? "localhost:9094")
    .split(",")
    .map((b) => b.trim())
    .filter(Boolean);

  const username = process.env.KAFKA_USERNAME;
  const password = process.env.KAFKA_PASSWORD;
  const mechanism = (process.env.KAFKA_SASL_MECHANISM ?? "plain").toLowerCase();

  let sasl: SASLOptions | undefined;
  if (username && password) {
    if (mechanism === "scram-sha-256") {
      sasl = { mechanism: "scram-sha-256", username, password };
    } else if (mechanism === "scram-sha-512") {
      sasl = { mechanism: "scram-sha-512", username, password };
    } else {
      sasl = { mechanism: "plain", username, password };
    }
  }

  const useSsl = Boolean(sasl) || process.env.KAFKA_SSL === "true";

  return new Kafka({
    clientId: service,
    brokers,
    connectionTimeout: 10000,
    authenticationTimeout: 10000,
    retry: {
      initialRetryTime: 300,
      retries: 8,
    },
    ...(useSsl ? { ssl: true } : {}),
    ...(sasl ? { sasl } : {}),
  });
};