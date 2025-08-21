import amqplib from 'amqplib';

let connection, channel;

const connectRabbitMQ = async (retries = 5 , delay =2000) => {
    while(retries){
        try {
            connection = await amqplib.connect('amqp://rabbitmq_container');
            channel = await connection.createChannel();
            await channel.assertQueue('task_queue');
            console.log('Connected to RabbitMQ');
            return;
        } catch (error) {
            console.error('Failed to connect to RabbitMQ, retrying...', error.message);
            retries--;
            console.error(`Retries left: ${retries}`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }  
    
}


export { connectRabbitMQ , channel, connection };

