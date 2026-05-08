export type Role = 'USER' | 'ADMIN' | 'SUPERADMIN';

export type ApiResponse<T> = { success: boolean; message: string; data: T };
export type User = {
  id: string; fullName: string; username: string; email: string;
  phone?: string; avatarUrl?: string; role: Role; isActive: boolean;
  profile?: Record<string, unknown>; createdAt?: string;
};
export type Category = { id: string; name: string; slug: string; description: string; icon?: string };
export type Psychologist = {
  id: string; fullName: string; slug: string; specialty: string; bio: string;
  experienceYears: number; rating: number; reviewsCount: number; price: number;
  avatarUrl?: string; languages: string[]; specializations: string[]; availability: Record<string, unknown>; isActive: boolean;
};
export type TestQuestion = { id: number; text: string; options: string[] };
export type TestBand = { min: number; max: number; level: string; summary: string };
export type Test = {
  id: string; title: string; slug: string; description: string; durationMin: number;
  questionCount: number; instructions: string; questions: TestQuestion[]; resultBands: TestBand[];
  category: Category; isActive: boolean;
};
export type Book = { id: string; title: string; slug: string; author: string; description: string; coverUrl?: string; downloadUrl?: string; category: Category; isActive: boolean };
export type Resource = { id: string; title: string; slug: string; type: string; description: string; url?: string; thumbnailUrl?: string; category: Category; isActive: boolean };
export type Booking = {
  id: string; scheduledAt: string; mode: string; status: string; notes?: string;
  psychologist: Psychologist;
  user?: { id: string; fullName: string; email: string };
};
export type TestResult = { id: string; score: number; level: string; summary: string; createdAt: string; test: { title: string; slug: string } };
