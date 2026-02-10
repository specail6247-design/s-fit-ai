import { describe, it, expect, vi } from 'vitest';
import { POST } from '@/app/api/support/report/route';
import { NextResponse } from 'next/server';

// Mock NextResponse to ensure it works in test environment without full Next.js context
vi.mock('next/server', () => {
  return {
    NextResponse: {
      json: (body: any, init?: ResponseInit) => {
        return new Response(JSON.stringify(body), {
          ...init,
          headers: {
            'content-type': 'application/json',
            ...(init?.headers || {}),
          },
        });
      },
    },
  };
});

describe('API: /api/support/report', () => {
  it('should return 200 and success message when valid data is provided', async () => {
    const request = new Request('http://localhost:3000/api/support/report', {
      method: 'POST',
      body: JSON.stringify({
        subject: 'Feedback',
        description: 'Great app!',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200); // Default status for Response is 200 unless specified
    // Actually, my mock implementation of NextResponse.json doesn't set status 200 explicitly unless init is passed?
    // Wait, Response constructor defaults to 200.

    expect(data).toEqual({
      success: true,
      message: 'Report submitted successfully.',
    });
  });

  it('should return 400 when subject is missing', async () => {
    const request = new Request('http://localhost:3000/api/support/report', {
      method: 'POST',
      body: JSON.stringify({
        description: 'Missing subject',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      error: 'Subject and description are required.',
    });
  });

  it('should return 400 when description is missing', async () => {
    const request = new Request('http://localhost:3000/api/support/report', {
      method: 'POST',
      body: JSON.stringify({
        subject: 'Missing description',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      error: 'Subject and description are required.',
    });
  });
});
