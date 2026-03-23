'use server';

import { prisma } from '@/lib/prisma';
import { createSession } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

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
    
    // Will throw redirect internally
    if (user.role === 'ADMIN') redirect('/dashboard/admin');
    if (user.role === 'WORKER') redirect('/dashboard/worker');
    redirect('/dashboard/client');
  } catch (e: any) {
    // Re-throw redirect error explicitly so Next.js handles it
    if (e.message === 'NEXT_REDIRECT') {
      throw e;
    }
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
      data: {
        email,
        passwordHash,
        role: 'CLIENT',
      }
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
          create: {
            status: 'PENDING',
            level: 1,
          }
        }
      }
    });

    await createSession({ id: user.id, email: user.email, role: user.role });
    redirect('/dashboard/worker');
  } catch (e: any) {
    if (e.message === 'NEXT_REDIRECT') throw e;
    console.error(e);
    return { error: 'Une erreur est survenue lors de l\'inscription.' };
  }
}
