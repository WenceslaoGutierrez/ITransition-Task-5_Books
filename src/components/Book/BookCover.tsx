import coverImageUrl from '@/assets/book.png';

interface BookCoverProps {
  title: string;
  authors: string[];
}

const BookCover = ({ title, authors }: BookCoverProps) => {
  return (
    <div className="relative w-40 h-56 bg-cover bg-center" style={{ backgroundImage: `url(${coverImageUrl})` }}>
      <div className="absolute inset-0 flex flex-col justify-between pt-8 pb-10 px-3">
        <div className="text-white px-3">
          {authors.map((author, index) => (
            <p key={index} className="text-xs font-semibold break-words whitespace-normal line-clamp-2">
              {author}
            </p>
          ))}
        </div>
        <h4 className="font-bold text-sm text-white whitespace-normal break-words px-3">{title}</h4>
      </div>
    </div>
  );
};

export default BookCover;
