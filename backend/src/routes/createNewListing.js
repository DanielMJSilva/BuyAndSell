import { v4 as uuid } from "uuid";
import * as admin from 'firebase-admin';
import { db } from "../db";

export const createNewListingRoute = {
  method: "POST",
  path: "/api/listings",
  handler: async (req, h) => {
    const token = req.headers.authtoken;
    const user = await admin.auth().verifyIdToken(token);
    const id = uuid(); // new id for listing
    let userId;
    if(user) {
      userId = user.user_id;
    }
    // destructure all info from payload
    const { name = "", description = "", price = 0 } = req.payload;
    const views = 0;

    // Query
    await db.query(`
        INSERT INTO listings (id, name, description, price, user_id, views)
        VALUES (?, ?, ?, ?, ?, ?);
    `, [id, name, description, price, userId, views]);
    
    // return values
    return {id, name, description, price, user_id: userId, views}
  },
};
