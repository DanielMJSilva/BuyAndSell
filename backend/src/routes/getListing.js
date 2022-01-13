import  Boom  from "@hapi/boom";
import { db } from "../db";

//*@ Gets single listing from db

export const getListingRoute = {
    method: 'GET',
    path: '/api/listings/{id}',
    handler: async (req, h) => {
        // get listing id from the request
        const id = req.params.id;
        // query db with the id
        const { results } = await db.query(
            'SELECT * FROM listings WHERE id=?',
            [id],
        );
        // select the first (only) record from results
        const listing = results[0];
        // error handle: if listing is NOT found
        if (!listing) throw Boom.notFound(`Listing does not exist with id ${id}`);
        // send listing back 
        return listing;
    }
}