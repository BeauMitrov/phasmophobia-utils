interface CheckboxProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  isLinked?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  isChecked,
  onChange,
  label,
  disabled,
  isLinked,
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
            isLinked
              ? "text-text-colour"
              : isChecked
              ? "text-enabled"
              : "text-text-colour/20"
          }`}
        >
          {label}
        </span>
      )}
    </label>
  );
};
