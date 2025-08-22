import amqplib from 'amqplib';


const connectRabbitMQ = async () => {
    try {
        const connection = await amqplib.connect('amqp://rabbitmq:5672');
        const channel = await connection.createChannel();
        await channel.assertQueue('task_queue');
        console.log('Notification service connected to RabbitMQ');
        channel.consume('task_queue', (msg) => {
            const taskData = JSON.parse(msg.content.toString());
            console.log('Received task:', taskData);
            channel.ack(msg);
    })
    } catch (error) {
        console.error('Failed to connect to RabbitMQ:', error.message);
        throw error;
    }
}

connectRabbitMQ();