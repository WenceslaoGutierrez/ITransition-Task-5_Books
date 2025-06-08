import type { Book } from '@/types';
import BookCover from './BookCover';
import { ThumbsUp } from 'lucide-react';

interface BookDetailProps {
  book: Book;
}

const BookDetail = ({ book }: BookDetailProps) => {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-x-8 p-6 bg-slate-50">
      <div className="flex flex-col items-center space-y-4">
        <BookCover title={book.title} authors={book.authors} />
        <div className="flex items-center space-x-2 text-sm bg-blue-500 py-1 px-2 rounded-lg text-white">
          <ThumbsUp className="h-4 w-4" />
          <span>{book.likes}</span>
        </div>
      </div>
      <div className="text-left">
        <div className="flex flex-row text-2xl font-bold">
          <h2>{book.title}</h2>
          <p className="ml-2 text-muted-foreground"> {book.format}</p>
        </div>
        <p className="mt-2 text-lg text-foreground font-medium">
          By <span className="italic">{book.authors.join(', ')}</span>
        </p>
        <p className="text-lg font-medium text-muted-foreground">{book.publisher}</p>

        {book.reviews && book.reviews.length > 0 && (
          <div className="mt-2">
            <h4 className="font-semibold text-lg">Reviews</h4>
            <ul className="mt-2 space-y-2">
              {book.reviews.map((review, index) => (
                <li key={index} className="text-sm text-foreground font">
                  <div className="flex flex-col">
                    <p className="font-bold capitalize">{review.text}</p>
                    <span className="font-semibold text-muted-foreground">- {review.author}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {book.reviews && book.reviews.length === 0 && (
          <div className="mt-2">
            <h4 className="font-semibold text-lg">Reviews</h4>
            <p className="text-sm text-muted-foreground">No reviews yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
