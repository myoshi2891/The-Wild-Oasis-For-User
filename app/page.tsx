import Image from "next/image";
import HeroClient from "./_components/HeroClient";
import bg from "@/public/bg.png";

/**
 * Renders the landing page hero with a full-bleed background image and client-rendered hero content.
 *
 * @returns The page's JSX element containing the hero section.
 */
export default function Page() {
	return (
		<div className="relative min-h-screen">
			<Image
				src={bg}
				fill
				quality={80}
				placeholder="blur"
				className="object-cover object-top"
				alt="Mountains and forests with two cabins"
			/>

			<HeroClient />
		</div>
	);
}