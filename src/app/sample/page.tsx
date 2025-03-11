import { SampleForm } from "@/app/sample/_components/SampleForm";
import { SampleItem } from "@/app/sample/_components/SampleItem";
import { prisma } from "@/lib/prisma";

export default async function Page() {
  const samples = await prisma.sample.findMany();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">サンプル管理</h1>
      <SampleForm />
      <div className="space-y-2">
        {samples.map((sample) => (
          <SampleItem sample={sample} key={sample.id} />
        ))}
      </div>
    </div>
  );
}
