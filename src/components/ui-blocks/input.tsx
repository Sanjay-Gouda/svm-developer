import { Input, Label, Textarea, Button } from '@windmill/react-ui';
import { InputProps } from '@windmill/react-ui/dist/Input';
import { TextareaProps } from '@windmill/react-ui/dist/Textarea';
import { Select } from '@windmill/react-ui';
import { FC } from 'react';

interface P {
  label: string;
  containerClassName?: string;
  onChange?: (e: any) => void;
  name: string;
  value?: string | number | undefined;
  valid?: boolean;
}

type TextInputProps = P & InputProps;

interface SelectProps {
  title: string;
  labelClassName?: string;
  // value: string;
  name: string;
  containerClassName: string;
  options: string[];
  onChange?: (e: any) => void;
  // onChange: (e: any) => void;
}

export const SelectOption = ({
  title,
  options,
  onChange,
  name,
  labelClassName,

  containerClassName,
}: SelectProps) => {
  return (
    <Label className={labelClassName}>
      <span>{title}</span>
      <Select
        css={{}}
        name={name}
        className={containerClassName}
        onChange={onChange}
      >
        {options.map((opt) => {
          return (
            <option key={opt} value={opt}>
              {opt}
            </option>
          );
        })}
      </Select>
    </Label>
  );
};

// interface ButtonProps {
//   size: string;
//   btnLabel: string;
// }
// export const FilledButton = ({size,btnLabel}:ButtonProps) => {
//   <Button size={size}>{btnLabel}</Button>
// };

export const TextInput: FC<TextInputProps> = ({
  label,
  containerClassName = '',
  onChange,
  name,
  value,
  valid,
  ...props
}) => {
  return (
    <Label className={containerClassName}>
      <span>{label}</span>
      <Input
        {...props}
        css={{}}
        className='mt-1'
        value={value}
        name={name}
        onChange={onChange}
        valid={valid}
      />
    </Label>
  );
};

type TextInputAreaProps = P & TextareaProps;

export const TextInputArea: FC<TextInputAreaProps> = ({
  label,
  containerClassName = '',
  handleChange,
  name,
  value,
  ...props
}) => {
  return (
    <Label className={containerClassName}>
      <span>{label}</span>
      <Textarea
        {...props}
        css={{}}
        onChange={handleChange}
        name={name}
        value={value}
        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
      />
    </Label>
  );
};
