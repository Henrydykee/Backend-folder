import express from 'express';
import { get, merge } from 'lodash';
import { getUserBySessionToken } from '../db/users';

// export const isAuthenticated = async(req: express.Request, res: express.Response, next: express.NextFunction) => {
//     try {
//         const sessionToken = req.cookies['NKECHI-AUTH'];

//         if (!sessionToken) {
//             return res.sendStatus(403);
//         }

//         const existingUser = await getUserBySessionToken(sessionToken);

//         if (!existingUser) {
//             return res.sendStatus(403);
//         }

//         merge (req, { identity: existingUser });
    

//     } catch (error) {
//         console.log(error);
//         return res.sendStatus(400);
//     }
// }


export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['NKECHI-AUTH'];

        if (!sessionToken) {
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            return res.sendStatus(403);
        }

        // Merge the user identity into the request object
        Object.assign(req, { identity: existingUser });

        // Proceed to the next middleware
        next();
    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
};
