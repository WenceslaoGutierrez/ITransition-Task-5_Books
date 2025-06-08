import { Grid3x3, BookImage } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/UI/toggle-group';
import { cn } from '@/lib/utils';
export type ViewMode = 'table' | 'gallery';

type ViewToggleProps = {
  view: ViewMode;
  onViewChange: (newView: ViewMode) => void;
};

const ViewToggle = ({ view, onViewChange }: ViewToggleProps) => {
  const handleValueChange = (newView: ViewMode | '') => {
    if (newView) {
      onViewChange(newView);
    }
  };

  const itemClasses = cn('bg-white text-blue-500', 'hover:bg-primary/10', 'data-[state=on]:bg-blue-500 data-[state=on]:text-white');

  return (
    <div className="flex pb-3">
      <ToggleGroup type="single" variant="outline" value={view} onValueChange={handleValueChange} aria-label="View mode">
        <ToggleGroupItem value="table" aria-label="Table view" className={itemClasses}>
          <Grid3x3 className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="gallery" aria-label="Gallery view" className={itemClasses}>
          <BookImage className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default ViewToggle;
