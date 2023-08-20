interface CheckboxProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  isLinked?: boolean;
  onDisable?: () => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  isChecked,
  onChange,
  label,
  disabled,
  isLinked,
  onDisable,
}) => {
  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onDisable) onDisable();
  };

  return (
    <label
      className="flex items-center cursor-pointer"
      onContextMenu={handleRightClick}
    >
      <input
        type="checkbox"
        className="hidden"
        checked={isChecked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      {label && (
        <span
          className={`pl-2 ${disabled ? "thick-line-through" : ""} ${
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
