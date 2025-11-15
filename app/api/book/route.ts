import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendBookingEmail } from '@/lib/email';
import fs from 'fs';
import path from 'path';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  service: z.string().min(1, 'Service is required'),
  date: z.string().optional(),
  location: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = bookingSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Send email
    await sendBookingEmail(data);

    // Optionally save to JSON file
    try {
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      const leadsFile = path.join(dataDir, 'leads.json');
      let leads = [];

      if (fs.existsSync(leadsFile)) {
        const fileContent = fs.readFileSync(leadsFile, 'utf-8');
        leads = JSON.parse(fileContent);
      }

      leads.push({
        ...data,
        submittedAt: new Date().toISOString(),
      });

      fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));
    } catch (fileError) {
      console.error('Error saving to file:', fileError);
      // Don't fail the request if file save fails
    }

    return NextResponse.json({
      success: true,
      message: 'Booking request submitted successfully',
    });
  } catch (error) {
    console.error('Error processing booking:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process booking request',
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
















