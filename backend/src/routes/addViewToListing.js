import { db } from "../db";

//* @Post: increases the listing views 

export const addViewToListingRoute = {
    method: 'POST',
    path: '/api/listings/{id}/add-view',
    handler: async (req, h) => {
        const id = req.params.id;
        await db.query(
            'UPDATE listings SET views=views+1 WHERE id=?',
            [id],
        );
        // query updated data
        const { results } = await db.query(
            'SELECT * FROM listings WHERE id=?',
            [id],
        );
        // send back updated data
        const updatedListing = results[0];
        return updatedListing;
    }
};