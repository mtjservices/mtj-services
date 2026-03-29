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
        description: `Nom: ${nom} | Téléphone: ${telephone} | ${message || ''}`,
        frequency: 'PONCTUEL',
        status: 'PENDING_ESTIMATE',
        paymentMethod: 'PENDING',
        client: {
          connectOrCreate: {
            where: { email },
            create: {
              email,
              role: 'CLIENT',
              password: '',
            }
          }
        }
      }
    });

    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'MTJ Services <noreply@mtjservices.ca>',
          to: ['ismaelaj@icloud.com'],
          subject: `🌿 Nouvelle demande — ${service}`,
          html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto"><div style="background:#1e5c0f;padding:30px;text-align:center;border-radius:12px 12px 0 0"><h1 style="color:#a8d400;margin:0">MTJ Services</h1><p style="color:rgba(255,255,255,0.7);margin:8px 0 0">Nouvelle demande reçue</p></div><div style="background:#f9fafb;padding:30px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb"><h2 style="color:#1e5c0f;margin-top:0">📋 Détails</h2><table style="width:100%;border-collapse:collapse"><tr style="border-bottom:1px solid #e5e7eb"><td style="padding:12px 0;font-weight:bold;width:140px">👤 Nom</td><td style="padding:12px 0;color:#6b7280">${nom}</td></tr><tr style="border-bottom:1px solid #e5e7eb"><td style="padding:12px 0;font-weight:bold">📧 Email</td><td style="padding:12px 0;color:#6b7280">${email}</td></tr><tr style="border-bottom:1px solid #e5e7eb"><td style="padding:12px 0;font-weight:bold">📞 Téléphone</td><td style="padding:12px 0;color:#6b7280">${telephone}</td></tr><tr style="border-bottom:1px solid #e5e7eb"><td style="padding:12px 0;font-weight:bold">🌿 Service</td><td style="padding:12px 0;color:#6b7280">${service}</td></tr><tr><td style="padding:12px 0;font-weight:bold;vertical-align:top">💬 Message</td><td style="padding:12px 0;color:#6b7280">${message || 'Aucun message'}</td></tr></table><div style="margin-top:24px;text-align:center"><a href="https://mtjservices.ca/dashboard/admin" style="background:#1e5c0f;color:#a8d400;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block">Voir dans le panneau admin →</a></div></div></div>`,
        }),
      });
    } catch (emailError) {
      console.error('Erreur email:', emailError);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { message: 'Erreur serveur.' },
      { status: 500 }
    );
  }
}
