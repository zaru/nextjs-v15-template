import { createSample } from "@/app/sample/_actions/createSample";
import { CommonForm } from "@/app/sample/_components/CommonForm";
import { SampleItem } from "@/app/sample/_components/SampleItem";
import { prisma } from "@/lib/prisma";

export default async function Page() {
  const samples = await prisma.sample.findMany();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">サンプル管理</h1>

      <div className="mb-4 p-4 border rounded">
        <h2 className="text-lg font-bold mb-2">新規サンプル追加</h2>
        <CommonForm
          action={createSample}
          initialPayload={{
            content: "",
          }}
        />
      </div>
      <div className="space-y-2">
        {samples.map((sample) => (
          <SampleItem sample={sample} key={sample.id} />
        ))}
      </div>
    </div>
  );
}
