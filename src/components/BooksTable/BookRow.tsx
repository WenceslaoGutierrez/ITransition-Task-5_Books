import { memo, useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/UI/button';
import { TableCell, TableRow } from '@/components/UI/table';
import type { Book } from '@/types';
import BookDetail from '../Book/BookDetail';

interface BookRowProps {
  book: Book;
  index: number;
}

export const BookRow = memo(({ book, index }: BookRowProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <TableRow className="bg-white font-medium">
        <TableCell>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            {index + 1}
          </div>
        </TableCell>
        <TableCell className="truncate text-left">{book.isbn}</TableCell>
        <TableCell className="truncate text-left">{book.title}</TableCell>
        <TableCell className="truncate text-left">{book.authors.join(', ')}</TableCell>
        <TableCell className="truncate text-left">{book.publisher}</TableCell>
      </TableRow>
      {isOpen && (
        <TableRow className="bg-gray-50 hover:bg-gray-50">
          <TableCell colSpan={5}>
            <BookDetail book={book} />
          </TableCell>
        </TableRow>
      )}
    </>
  );
});
