import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/UI/button';
import { Input } from '@/components/UI/input';
import ContainerWithLabel from './ContainerWithLabel';
import type { ChangeEvent } from 'react';

type ReviewInputProps = {
  value: number;
  onValueChange: (newValue: number) => void;
  step?: number;
  max?: number;
  className?: string;
};

const ReviewInput = ({ value, onValueChange, step = 0.1, className = 'w-full lg:w-[120px]' }: ReviewInputProps) => {
  const controlId = 'review-input';
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const stringValue = event.target.value;
    if (stringValue === '' || /^\d*\.?\d*$/.test(stringValue)) {
      const numericValue = stringValue === '' ? 0 : parseFloat(stringValue);
      if (!isNaN(numericValue)) {
        onValueChange(numericValue);
      }
    }
  };
  const adjustValue = (amount: number) => {
    const newValue = Math.max(0, value + amount);
    const roundedValue = parseFloat(newValue.toFixed(2));
    onValueChange(roundedValue);
  };

  return (
    <ContainerWithLabel label="Review" htmlFor={controlId} className={className}>
      <div className="relative flex w-full items-center">
        <Input id={controlId} type="text" pattern="[0-9]*\.?[0-9]*" value={value} onChange={handleInputChange} className="h-14 pt-3 w-full bg-white font-medium" />
        <div className="absolute right-1 flex flex-col items-center">
          <Button type="button" variant="ghost" onClick={() => adjustValue(step)} className="h-5 w-6 p-0" aria-label="Increase reviews">
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" onClick={() => adjustValue(-step)} className="h-5 w-6 p-0" aria-label="Decrease reviews">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </ContainerWithLabel>
  );
};

export default ReviewInput;
