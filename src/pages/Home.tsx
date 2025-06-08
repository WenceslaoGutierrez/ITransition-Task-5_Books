import { BooksTable } from '@/components/BooksTable/BooksTable';
import { ActionsToolbar } from '@/components/UI/ActionsToolBar';
import type { LanguageOption } from '@/components/UI/LanguageSelector';
import type { ViewMode } from '@/components/UI/ViewToggle';
import { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

const supportedLanguages: LanguageOption[] = [
  { value: 'en-US', label: 'English (US)' },
  { value: 'es-MX', label: 'Spanish (Mexico)' },
  { value: 'pt-BR', label: 'Portuguese (Brazil)' },
  { value: 'zh-CN', label: 'Chinese (China)' }
];
export function Home() {
  const [currentLanguage, setCurrentLanguage] = useState<string>(supportedLanguages[0].value);
  const [seed, setSeed] = useState<string>('58933423');
  const [likes, setLikes] = useState<number>(4);
  const [reviews, setReviews] = useState<number>(4.7);
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const numericSeed = Number(seed) || 0;
  const debouncedLikes = useDebounce(likes, 300);
  const debouncedReviews = useDebounce(reviews, 300);

  return (
    <>
      <ActionsToolbar
        languages={supportedLanguages}
        currentLanguage={currentLanguage}
        seed={seed}
        likes={likes}
        reviews={reviews}
        viewMode={viewMode}
        onLanguageChange={setCurrentLanguage}
        onSeedChange={setSeed}
        onLikesChange={setLikes}
        onReviewsChange={setReviews}
        onViewModeChange={setViewMode}
      />
      <BooksTable userSeed={numericSeed} language={currentLanguage} likes={debouncedLikes} reviews={debouncedReviews} />
    </>
  );
}
