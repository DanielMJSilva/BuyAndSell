import { db } from '../db';

//* @ Gets all listings from database
 
export const getAllListingsRoute = {
    method: 'GET',
    path: '/api/listings',
    handler: async (req, h) => {
        const { results } = await db.query(
            'SELECT * FROM listings'
        );
        // send back array of records
        return results;
    }
};