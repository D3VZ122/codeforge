import  { ChangeEvent, forwardRef } from 'react';

interface OtpInputProps {
  index: number;
  value: string;
  onChange: (value: string, index: number) => void;
  inputRef: (el: HTMLInputElement | null) => void;
}

const OtpInput = forwardRef<HTMLInputElement, OtpInputProps>(({ index, value, onChange, inputRef }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === '') {
      onChange(value, index);
    }
  };

  return (
    <input
      ref={inputRef}
      className="h-12 w-12 rounded-md border border-gray-300 bg-transparent px-3 text-center text-2xl font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 dark:border-gray-700 dark:text-gray-300"
      maxLength={1}
      value={value}
      onChange={handleChange}
      type="text"
    />
  );
});

export default OtpInput;
