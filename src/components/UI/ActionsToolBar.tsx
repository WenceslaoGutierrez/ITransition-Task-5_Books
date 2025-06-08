import LanguageSelector, { type LanguageOption } from './LanguageSelector';
import SeedInput from './SeedInput';
import LikeSlider from './LikeSlider';
import ReviewInput from './ReviewInput';
import type { ViewMode } from './ViewToggle';
import ViewToggle from './ViewToggle';

interface ActionsToolbarProps {
  languages: LanguageOption[];
  currentLanguage: string;
  seed: string;
  likes: number;
  reviews: number;
  viewMode: ViewMode;
  onLanguageChange: (value: string) => void;
  onSeedChange: (value: string) => void;
  onLikesChange: (value: number) => void;
  onReviewsChange: (value: number) => void;
  onViewModeChange: (value: ViewMode) => void;
}

export function ActionsToolbar({
  languages,
  currentLanguage,
  seed,
  likes,
  reviews,
  viewMode,
  onLanguageChange,
  onSeedChange,
  onLikesChange,
  onReviewsChange,
  onViewModeChange
}: ActionsToolbarProps) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-6 rounded-t-md bg-gray-50 p-4 lg:flex lg:flex-row md:justify-around items-center">
      <LanguageSelector languages={languages} selectedLanguage={currentLanguage} onLanguageChange={onLanguageChange} />
      <SeedInput seed={seed} onSeedChange={onSeedChange} />
      <div className="col-span-2">
        <LikeSlider value={likes} onValueChange={onLikesChange} />
      </div>
      <ReviewInput value={reviews} onValueChange={onReviewsChange} />
      <div>
        <ViewToggle view={viewMode} onViewChange={onViewModeChange} />
      </div>
    </div>
  );
}
