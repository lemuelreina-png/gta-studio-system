import { DepositStatus } from '@prisma/client';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const statusMap: Record<string, DepositStatus> = {
  'Not Paid': DepositStatus.NOT_PAID,
  Paid: DepositStatus.PAID,
  Partial: DepositStatus.PARTIAL,
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.clientName || !body.designSummary || !body.placement) {
      return NextResponse.json(
        { error: 'clientName, designSummary, and placement are required.' },
        { status: 400 },
      );
    }

    const intake = await prisma.intake.create({
      data: {
        clientName: body.clientName,
        phone: body.phone || null,
        email: body.email || null,
        instagram: body.instagram || null,
        designSummary: body.designSummary,
        placement: body.placement,
        sizeEstimate: body.sizeEstimate || null,
        appointmentDate: body.appointmentDate ? new Date(body.appointmentDate) : null,
        appointmentTime: body.appointmentTime || null,
        depositStatus: statusMap[body.depositStatus] ?? DepositStatus.NOT_PAID,
        depositAmount: body.depositAmount ? Number(body.depositAmount) : null,
        notes: body.notes || null,
        referenceImagePath: body.referenceImagePath || null,
      },
    });

    return NextResponse.json(intake, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create intake.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const intakes = await prisma.intake.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(intakes);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to load intakes.' }, { status: 500 });
  }
}
