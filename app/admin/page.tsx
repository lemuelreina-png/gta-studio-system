import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const intakes = await prisma.intake.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Intake Admin</h1>
        <Link href="/" className="text-sm text-blue-700 hover:underline">
          New Intake
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Placement</th>
              <th className="px-4 py-3">Deposit</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Details</th>
            </tr>
          </thead>
          <tbody>
            {intakes.map((intake) => (
              <tr key={intake.id} className="border-t">
                <td className="px-4 py-3">{intake.clientName}</td>
                <td className="px-4 py-3">{intake.placement}</td>
                <td className="px-4 py-3">{intake.depositStatus.replace('_', ' ')}</td>
                <td className="px-4 py-3">{new Date(intake.createdAt).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/${intake.id}`} className="text-blue-700 hover:underline">
                    Open
                  </Link>
                </td>
              </tr>
            ))}
            {intakes.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-center text-slate-500" colSpan={5}>
                  No intake records found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </main>
  );
}
