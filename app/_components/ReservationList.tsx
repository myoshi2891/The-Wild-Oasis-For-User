"use client";

import { useOptimistic } from "react";
import { deleteBooking } from "../_lib/actions";
import ReservationCard from "./ReservationCard";
import type { BookingListItem } from "../_lib/data-service";

interface ReservationListProps {
	bookings: BookingListItem[];
}

/**
 * Renders a list of reservations and applies an optimistic removal when a booking is deleted.
 *
 * @param bookings - The initial array of bookings to display
 * @returns The unordered list element containing a ReservationCard for each booking
 */

/**
 * Optimistically removes a booking from the UI and initiates server-side deletion.
 *
 * @param bookingId - The identifier of the booking to remove
 * @throws Any error from the server deletion request is rethrown so it can be handled by an error boundary.
 */
function ReservationList({ bookings }: ReservationListProps) {
	const [optimisticBookings, optimisticDelete] = useOptimistic(
		bookings,
		(curBookings: BookingListItem[], bookingId: number) => {
			return curBookings.filter((booking) => booking.id !== bookingId);
		}
	);

	/**
	 * Removes a booking from the UI optimistically and initiates server-side deletion.
	 *
	 * @param bookingId - The ID of the booking to remove
	 * @throws Rethrows any error from the server deletion request so it can be handled by an error boundary.
	 */
	async function handleDelete(bookingId: number) {
		optimisticDelete(bookingId);
		try {
			await deleteBooking(bookingId);
		} catch (error) {
			// Server Action handles revalidation, re-throw for error boundary
			throw error;
		}
	}

	return (
		<ul className="reservation-list space-y-6">
			{optimisticBookings.map((booking) => (
				<li key={booking.id}>
					<ReservationCard onDelete={handleDelete} booking={booking} />
				</li>
			))}
		</ul>
	);
}

export default ReservationList;