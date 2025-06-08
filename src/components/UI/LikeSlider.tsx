import { Label } from '@/components/UI/label';
import { Slider } from '@/components/UI/slider';

type LikesSliderProps = {
  value: number;
  onValueChange: (value: number) => void;
};

const LikeSlider = ({ value, onValueChange }: LikesSliderProps) => {
  const handleSliderChange = (newValue: number[]) => {
    onValueChange(newValue[0]);
  };
  const tickMarks = Array.from({ length: 11 });

  return (
    <div className="lg:w-[250px] sm:w-full h-16">
      <div className=" pb-4 flex items-center justify-between text-gray-500">
        <Label htmlFor="likes-slider">Likes</Label>
        <span className="text-sm font-medium text-muted-foreground">{value.toFixed(1)}</span>
      </div>
      <div className="relative">
        <div className="absolute -top-1 -translate-y-1/2 flex w-full justify-between">
          {tickMarks.map((_, index) => (
            <div key={index} className="h-[4px] w-0.5 bg-gray-400" />
          ))}
        </div>

        <Slider id="likes-slider" value={[value]} onValueChange={handleSliderChange} max={10} step={0.1} className="relative z-10" />
      </div>
    </div>
  );
};

export default LikeSlider;
