import { describe, it, expect } from 'vitest';
import { POST } from '../app/api/try-on/route';
import { NextRequest } from 'next/server';

describe('Path Traversal', () => {
  it('should not allow reading files outside public', async () => {
    const req = new NextRequest('http://localhost/api/try-on', {
      method: 'POST',
      body: JSON.stringify({
        userPhotoUrl: 'http://example.com/user.jpg',
        garmentImageUrl: '/../../../../../../../../../../../../etc/passwd',
        category: 'upper_body'
      })
    });

    const res = await POST(req);
    const json = await res.json();
    expect(json.error).toContain('Failed to read local image');
  });
});
