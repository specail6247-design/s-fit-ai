import { describe, it, expect } from "vitest";
import { POST } from '@/app/api/try-on/route';
import { NextRequest } from 'next/server';

describe('Try-On API Route', () => {
  it('should reject path traversal attempts for local files', async () => {
    // Create a mock NextRequest with a path traversal payload starting with /
    const mockRequest = {
      json: async () => ({
        userPhotoUrl: 'data:image/png;base64,dummy',
        garmentImageUrl: '/../../../../etc/passwd',
        category: 'upper_body'
      })
    } as unknown as NextRequest;

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('Failed to read local image');
  });

  it('should accept valid public directory paths', async () => {
    const mockRequest = {
      json: async () => ({
        userPhotoUrl: 'data:image/png;base64,dummy',
        garmentImageUrl: '/clothing/gap_joggers.png',
        category: 'upper_body'
      })
    } as unknown as NextRequest;

    const response = await POST(mockRequest);

    // Ensure it's not the local file read error
    if (response.status === 400) {
      const data = await response.json();
      expect(data.error).not.toContain('Failed to read local image');
    } else {
      expect(response.status).not.toBe(400); // likely 500 because no replicate token
    }
  });
});
