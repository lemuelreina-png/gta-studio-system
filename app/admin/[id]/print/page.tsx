import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function IntakePrintPage({ params }: { params: { id: string } }) {
  const intake = await prisma.intake.findUnique({
    where: { id: Number(params.id) },
  });

  if (!intake) return notFound();

  return (
    <main className="mx-auto max-w-4xl bg-white p-8 text-black print:p-4">
      <h1 className="mb-6 text-3xl font-bold">Client Intake Sheet</h1>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <PrintField label="Client Name" value={intake.clientName} />
        <PrintField label="Phone" value={intake.phone} />
        <PrintField label="Email" value={intake.email} />
        <PrintField label="Instagram" value={intake.instagram} />
        <PrintField label="Placement" value={intake.placement} />
        <PrintField label="Size Estimate" value={intake.sizeEstimate} />
        <PrintField
          label="Appointment Date"
          value={intake.appointmentDate ? new Date(intake.appointmentDate).toLocaleDateString() : null}
        />
        <PrintField label="Appointment Time" value={intake.appointmentTime} />
        <PrintField label="Deposit Status" value={intake.depositStatus.replace('_', ' ')} />
        <PrintField label="Deposit Amount" value={intake.depositAmount ? `$${intake.depositAmount.toFixed(2)}` : null} />
      </div>

      <section className="mt-6">
        <h2 className="mb-1 text-sm font-semibold uppercase text-slate-600">Design Summary</h2>
        <p className="whitespace-pre-wrap border border-slate-300 p-3">{intake.designSummary}</p>
      </section>

      <section className="mt-6">
        <h2 className="mb-1 text-sm font-semibold uppercase text-slate-600">Notes</h2>
        <p className="min-h-24 whitespace-pre-wrap border border-slate-300 p-3">{intake.notes || ''}</p>
      </section>

      {intake.referenceImagePath ? (
        <section className="mt-6">
          <h2 className="mb-1 text-sm font-semibold uppercase text-slate-600">Reference Image</h2>
          <img src={intake.referenceImagePath} alt="Reference" className="max-h-96 border border-slate-300" />
        </section>
      ) : null}
    </main>
  );
}

function PrintField({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="border border-slate-300 p-3">
      <p className="text-xs uppercase text-slate-500">{label}</p>
      <p>{value || '—'}</p>
    </div>
  );
}
