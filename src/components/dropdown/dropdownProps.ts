export type DropdownOption = {
  label: string;
  value: string | number;
};

export interface DropdownProps {
  options: DropdownOption[];
  selected: DropdownOption;
  onSelect: (value: DropdownOption) => void;
  label?: string;
  note?: string;
  disabled?: boolean;
}
