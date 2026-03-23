'use server';

import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function approveWorkerAction(formData: FormData) {
  const session = await getSession();
  if (!session || session.user.role !== 'ADMIN') return;

  const workerId = formData.get('workerId') as string;
  try {
    await prisma.workerProfile.update({
      where: { userId: workerId },
      data: { status: 'APPROVED' }
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
      await prisma.jobRequest.update({
        where: { id: jobId },
        data: { 
          estimatedPrice,
          status: 'ESTIMATED'
        }
      });
    }
  } catch (e) {
    console.error(e);
  }
  redirect('/dashboard/admin');
}
