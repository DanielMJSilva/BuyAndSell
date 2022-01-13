import * as admin from 'firebase-admin';
import { db } from '../db';

export const updateListingRoute = {
    method: 'POST',
    path: '/api/listings/{id}',
    handler: async (req, h) => {
        const { id } = req.params;
        const { name, description, price } = req.payload;
        const token = req.headers.authtoken;
        const user = await admin.auth().verifyIdToken(token);
        const userId = user.user_id;

        //! TODO: make sure current user is the owner of listings

        // Update Listing
        await db.query(`
            UPDATE listings
                SET name=?, description=?, price=?
                WHERE id=? AND user_id=?
        `, [name, description, price, id, userId]);

        // Query updated records
        const { results } = await db.query(
            'SELECT * FROM listings WHERE id=? AND user_id=?', 
            [id, userId]
        );
        return results[0]
    }
}