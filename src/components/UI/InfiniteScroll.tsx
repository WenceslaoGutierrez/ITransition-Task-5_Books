import { useEffect, useRef } from 'react';

interface InfiniteScrollProps {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  root?: Element | Document | null;
  threshold?: number;
}

export const InfiniteScroll = ({ hasMore, isLoading, onLoadMore, root = null, threshold = 0.5 }: InfiniteScrollProps) => {
  const sentinelRef = useRef<HTMLTableRowElement>(null);
  useEffect(() => {
    if (!hasMore || isLoading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onLoadMore();
      },
      { threshold, root }
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoading, onLoadMore, threshold, root]);
  if (!hasMore) return null;
  return (
    <tr ref={sentinelRef}>
      <td colSpan={5} className="h-1 bg-transparent" />
    </tr>
  );
};
