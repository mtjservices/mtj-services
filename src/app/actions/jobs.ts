'use server';

import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function createJobAction(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session || session.user.role !== 'CLIENT') {
    return { error: 'Non autorisé' };
  }

  const serviceType = formData.get('serviceType') as string;
  const frequency = formData.get('frequency') as string;
  const description = formData.get('description') as string;

  if (!serviceType || !frequency || !description) {
    return { error: 'Veuillez remplir tous les champs obligatoires.' };
  }

  try {
    await prisma.jobRequest.create({
      data: {
        clientId: session.user.id,
        serviceType,
        frequency,
        description,
        status: 'PENDING_ESTIMATE',
      }
    });

    redirect('/dashboard/client');
  } catch (e: any) {
    if (e.message === 'NEXT_REDIRECT') throw e;
    console.error(e);
    return { error: 'Erreur lors de la création de la demande.' };
  }
}

export async function acceptJobAction(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session || session.user.role !== 'CLIENT') {
    return { error: 'Non autorisé' };
  }

  const jobId = formData.get('jobId') as string;
  const paymentMethod = formData.get('paymentMethod') as string;

  if (!jobId || !paymentMethod) {
    return { error: 'Paramètres invalides.' };
  }

  try {
    const job = await prisma.jobRequest.findUnique({ where: { id: jobId } });
    if (!job || job.clientId !== session.user.id || job.status !== 'ESTIMATED') {
      return { error: 'Action non valide sur cette demande.' };
    }

    await prisma.jobRequest.update({
      where: { id: jobId },
      data: {
        status: 'ACCEPTED',
        paymentMethod,
      }
    });

    redirect('/dashboard/client');
  } catch (e: any) {
    if (e.message === 'NEXT_REDIRECT') throw e;
    console.error(e);
    return { error: 'Erreur lors de l\'acceptation.' };
  }
}

export async function takeJobAction(formData: FormData) {
  const session = await getSession();
  if (!session || session.user.role !== 'WORKER') return { error: 'Non autorisé' };

  const jobId = formData.get('jobId') as string;
  
  try {
    const job = await prisma.jobRequest.findUnique({ where: { id: jobId } });
    if (!job || job.status !== 'ACCEPTED' || job.workerId !== null) {
      return { error: 'Contrat non disponible.' };
    }

    await prisma.jobRequest.update({
      where: { id: jobId },
      data: { workerId: session.user.id }
    });
  } catch (e) {
    console.error(e);
  }
  redirect('/dashboard/worker');
}

export async function completeJobAction(formData: FormData) {
  const session = await getSession();
  if (!session || session.user.role !== 'WORKER') return { error: 'Non autorisé' };

  const jobId = formData.get('jobId') as string;
  
  try {
    const job = await prisma.jobRequest.findUnique({ where: { id: jobId } });
    if (!job || job.workerId !== session.user.id || job.status !== 'ACCEPTED') {
      return { error: 'Action invalide.' };
    }

    const workerProfile = await prisma.workerProfile.findUnique({ where: { userId: session.user.id } });
    if (!workerProfile) return { error: 'Profil invalide.' };

    const payoutCut = 0.60 + (workerProfile.level - 1) * 0.05;
    const workerEarnings = (job.estimatedPrice || 0) * payoutCut;

    await prisma.jobRequest.update({
      where: { id: jobId },
      data: { status: 'COMPLETED' }
    });

    const newCompleted = workerProfile.completedJobs + 1;
    let newLevel = workerProfile.level;
    const requiredJobsForNextLvl = newLevel * 5;
    if (newCompleted >= requiredJobsForNextLvl && newLevel < 5) {
      newLevel += 1;
    }

    await prisma.workerProfile.update({
      where: { userId: session.user.id },
      data: {
        completedJobs: newCompleted,
        totalEarnings: workerProfile.totalEarnings + workerEarnings,
        level: newLevel,
      }
    });

  } catch (e) {
    console.error(e);
  }
  redirect('/dashboard/worker');
}
