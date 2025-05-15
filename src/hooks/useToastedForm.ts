import { addToastQueue } from "@/components/ui/GlobalToastRegion";
import { type FormEvent, startTransition, useActionState, useRef } from "react";
import { requestFormReset } from "react-dom";

type ErrorType = Record<string, string[]>;

export type FormSubmitResult<Payload> = {
  success: boolean | null;
  payload: Payload;
  errors?: ErrorType; // PartialでPayloadから生成したいが、配列やネスト構造があるとFormDataのnameとPayloadのkeyが一致しないため汎用的にした
  toastMessage?: string;
};

interface Props<Payload> {
  submitAction: (formData: FormData) => Promise<FormSubmitResult<Payload>>;
  initialPayload: Payload;
  options?: {
    resetOnSuccess?: boolean; // default: true
    beforeSubmit?: (formData: FormData) => FormData;
    onSuccess?: () => void;
    onError?: () => void;
  };
}

/**
 * フォームサブミット結果に応じてToastを表示させる
 * 内部でReactのuseActionStateを使用している
 *
 * ジェネリクス
 * Payload: Server Actionsで利用したいデータ構造（Zodスキーマから生成しても良い）
 *          引数自体はFormDataで受取、パース後Zodでバリデーションを行う
 *
 * 引数
 * submitAction: Server Actionsの関数
 * initialPayload: フォームの初期値
 * options: {
 *   resetOnSuccess: サブミット成功時にフォームをリセットするか（デフォルト: true）
 *   beforeSubmit: サブミット前に実行する関数（フォームの値を加工するなど）
 *   onSuccess: サブミット成功時のコールバック関数（モーダルを閉じるなど）
 *   onError: サブミット失敗時のコールバック関数（エラー時に特別な処理をする）
 * }
 */
export function useToastedForm<Payload>({
  submitAction,
  initialPayload,
  options,
}: Props<Payload>) {
  // useRefでフォーム要素を保持
  const formRef = useRef<HTMLFormElement | null>(null);

  const submit = async (
    _prevState: FormSubmitResult<Payload>,
    formData: FormData,
  ) => {
    const result = await submitAction(
      options?.beforeSubmit ? options.beforeSubmit(formData) : formData,
    );
    if (result.success) {
      if (result.toastMessage) {
        addToastQueue({
          status: "success",
          message: result.toastMessage,
        });
      }
      if (options?.onSuccess) {
        options.onSuccess();
      }
      // サブミット成功時にフォームを初期値でリセット（デフォルト動作）
      if (options?.resetOnSuccess ?? true) {
        result.payload = initialPayload;
        startTransition(() => {
          if (formRef.current) {
            requestFormReset(formRef.current);
          }
        });
      }
    } else if (result.success === false) {
      if (options?.onError) {
        options.onError();
      }
      if (result.toastMessage) {
        addToastQueue({
          status: "error",
          message: result.toastMessage,
        });
      }
    }
    return result;
  };

  const [state, formAction, isPending] = useActionState(submit, {
    payload: initialPayload,
    success: null,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formRef.current = event.currentTarget;
    const formData = new FormData(formRef.current);
    startTransition(() => {
      formAction(formData);
    });
  };

  return {
    state,
    handleSubmit,
    isPending,
  };
}
