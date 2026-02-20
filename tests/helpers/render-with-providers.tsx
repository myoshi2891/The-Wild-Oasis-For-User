import { render, type RenderOptions } from "@testing-library/react";
import { beforeEach } from "vitest";
import { LanguageProvider } from "../../app/_components/LanguageContext";
import type { ReactElement, ReactNode } from "react";

// テスト間の localStorage リークを防止
beforeEach(() => {
	localStorage.clear();
});

function AllProviders({ children }: { children: ReactNode }) {
	return <LanguageProvider>{children}</LanguageProvider>;
}

/**
 * テスト用レンダーユーティリティ。
 * LanguageProvider でラップした状態でコンポーネントをレンダリングする。
 * async Server Component が null を返す場合に備え、null を許容する。
 */
export function renderWithProviders(
	ui: ReactElement | null,
	options?: Omit<RenderOptions, "wrapper">
) {
	return render(ui ?? <></>, { wrapper: AllProviders, ...options });
}
