import { NextRequest, NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client';
import { getAuthToken } from '@/lib/auth-server';

interface RouteParams {
  params: {
    public_id: string;
  };
}

export async function GET(
  req: NextRequest,
  { params }: { params: { public_id: string } }
) {
  try {
    const resolvedParams = await params;
    const token = await getAuthToken();

    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const movie = await apiClient.get(`/movies/${resolvedParams.public_id}`, {
      headers,
    });

    return NextResponse.json(movie, { status: 200 });

  } catch (error: unknown) {
    console.error('Fetch movie error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Movie not found';
    const errorStatus = (error && typeof error === 'object' && 'status' in error && typeof error.status === 'number')
      ? error.status
      : 404;

    return NextResponse.json(
      { error: errorMessage },
      { status: errorStatus }
    );
  }
}

export async function PUT(
  _req: NextRequest, // eslint-disable-line @typescript-eslint/no-unused-vars
  { params: _params }: RouteParams // eslint-disable-line @typescript-eslint/no-unused-vars
) {
  // PUT endpoint not implemented in backend
  return NextResponse.json(
    { error: 'Update movie endpoint not implemented' },
    { status: 501 }
  );
}

// DELETE /api/movies/[public_id] - Delete movie
export async function DELETE(
  _req: NextRequest, // eslint-disable-line @typescript-eslint/no-unused-vars
  { params: _params }: RouteParams // eslint-disable-line @typescript-eslint/no-unused-vars
) {
  // DELETE endpoint not implemented in backend
  return NextResponse.json(
    { error: 'Delete movie endpoint not implemented' },
    { status: 501 }
  );
}