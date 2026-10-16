import type { Metadata } from 'next';
import ReviewCollection from '@/components/ReviewCollection';

export const metadata: Metadata = { title: 'รีวิวของฉัน | ARN SPACE' };

export default function ProfileReviewsPage() {
  return <ReviewCollection />;
}
