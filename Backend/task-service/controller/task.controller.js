import Task from '../Schema/taskSchema.js';
import { channel } from '../Database/Rabbitmq.connect.js';

export const createTask = async (req, res) => {
    try {
        const { title, description, userId } = req.body;
        const newTask = new Task({ title, description, userId });
        const message = {taskId : newTask._id, userId: userId, title};
        if(!channel ) {
            return res.status(503).json({ message: 'RabbitMQ channel not available' });
        }
        await channel.sendToQueue('task_queue', Buffer.from(JSON.stringify(message)));
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getallTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
