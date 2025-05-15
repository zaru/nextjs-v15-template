"use client";

import { type Payload, type Report, submit } from "@/app/form/_actions/submit";
import { Button } from "@/components/ui/Button";
import { Checkbox, CheckboxGroup } from "@/components/ui/Checkbox";
import { useFieldList } from "@/components/ui/FieldList";
import { Form } from "@/components/ui/Form";
import { TextField } from "@/components/ui/TextField";
import { useToastedForm } from "@/hooks/useToastedForm";

export default function Page() {
  const { state, handleSubmit, isPending } = useToastedForm<Payload>({
    submitAction: submit,
    initialPayload: {
      title: "",
      user: {
        name: "",
        contact: {
          email: "",
          phone: "",
        },
      },
      reports: [
        {
          id: 100,
          content: "hogehoge",
          _destroy: false,
        },
      ],
      favorites: [],
      agreement: false,
    },
    options: {
      resetOnSuccess: true,
    },
  });

  const report = useFieldList<Report>({
    items: state.payload.reports || [],
    min: 1,
    max: 5,
  });
  const handleReportAdd = () => {
    report.append({ id: "", content: "", _destroy: false });
  };
  const handleReportRemove = (index: number) => {
    report.remove(index);
  };
  return (
    <Form
      onSubmit={handleSubmit}
      validationErrors={state.errors}
      className="p-8"
    >
      <div className="flex flex-col gap-8">
        <TextField
          label="件名"
          name="title"
          description="title"
          defaultValue={state.payload.title}
        />
        <TextField
          label="名前"
          name="user.name"
          description="user.name"
          defaultValue={state.payload.user.name}
        />
        <TextField
          label="メールアドレス"
          description="user.contact.email"
          name="user.contact.email"
          defaultValue={state.payload.user.contact.email}
        />
        <TextField
          label="電話番号"
          name="user.contact.phone"
          description="user.contact.phone"
          defaultValue={state.payload.user.contact.phone}
        />
        <div className="flex gap-6">
          <div className="flex-1 flex gap-4 flex-col">
            <div>レポート（複数回答可）</div>
            <report.FieldList name="reports" items={report.list.items}>
              {(report) => (
                <div
                  key={report.index}
                  className="bg-gray-50 border border-gray-100 rounded p-4"
                >
                  <div className="flex flex-row gap-2 items-center">
                    <TextField
                      label="内容"
                      name={`reports[${report.index}].content`}
                      description={`reports[${report.index}].content`}
                      defaultValue={report.content}
                      className="flex-1"
                    />
                    <div>
                      <Button
                        type="button"
                        variant="secondary"
                        onPress={() => handleReportRemove(report.index)}
                      >
                        削除
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </report.FieldList>
          </div>
          <div>
            <Button type="button" variant="secondary" onPress={handleReportAdd}>
              レポート追加
            </Button>
          </div>
        </div>
        <CheckboxGroup
          name="favorites[]"
          label="好きなもの"
          description="favorites"
        >
          <Checkbox
            value="apple"
            defaultSelected={state.payload.favorites?.includes("apple")}
          >
            Apple
          </Checkbox>
          <Checkbox
            value="banana"
            defaultSelected={state.payload.favorites?.includes("banana")}
          >
            Banana
          </Checkbox>
          <Checkbox
            value="orange"
            defaultSelected={state.payload.favorites?.includes("orange")}
          >
            Orange
          </Checkbox>
          <Checkbox
            value="invalid value"
            defaultSelected={state.payload.favorites?.includes("invalid value")}
          >
            Invalid value
          </Checkbox>
        </CheckboxGroup>
      </div>
      <CheckboxGroup name="agreement" label="規約" description="agreement">
        <Checkbox name="agreement" value="true">
          規約に同意する
        </Checkbox>
      </CheckboxGroup>
      <Button type="submit" isPending={isPending}>
        更新
      </Button>
    </Form>
  );
}
