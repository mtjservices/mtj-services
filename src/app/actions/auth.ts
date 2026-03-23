'use server';

import { prisma } from '@/lib/prisma';
import { createSession } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'ismaelaj@icloud.com';

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) return { error: 'Veuillez remplir tous les champs.' };

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { error: 'Identifiants invalides.' };

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) return { error: 'Identifiants invalides.' };

    await createSession({ id: user.id, email: user.email, role: user.role });
    
    if (user.role === 'ADMIN') redirect('/dashboard/admin');
    if (user.role === 'WORKER') redirect('/dashboard/worker');
    redirect('/dashboard/client');
  } catch (e: any) {
    if (e.message === 'NEXT_REDIRECT') throw e;
    console.error(e);
    return { error: 'Une erreur est survenue lors de la connexion.' };
  }
}

export async function registerClientAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  if (!email || !password) return { error: 'Veuillez remplir tous les champs.' };
  if (password.length < 6) return { error: 'Le mot de passe doit contenir au moins 6 caractères.' };

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return { error: 'Cet email est déjà utilisé.' };

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, passwordHash, role: 'CLIENT' }
    });

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ADMIN_EMAIL,
      subject: '👤 Nouveau client inscrit sur MTJ Services',
      html: `
        <h2>Nouveau client inscrit !</h2>
        <p>Email : <strong>${email}</strong></p>
        <p>Date : <strong>${new Date().toLocaleDateString('fr-CA')}</strong></p>
      `
    });

    await createSession({ id: user.id, email: user.email, role: user.role });
    redirect('/dashboard/client');
  } catch (e: any) {
    if (e.message === 'NEXT_REDIRECT') throw e;
    console.error(e);
    return { error: 'Une erreur est survenue lors de l\'inscription.' };
  }
}

export async function registerWorkerAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  if (!email || !password) return { error: 'Veuillez remplir tous les champs.' };
  if (password.length < 6) return { error: 'Le mot de passe doit contenir au moins 6 caractères.' };

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return { error: 'Cet email est déjà utilisé.' };

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: 'WORKER',
        workerProfile: {
          create: { status: 'PENDING', level: 1 }
        }
      }
    });

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ADMIN_EMAIL,
      subject: '🧑‍🔧 Nouvelle candidature d\'associé sur MTJ Services',
      html: `
        <h2>Nouvelle candidature d'associé !</h2>
        <p>Email : <strong>${email}</strong></p>
        <p>Date : <strong>${new Date().toLocaleDateString('fr-CA')}</strong></p>
        <p>Connectez-vous au panneau admin pour approuver la candidature.</p>
      `
    });

    await createSession({ id: user.id, email: user.email, role: user.role });
    redirect('/dashboard/worker');
  } catch (e: any) {
    if (e.message === 'NEXT_REDIRECT') throw e;
    console.error(e);
    return { error: 'Une erreur est survenue lors de l\'inscription.' };
  }
}