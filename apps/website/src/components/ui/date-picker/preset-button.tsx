import { cn } from '@/utils/common';

export const PresetButton = ({
  preset,
  label,
  isSelected,
  onClick,
}: {
  preset: string;
  label: string;
  isSelected: boolean;
  onClick: (preset: string) => void;
}): JSX.Element => {
  const handleClick = () => {
    onClick(preset);
  };

  return (
    <button
      className={cn(
        'flex h-5 items-center justify-start px-1.5 transition-colors md:h-10 md:w-full md:px-4 md:py-2 ',
        'cursor-pointer whitespace-nowrap rounded-sm bg-transparent text-sm font-medium text-gray-400 md:text-gray-400',
        'hover:bg-primary-purple hover:text-opacity-70',
        isSelected && 'md:bg-primary-purple md:text-primary pointer-events-none'
      )}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};
