import { Shuffle } from 'lucide-react';
import { Button } from '@/components/UI/button';
import { Input } from '@/components/UI/input';
import ContainerWithLabel from './ContainerWithLabel';
import type { ChangeEvent } from 'react';

type SeedInputProps = {
  seed: string;
  onSeedChange: (newSeed: string) => void;
};

const SeedInput = ({ seed, onSeedChange }: SeedInputProps) => {
  const controlId = 'seed-input';
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === '' || /^[0-9]+$/.test(value)) {
      onSeedChange(value);
    }
  };

  const handleRandomClick = () => {
    try {
      const randomSeed = (window.crypto as any).randomInt(1, 99999999);
      onSeedChange(randomSeed.toString());
    } catch (error) {
      const randomSeed = Math.floor(Math.random() * 99999999);
      onSeedChange(randomSeed.toString());
    }
  };

  return (
    <ContainerWithLabel label="Seed" htmlFor={controlId}>
      <div className="relative flex sm:w-full lg:max-w-[180px] items-center">
        <Input
          id={controlId}
          type="text"
          pattern="[0-9]*"
          value={seed}
          maxLength={8}
          onChange={handleInputChange}
          className="h-14 pt-3 border-none w-full bg-white pr-10 font-medium"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleRandomClick}
          className="absolute right-1 text-gray-500 hover:text-gray-900"
          aria-label="Generate random seed"
        >
          <Shuffle className="h-4 w-4" />
        </Button>
      </div>
    </ContainerWithLabel>
  );
};

export default SeedInput;
