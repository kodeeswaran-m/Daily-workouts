interface ButtonProps {
  label: string;
  onClick?: () => void;
  bgColor?: string;
  textColor?: string;
}

const Button = ({ label, onClick, bgColor, textColor }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: bgColor, color: textColor, padding: "10px" }}
    >
      {label}
    </button>
  );
};
export default Button;
