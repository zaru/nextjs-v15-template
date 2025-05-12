import * as deleteSampleModule from "@/app/sample/_actions/deleteSample";
import { SampleItem } from "@/app/sample/_components/SampleItem";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

// モックの設定
vi.mock("@/app/sample/_actions/deleteSample", async () => {
  const actual = await vi.importActual("@/app/sample/_actions/deleteSample");
  return {
    ...actual,
    deleteSample: vi.fn(),
  };
});

vi.mock("@/components/ui/GlobalToastRegion", () => ({
  addToastQueue: vi.fn(),
}));

// テスト前にモックをリセット
beforeEach(() => {
  vi.resetAllMocks();
});

// 各テスト後にDOMをクリーンアップ
afterEach(() => {
  cleanup();
});

test("SampleItemが正しくレンダリングされること", () => {
  const sample = {
    id: 1,
    content: "テストサンプル",
  };

  render(<SampleItem sample={sample} />);

  // IDとコンテンツが表示されていることを確認
  expect(screen.getByText(/\[1]/)).toBeInTheDocument();
  expect(screen.getByText(/テストサンプル/)).toBeInTheDocument();

  // 編集リンクが正しいURLを持っていることを確認
  const editLink = screen.getByRole("link", { name: "編集" });
  expect(editLink).toHaveAttribute("href", "/sample/1/edit");

  // 削除ボタンが存在することを確認
  const deleteButton = screen.getByRole("button", { name: "削除" });
  expect(deleteButton).toBeInTheDocument();
});

test("削除ボタンをクリックするとdeleteSampleアクションが呼び出されること", async () => {
  const sample = {
    id: 1,
    content: "テストサンプル",
  };

  // deleteSampleのモック実装
  const mockDeleteSample = vi.mocked(deleteSampleModule.deleteSample);
  mockDeleteSample.mockResolvedValue({
    success: true,
    payload: { id: 1 },
    toastMessage: "削除しました",
  });

  render(<SampleItem sample={sample} />);

  // 削除ボタンをクリック
  const deleteButton = screen.getByRole("button", { name: "削除" });
  expect(deleteButton).toBeInTheDocument();
  if (deleteButton) {
    fireEvent.click(deleteButton);
  }

  // deleteSampleが呼び出されたことを確認
  await waitFor(() => {
    expect(mockDeleteSample).toHaveBeenCalled();
  });

  // FormDataオブジェクトが渡されていることを確認
  const formDataArg = mockDeleteSample.mock.calls[0][0];
  expect(formDataArg).toBeInstanceOf(FormData);
  expect(formDataArg.get("id")).toBe("1");
});
