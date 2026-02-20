import { Suspense } from "react";
import type { Metadata } from "next";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import Filter, { type FilterValue } from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";
import CabinsHeader from "../_components/CabinsHeader";

export const revalidate = 3600;

export const metadata: Metadata = {
	title: "Cabins",
};

const validFilters: FilterValue[] = ["all", "small", "medium", "large"];

function isValidFilter(value: string): value is FilterValue {
	return validFilters.includes(value as FilterValue);
}

interface PageProps {
	searchParams: Promise<{ capacity?: string }>;
}

/**
 * Render the Cabins page with header, filter controls, a filtered cabin list, and a reservation reminder.
 *
 * Derives the active filter from `searchParams.capacity` (defaults to `"all"`) and constrains it to the allowed filter values before passing it to the cabin list.
 *
 * @param searchParams - A promise resolving to route query parameters; may include `capacity` to select which cabins are shown
 * @returns The page JSX element for the Cabins route
 */
export default async function Page({ searchParams }: PageProps) {
	const params = await searchParams;
	const rawFilter = params?.capacity ?? "all";
	const filter: FilterValue = isValidFilter(rawFilter) ? rawFilter : "all";

	return (
		<div className="mx-auto mt-6 max-w-6xl px-4 sm:mt-8 sm:px-6 lg:px-0">
			<CabinsHeader />
			<div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center sm:justify-end">
				<Filter />
			</div>
			<Suspense fallback={<Spinner />} key={filter}>
				<CabinList filter={filter} />
				<ReservationReminder />
			</Suspense>
		</div>
	);
}