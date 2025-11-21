"use server"

import Connection from "../utils/config/db"

export async function ProductAction(recordDetails) {
    await Connection();
    console.log("Record Details in Action:", recordDetails);
}