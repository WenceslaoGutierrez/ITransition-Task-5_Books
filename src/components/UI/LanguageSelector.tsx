import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/select';
import ContainerWithLabel from './ContainerWithLabel';

export type LanguageOption = {
  value: string;
  label: string;
};

type LanguageSelectorProps = {
  languages: LanguageOption[];
  selectedLanguage: string;
  onLanguageChange: (value: string) => void;
  disabled?: boolean;
};

const LanguageSelector = ({ languages, selectedLanguage, onLanguageChange, disabled = false }: LanguageSelectorProps) => {
  const controlId = 'language-select';

  return (
    <ContainerWithLabel label="Language" htmlFor={controlId}>
      <Select value={selectedLanguage} onValueChange={onLanguageChange} disabled={disabled}>
        <SelectTrigger id={controlId} data-testid="language-select-trigger" className="pt-7 pb-5 w-full bg-white font-medium">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.value} value={lang.value}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </ContainerWithLabel>
  );
};

export default LanguageSelector;
