"use client";

import { useOptimistic } from "react";
import { deleteBooking } from "../_lib/actions";
import ReservationCard from "./ReservationCard";
import type { BookingListItem } from "../_lib/data-service";

interface ReservationListProps {
	bookings: BookingListItem[];
}

/**
 * Render a reservation list that optimistically removes bookings from the UI when deleted.
 *
 * The component displays the provided bookings and updates the list immediately on delete while performing server-side deletion.
 *
 * @param bookings - The initial array of bookings to display
 * @returns The unordered list element containing a ReservationCard for each booking
 */
function ReservationList({ bookings }: ReservationListProps) {
	const [optimisticBookings, optimisticDelete] = useOptimistic(
		bookings,
		(curBookings: BookingListItem[], bookingId: number) => {
			return curBookings.filter((booking) => booking.id !== bookingId);
		}
	);

	/**
	 * Remove a booking from the UI optimistically and initiate server-side deletion.
	 *
	 * @param bookingId - The identifier of the booking to remove
	 * @throws Any error from the server deletion request is rethrown so it can be handled by an error boundary.
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