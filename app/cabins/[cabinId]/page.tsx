import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import ReserveHeader from "@/app/_components/ReserveHeader";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";
import type { Metadata } from "next";

interface PageParams {
	cabinId: string;
}

interface PageProps {
	params: Promise<PageParams>;
}

/**
 * Produce page metadata for a cabin route.
 *
 * When `SKIP_SSG` equals `"true"` the title is `"Cabin"`; otherwise the title is `"Cabin <name>"` where `<name>` is the fetched cabin name for the provided `cabinId`.
 */
export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	if (process.env.SKIP_SSG === "true") {
		return { title: "Cabin" };
	}
	try {
		const { cabinId } = await params;
		const cabin = await getCabin(cabinId);
		return { title: cabin?.name ? `Cabin ${cabin.name}` : "Cabin" };
	} catch {
		return { title: "Cabin" };
	}
}

/**
 * Provides route parameters for static pre-rendering of cabin pages.
 *
 * When SKIP_SSG is set to "true", returns an empty array. Otherwise, fetches all
 * cabins and returns an array of objects each containing `cabinId` as a string.
 */
export async function generateStaticParams(): Promise<PageParams[]> {
	if (process.env.SKIP_SSG === "true") {
		return [];
	}
	const cabins = await getCabins();
	const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

	return ids;
}

/**
 * Render the cabin detail page for the route's `cabinId`.
 *
 * @param params - A promise resolving to the route parameters object containing `cabinId`
 * @returns A React element rendering the cabin details, a reservation header, and the reservation UI
 */
export default async function Page({ params }: PageProps) {
	const { cabinId } = await params;
	const cabin = await getCabin(cabinId);

	return (
		<div className="mx-auto mt-6 max-w-6xl px-4 sm:mt-8 sm:px-6 lg:px-0">
			<Cabin cabin={cabin} />
			<div className="space-y-6 sm:space-y-8">
				<ReserveHeader name={cabin.name} />
				<Suspense fallback={<Spinner />}>
					<Reservation cabin={cabin} />
				</Suspense>
			</div>
		</div>
	);
}