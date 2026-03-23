'use server';

import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'ismaelaj@icloud.com';

export async function approveWorkerAction(formData: FormData) {
  const session = await getSession();
  if (!session || session.user.role !== 'ADMIN') return;

  const workerId = formData.get('workerId') as string;
  try {
    const worker = await prisma.workerProfile.update({
      where: { userId: workerId },
      data: { status: 'APPROVED' },
      include: { user: true }
    });

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ADMIN_EMAIL,
      subject: '✅ Nouvel associé approuvé',
      html: `<h2>Associé approuvé</h2><p>Email: <strong>${worker.user.email}</strong></p>`
    });
  } catch (e) {
    console.error(e);
  }
  redirect('/dashboard/admin');
}

export async function estimateJobAction(formData: FormData) {
  const session = await getSession();
  if (!session || session.user.role !== 'ADMIN') return;

  const jobId = formData.get('jobId') as string;
  const estimatedPriceStr = formData.get('estimatedPrice');
  
  if (!jobId || !estimatedPriceStr) return;
  
  const estimatedPrice = parseFloat(estimatedPriceStr as string);
  
  try {
    if (estimatedPrice > 0) {
      const job = await prisma.jobRequest.update({
        where: { id: jobId },
        data: { estimatedPrice, status: 'ESTIMATED' },
        include: { client: true }
      });

      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: ADMIN_EMAIL,
        subject: '💰 Estimation envoyée',
        html: `<h2>Estimation envoyée</h2><p>Service: <strong>${job.serviceType}</strong></p><p>Client: <strong>${job.client.email}</strong></p><p>Prix: <strong>${estimatedPrice}$</strong></p>`
      });
    }
  } catch (e) {
    console.error(e);
  }
  redirect('/dashboard/admin');
}