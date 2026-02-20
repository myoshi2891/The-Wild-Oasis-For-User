import Image from "next/image";
import type { Metadata } from "next";
import image1 from "@/public/about-1.jpg";
import image2 from "@/public/about-2.jpg";
import { getCabins } from "../_lib/data-service";
import AboutContent from "../_components/AboutContent";

export const revalidate = 86400; //3600 * 24

export const metadata: Metadata = {
	title: "About",
};

/**
 * Renders the About page and supplies it with current cabin data.
 *
 * Displays the AboutContent component (given the current cabin count) alongside two responsive images.
 *
 * @returns The React element for the About page
 */
export default async function Page() {
	const cabins = await getCabins();
	return (
		<div className="grid grid-cols-1 items-center gap-x-24 gap-y-16 text-lg md:grid-cols-5 md:gap-y-32">
			<AboutContent cabinsCount={cabins.length} />

			<div className="relative aspect-square md:col-span-2 md:col-start-4 md:row-start-1">
				<Image
					src={image1}
					fill
					placeholder="blur"
					className="object-cover"
					quality={80}
					sizes="(min-width: 1024px) 40vw, 100vw"
					alt="Family sitting around a fire pit in front of cabin"
				/>
			</div>

			<div className="relative aspect-square md:col-span-2 md:col-start-4 md:row-start-2">
				<Image
					src={image2}
					fill
					placeholder="blur"
					className="object-cover"
					sizes="(min-width: 1024px) 40vw, 100vw"
					alt="Family that manages The Wild Oasis"
				/>
			</div>
		</div>
	);
}