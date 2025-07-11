import { notFound } from "next/navigation";

export default async function JobDetailPage({ params }: { params: { jobId: string } }) {
  // Fetch job data from your API or database using params.jobId
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${params.jobId}`);
  if (!res.ok) return notFound();

  const job = await res.json();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-gray-600">{job.location}</p>
      <div className="mt-4">{job.description}</div>
      {/* Add more job details as needed */}
    </div>
  );
}
