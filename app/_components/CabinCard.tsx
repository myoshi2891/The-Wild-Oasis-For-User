"use client";

import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import type { CabinListItem } from "../_lib/data-service";
import { useLanguage } from "./LanguageContext";

interface CabinCardProps {
	cabin: CabinListItem;
}

/**
 * Render a card summarizing a cabin with image, capacity, pricing, and a link to its details page.
 *
 * Displays the cabin image and name, shows capacity with the localized capacity string, and presents
 * pricing where a discounted price is shown when `discount > 0` (the original price is rendered struck through);
 * otherwise the regular price is shown. Includes a link to `/cabins/{id}` using the cabin's `id`.
 *
 * @param cabin - Cabin data containing `id`, `name`, `maxCapacity`, `regularPrice`, `discount`, and optionally `image`
 */
function CabinCard({ cabin }: CabinCardProps) {
	const { t } = useLanguage();
	const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

	return (
		<div className="group flex flex-col overflow-hidden border border-primary-800 motion-safe:transition-[transform,box-shadow] motion-safe:duration-300 motion-safe:hover:-translate-y-1.5 hover:shadow-lg hover:shadow-primary-900/60">
			<div className="relative h-52 w-full overflow-hidden sm:h-60">
				<Image
					src={image ?? "/placeholder-cabin.png"}
					fill
					alt={t.cabinDetails.cabinHeading.replace("{name}", name)}
					className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
					sizes="(min-width: 1280px) 380px, (min-width: 768px) 50vw, 100vw"
				/>
			</div>

			<div className="flex flex-1 flex-col bg-primary-950">
				<div className="px-5 py-5 sm:px-6 sm:py-6">
					<h3 className="text-2xl font-semibold text-accent-500">
						{t.cabinDetails.cabinHeading.replace("{name}", name)}
					</h3>

					<div className="mt-4 flex items-center justify-between gap-4 text-primary-200">
						<div className="flex items-center gap-2">
							<UsersIcon className="h-5 w-5 shrink-0 text-primary-600" />
							<p className="whitespace-nowrap text-sm sm:text-base">
								{t.cabinDetails.capacity.split("{maxCapacity}").map((part, i, arr) =>
									i < arr.length - 1 ? (
										<span key={i}>
											{part}
											<span className="font-semibold">{maxCapacity}</span>
										</span>
									) : (
										<span key={i}>{part}</span>
									),
								)}
							</p>
						</div>

						<div className="flex items-baseline gap-2 text-primary-100">
							{discount > 0 ? (
								<>
									<span className="text-2xl font-[350] sm:text-3xl">
										${regularPrice - discount}
									</span>
									<span className="text-xs font-semibold text-primary-600 line-through">
										${regularPrice}
									</span>
								</>
							) : (
								<span className="text-2xl font-[350] sm:text-3xl">
									${regularPrice}
								</span>
							)}
							<span className="text-sm text-primary-300">
								{t.cabinCard.perNight}
							</span>
						</div>
					</div>
				</div>

				<div className="mt-auto border-t border-primary-800 text-right">
					<Link
						href={`/cabins/${id}`}
						className="block px-6 py-4 font-semibold transition-colors duration-150 hover:bg-accent-600 hover:text-primary-900"
					>
						{t.cabinCard.detailsBtn}
					</Link>
				</div>
			</div>
		</div>
	);
}

export default CabinCard;