interface CheckboxProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  isChecked,
  onChange,
  label,
  disabled,
}) => {
  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="hidden"
        checked={isChecked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      {label && (
        <span
          className={`pl-2 ${
            isChecked ? "text-text-colour" : "text-disable-text-colour"
          }`}
        >
          {label}
        </span>
      )}
    </label>
  );
};
