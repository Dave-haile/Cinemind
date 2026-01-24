    // app/api/movies/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client';
import { getAuthToken } from '@/lib/auth';
import { Movie, PaginatedResponse } from '@/types';
import { ApiError } from '@/types/api';
// GET /api/movies - Get all movies
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';
    const search = searchParams.get('search') || '';
    
    // Get auth token for Flask API
    const token = await getAuthToken();
    
    // Build query string
    const queryParams = new URLSearchParams({
      page,
      limit,
      ...(search && { search }),
    }).toString();

    const endpoint = `/movies${queryParams ? `?${queryParams}` : ''}`;
    
    // Add authorization header if token exists
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const movies = await apiClient.get<PaginatedResponse<Movie>>(endpoint, {
      headers,
    });

    return NextResponse.json(movies, { status: 200 });

  } catch (error: unknown) {
    console.error('Fetch movie error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch movies';
    const errorStatus = (error as ApiError)?.status || 404;
    
    return NextResponse.json(
      { error: errorMessage},
      { status: errorStatus || 500 }
    );
  }
}

// POST /api/movies - Create a new movie
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const token = await getAuthToken();
    
    // Validate required fields
    if (!body.title || !body.description || !body.year) {
      return NextResponse.json(
        { error: 'Title, description, and year are required' },
        { status: 400 }
      );
    }

    // Add authorization header
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const movie = await apiClient.post<Movie>('/movies', body, {
      headers,
    });

    return NextResponse.json(movie, { status: 201 });

  } catch (error: unknown) {
    console.error('Create movie error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Error while creating movie';
    const errorStatus = (error as ApiError)?.status || 401;
    const errorDetails = (error as ApiError)?.errors;

    return NextResponse.json(
      {
        error: errorMessage || 'Failed to create movie',
        ...(errorDetails && { errors: errorDetails })
      },
      { status: errorStatus || 400 }
    );
  }
}