import http from "http";
import sendMail from "./utils/mailer.js";
import { createConsumer, createKafkaClient } from "@repo/kafka";

// Minimal HTTP server so the platform knows the process is alive
// and can perform health checks.
const PORT = Number(process.env.PORT ?? 3005);
const server = http.createServer((_req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "ok", service: "email-service" }));
});
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Email service health server on port ${PORT}`);
});

const kafka = createKafkaClient("email-service");
const consumer = createConsumer(kafka, "email-service-group");

const start = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe([
      {
        topicName: "user.created",
        topicHandler: async (message) => {
          const { email, username } = message as { email: string; username: string };

          if (email) {
            await sendMail({
              email,
              subject: "Welcome to E-commerce Trendiing App",
              text: `Welcome ${username}. Your account has been created!`,
            });
          }
        },
      },
      {
        topicName: "order.created",
        topicHandler: async (message) => {
          const { email, amount, status } = message as {
            email: string;
            amount: number;
            status: string;
          };

          if (email) {
            await sendMail({
              email,
              subject: "Order has been created",
              text: `Hello! Your order: Amount: $${(amount / 100).toFixed(2)}, Status: ${status}`,
            });
          }
        },
      },
    ]);
  } catch (error) {
    console.error("Email service failed to start:", error);
    process.exit(1);
  }
};

start();

