import express from 'express';
import { deleteUserById, getUsers } from '../db/users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers(); // Assuming you have a function called getUsers()

        return res.status(200).json(users);
    } catch (error) {
        console.error(error); // Changed from console.log to console.error
        return res.sendStatus(500); // Changed from 400 to 500 for server error
    }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        // Assuming `deleteUserById` is a valid function that deletes a user by their ID
        const deletedUser = await deleteUserById(id);

        // Return a success message or relevant data
        return res.json({ message: `User with ID ${id} has been successfully deleted.`, deletedUser });
    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
};
