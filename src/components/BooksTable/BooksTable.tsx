import { useCallback, useEffect, useState, useRef, memo } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/UI/table';
import { InfiniteScroll } from '@/components/UI/InfiniteScroll';
import type { Book } from '@/types';
import { BookRow } from './BookRow';
import { generateBooks, generateNewReview, getFakerInstance } from '@/services/bookGenerator';

export interface BooksTableProps {
  userSeed: number;
  language: string;
  likes: number;
  reviews: number;
}

export const BooksTable = memo(({ userSeed, language, likes, reviews }: BooksTableProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const latestLikes = useRef(likes);
  const latestReviews = useRef(reviews);
  const faker = getFakerInstance(language);

  useEffect(() => {
    latestLikes.current = likes;
    latestReviews.current = reviews;
  }, [likes, reviews]);

  const loadBooks = useCallback(
    async (pageNum: number) => {
      if (isLoading) return;
      setIsLoading(true);
      try {
        const newBooks = await generateBooks({
          page: pageNum,
          userSeed,
          language,
          avgLikes: latestLikes.current,
          avgReviews: latestReviews.current
        });
        setBooks((prev) => (pageNum === 1 ? newBooks : [...prev, ...newBooks]));
        setHasMore(newBooks.length > 0);
        setPage(pageNum + 1);
      } finally {
        setIsLoading(false);
      }
    },
    [userSeed, language, isLoading]
  );

  useEffect(() => {
    loadBooks(1);
  }, [userSeed, language]);

  useEffect(() => {
    if (books.length === 0) return;
    setBooks((currentBooks) =>
      currentBooks.map((book) => ({
        ...book,
        likes: Math.round(likes),
        reviews: Array.from({ length: Math.round(reviews) }, (_, i) => book.reviews?.[i] || generateNewReview(faker))
      }))
    );
  }, [likes, reviews]);

  return (
    <>
      <div ref={scrollContainerRef} className="rounded-b-md bg-gray-50 pb-2 px-2 h-[600px] overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow>
              <TableHead className="w-[120px] pl-10 text-center">#</TableHead>
              <TableHead className="min-w-[180px]">ISBN</TableHead>
              <TableHead className="min-w-[250px]">Title</TableHead>
              <TableHead className="min-w-[220px]">Author(s)</TableHead>
              <TableHead className="min-w-[220px]">Publisher</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book, index) => (
              <BookRow key={`${book.id}-${index}`} book={book} index={index} />
            ))}
            <InfiniteScroll hasMore={hasMore} isLoading={isLoading} onLoadMore={() => loadBooks(page)} root={scrollContainerRef.current} threshold={0.1} />
          </TableBody>
        </Table>
      </div>
      {isLoading && <div className="p-4 text-center bg-gray-50">Loading more books...</div>}
      {!hasMore && books.length > 0 && <div className="p-4 text-center text-gray-500 bg-gray-50">No more books to load</div>}
    </>
  );
});
