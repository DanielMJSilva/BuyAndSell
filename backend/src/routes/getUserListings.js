import { Boom } from '@hapi/boom';
import * as admin from 'firebase-admin';
import { db } from "../db";

export const getUserListingsRoute = {
    method: 'GET',
    path: '/api/users/{userId}/listings',
    handler: async (req, h) => {
        const token = req.headers.authtoken;// get token
        const user = await admin.auth().verifyIdToken(token);// verify token
        const userId = req.params.userId;

        //! TODO: make sure current user id the one requesting listings
        if (user.user_id !== userId) throw Boom.unauthorized('Users can only access their own listings!');

        const { results } = await db.query(
            'SELECT * FROM listings WHERE user_id=?',
            [userId],
        );
        return results;
    }
}