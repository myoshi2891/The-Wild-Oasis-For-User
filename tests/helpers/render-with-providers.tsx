import { render, type RenderOptions } from "@testing-library/react";
import { LanguageProvider } from "../../app/_components/LanguageContext";
import type { ReactElement, ReactNode } from "react";

function AllProviders({ children }: { children: ReactNode }) {
	return <LanguageProvider>{children}</LanguageProvider>;
}

/**
 * テスト用レンダーユーティリティ。
 * LanguageProvider でラップした状態でコンポーネントをレンダリングする。
 */
export function renderWithProviders(
	ui: ReactElement,
	options?: Omit<RenderOptions, "wrapper">
) {
	return render(ui, { wrapper: AllProviders, ...options });
}
