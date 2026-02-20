"use client";

import { useOptimistic } from "react";
import { deleteBooking } from "../_lib/actions";
import ReservationCard from "./ReservationCard";
import type { BookingListItem } from "../_lib/data-service";

interface ReservationListProps {
	bookings: BookingListItem[];
}

/**
 * Renders a list of reservation cards and performs optimistic deletion when a booking is removed.
 *
 * Removes the booking from the displayed list immediately, then invokes the server-side deletion action.
 *
 * @param bookings - Initial array of bookings to render
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
	 * Remove a booking from the UI immediately and initiate its deletion on the server.
	 *
	 * Performs an optimistic update to remove the booking with the given id from the displayed list,
	 * then attempts to delete the booking on the server. If the server deletion fails, the error is
	 * rethrown to allow higher-level error handling or revalidation.
	 *
	 * @param bookingId - The identifier of the booking to remove and delete
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