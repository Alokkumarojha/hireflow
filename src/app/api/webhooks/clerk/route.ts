import { headers } from 'next/headers';
import { Webhook } from 'svix';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error('CLERK_WEBHOOK_SECRET is not configured');

      return NextResponse.json(
        { error: 'Webhook secret is not configured' },
        { status: 500 }
      );
    }

    const body = await req.text();

    const headerPayload = await headers();

    const svixId = headerPayload.get('svix-id');
    const svixTimestamp = headerPayload.get('svix-timestamp');
    const svixSignature = headerPayload.get('svix-signature');

    if (!svixId || !svixTimestamp || !svixSignature) {
      return NextResponse.json(
        { error: 'Missing webhook headers' },
        { status: 400 }
      );
    }

    const wh = new Webhook(webhookSecret);

    // Verify webhook signature
    wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    });

    // Parse verified webhook body
    const event = JSON.parse(body) as {
      type: string;
      data: {
        id: string;
        first_name: string | null;
        last_name: string | null;
        email_addresses: {
          email_address: string;
        }[];
      };
    };

    console.log('Clerk webhook event:', event.type);

    if (event.type === 'user.created') {
      console.log('Clerk user data:', JSON.stringify(event.data, null, 2));

      const { id, first_name, last_name, email_addresses } = event.data;

      console.log('User ID:', id);
      console.log('Email addresses:', email_addresses);

      const email = email_addresses?.[0]?.email_address;

      console.log('Email:', email);

      if (!email) {
        return NextResponse.json(
          { error: 'User email not found' },
          { status: 400 }
        );
      }

      const name = [first_name, last_name].filter(Boolean).join(' ') || null;

      try {
        await prisma.user.upsert({
          where: {
            clerkId: id,
          },
          update: {
            name,
            email,
          },
          create: {
            clerkId: id,
            name,
            email,
          },
        });
        console.log('User created in database:', email);
      } catch (error) {
        console.error('Prisma user creation error:', error);

        throw error;
      }

      console.log('User created in database:', email);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Clerk webhook error:', error);

    return NextResponse.json({ error: 'Invalid webhook' }, { status: 400 });
  }
}
