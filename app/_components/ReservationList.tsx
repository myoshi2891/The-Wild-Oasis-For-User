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
		await deleteBooking(bookingId);
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