import { updateSample } from "@/app/sample/_actions/updateSample";
import { CommonForm } from "@/app/sample/_components/CommonForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page(props: Props) {
  const params = await props.params;
  const sample = await prisma.sample.findUnique({
    where: { id: Number(params.id) },
  });
  if (!sample) {
    notFound();
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ID: {sample.id}の更新</h1>
      <CommonForm
        action={updateSample}
        initialPayload={{
          id: sample.id,
          content: sample.content,
        }}
      />
    </div>
  );
}
