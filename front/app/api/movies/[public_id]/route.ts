// app/api/movies/[id]/route.ts - Single movie operations
import { NextRequest, NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client';
import { getAuthToken } from '@/lib/auth';
import { Movie } from '@/types';
import { ApiError } from '@/types/api';

interface RouteParams {
  params: {
    public_id: string;
  };
}

// GET /api/movies/[id] - Get single movie
export async function GET(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    const token = await getAuthToken();
    
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const movie = await apiClient.get<Movie>(`/movies/${params.public_id}`, {
      headers,
    });

    return NextResponse.json(movie, { status: 200 });

  } catch (error: unknown) {
    console.error('Fetch movie error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Movie not found';
    const errorStatus = (error as ApiError)?.status || 404;

    return NextResponse.json(
      { error: errorMessage },
      { status: errorStatus }
    );
  }
}

// PUT /api/movies/[id] - Update movie
export async function PUT(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    const body = await req.json();
    const token = await getAuthToken();
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const movie = await apiClient.put<Movie>(`/movies/${params.public_id}`, body, {
      headers,
    });

    return NextResponse.json(movie, { status: 200 });

  } catch (error: unknown) {
    console.error('Update movie error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Failed to update movie';
    const errorStatus = (error as ApiError)?.status || 400;

    return NextResponse.json(
      { error: errorMessage },
      { status: errorStatus }
    );
  }
}

// DELETE /api/movies/[id] - Delete movie
export async function DELETE(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    const token = await getAuthToken();
    
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    await apiClient.delete(`/movies/${params.public_id}`, {
      headers,
    });

    return NextResponse.json(
      { message: 'Movie deleted successfully' },
      { status: 200 }
    );

  } catch (error: unknown) {
    console.error('Delete movie error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Failed to delete movie';
    const errorStatus = (error as ApiError)?.status || 400;

    return NextResponse.json(
      { error: errorMessage },
      { status: errorStatus }
    );
  }
}