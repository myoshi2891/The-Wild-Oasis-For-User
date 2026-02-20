import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import CabinList from "../../app/_components/CabinList";
import { renderWithProviders } from "../helpers/render-with-providers";
import type { Cabin } from "@/types/domain";

const { getCabinsMock } = vi.hoisted(() => ({
  getCabinsMock: vi.fn<() => Promise<Cabin[]>>(),
}));

vi.mock("../../app/_lib/data-service", () => ({
  getCabins: getCabinsMock,
}));

const baseCabin = {
  regularPrice: 200,
  discount: 0,
  image: "/cabin.jpg",
  created_at: "2024-01-01T00:00:00.000Z",
  description: null,
};

describe("CabinList", () => {
  it("renders nothing when the cabin list is empty", async () => {
    getCabinsMock.mockResolvedValue([]);

    const ui = await CabinList({ filter: "all" });
    const { container } = renderWithProviders(ui);

    expect(container.firstChild).toBeNull();
  });

  it("renders cabins in the provided order", async () => {
    getCabinsMock.mockResolvedValue([
      { ...baseCabin, id: 1, name: "Alpha", maxCapacity: 2 },
      { ...baseCabin, id: 2, name: "Bravo", maxCapacity: 4 },
    ]);

    const ui = await CabinList({ filter: "all" });
    renderWithProviders(ui);

    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings.map((heading) => heading.textContent)).toEqual([
      "Cabin Alpha",
      "Cabin Bravo",
    ]);
  });

  it("filters cabins by capacity boundaries", async () => {
    getCabinsMock.mockResolvedValue([
      { ...baseCabin, id: 1, name: "Tiny", maxCapacity: 3 },
      { ...baseCabin, id: 2, name: "Mid", maxCapacity: 4 },
      { ...baseCabin, id: 3, name: "Big", maxCapacity: 8 },
    ]);

    const smallUi = await CabinList({ filter: "small" });
    const { unmount } = renderWithProviders(smallUi);
    expect(screen.getByText("Cabin Tiny")).toBeInTheDocument();
    expect(screen.queryByText("Cabin Mid")).not.toBeInTheDocument();

    unmount();

    const { unmount: unmountMedium } = renderWithProviders(
      await CabinList({ filter: "medium" })
    );
    expect(screen.getByText("Cabin Mid")).toBeInTheDocument();
    expect(screen.queryByText("Cabin Big")).not.toBeInTheDocument();
    unmountMedium();

    renderWithProviders(await CabinList({ filter: "large" }));
    expect(screen.getByText("Cabin Big")).toBeInTheDocument();
    expect(screen.queryByText("Cabin Tiny")).not.toBeInTheDocument();
  });
});
