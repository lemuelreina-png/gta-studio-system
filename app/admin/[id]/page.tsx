import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function IntakeDetailPage({ params }: { params: { id: string } }) {
  const intake = await prisma.intake.findUnique({
    where: { id: Number(params.id) },
  });

  if (!intake) return notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Intake #{intake.id}</h1>
        <div className="space-x-4 text-sm">
          <Link href="/admin" className="text-blue-700 hover:underline">
            Back
          </Link>
          <Link href={`/admin/${intake.id}/print`} className="text-blue-700 hover:underline">
            Print View
          </Link>
        </div>
      </div>

      <section className="space-y-3 rounded-xl bg-white p-6 shadow">
        <Detail label="Client name" value={intake.clientName} />
        <Detail label="Phone" value={intake.phone} />
        <Detail label="Email" value={intake.email} />
        <Detail label="Instagram" value={intake.instagram} />
        <Detail label="Design summary" value={intake.designSummary} />
        <Detail label="Placement" value={intake.placement} />
        <Detail label="Size estimate" value={intake.sizeEstimate} />
        <Detail
          label="Appointment"
          value={
            intake.appointmentDate
              ? `${new Date(intake.appointmentDate).toLocaleDateString()} ${intake.appointmentTime || ''}`
              : intake.appointmentTime || null
          }
        />
        <Detail label="Deposit status" value={intake.depositStatus.replace('_', ' ')} />
        <Detail label="Deposit amount" value={intake.depositAmount ? `$${intake.depositAmount.toFixed(2)}` : null} />
        <Detail label="Notes" value={intake.notes} />
        <Detail label="Reference image" value={intake.referenceImagePath} />
      </section>
    </main>
  );
}

function Detail({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="text-sm text-slate-900">{value || '—'}</p>
    </div>
  );
}
