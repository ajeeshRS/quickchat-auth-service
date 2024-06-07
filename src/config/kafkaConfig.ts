import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    clientId: 'auth-service',
    brokers: ['kafka:9092']
})