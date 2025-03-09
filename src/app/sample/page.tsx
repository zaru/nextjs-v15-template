import { SampleItem } from "@/app/sample/_components/SampleItem";
import { prisma } from "@/lib/prisma";

export default async function Page() {
  const samples = await prisma.sample.findMany();
  return (
    <div>
      {samples.map((sample) => (
        <SampleItem sample={sample} key={sample.id} />
      ))}
    </div>
  );
}
