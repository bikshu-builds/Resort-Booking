"use server";

import { auth } from "../auth";
import Connection from "../utils/config/db";
import Booking from "../utils/models/Bookings";
import User from "../utils/models/User";

export async function bookingActions(bookingData, selectedDates) {
    try {
        await Connection();
        
        const session = await auth();
        const email = session?.email;

        if (!email) throw new Error("User not authenticated");

        const userDoc = await User.findOne({ email });
        if (!userDoc) throw new Error("User not found");

        const userId = userDoc._id;

        console.log("Booking Data Received:", bookingData, selectedDates);

        const { price, offer, image } = bookingData;
        const { startDate, endDate } = selectedDates;

        const booking = await Booking.create({
            startdate: startDate,
            enddate: endDate,
            price,
            offer,
            image,
            user: userId,
        });

        console.log("Booking saved:", booking);

        // Add booking to user's booking array
        await User.findByIdAndUpdate(
            userId,
            { $push: { bookings: booking._id } },
            { new: true }
        );

        return {
            success: true,
            booking: JSON.parse(JSON.stringify(booking))
        };

    } catch (error) {
        console.error("Booking Error:", error);
        return {
            success: false,
            error: error.message
        };
    }
}
