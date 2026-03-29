import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { nom, email, telephone, service, message } = await req.json();

    if (!nom || !email || !telephone || !service) {
      return NextResponse.json(
        { message: 'Veuillez remplir tous les champs obligatoires.' },
        { status: 400 }
      );
    }

    await prisma.jobRequest.create({
      data: {
        serviceType: service,
        description: `Nom: ${nom} | Tél: ${telephone} | ${message || ''}`,
        frequency: 'PONCTUEL',
        status: 'PENDING_ESTIMATE',
        client: {
          connectOrCreate: {
            where: { email },
            create: {
              email,
              role: 'CLIENT',
              passwordHash: '',
            }
          }
        }
      }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { message: 'Erreur serveur.' },
      { status: 500 }
    );
  }
}
