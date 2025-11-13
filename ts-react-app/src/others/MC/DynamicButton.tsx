import "../styles/DynamicButton.css"

type VariantTypes = "primary" | "secondary" | "Danger";
interface DynamicButtonProps {
  label: string;
  disabled: boolean;
  variant?: VariantTypes;
  onClick: () => void;
}
const DynamicButton = ({
  label,
  variant,
  disabled,
  onClick,
}: DynamicButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`dynamic-button ${variant}`}
    >
      {label}
    </button>
  );
};

export default DynamicButton;
