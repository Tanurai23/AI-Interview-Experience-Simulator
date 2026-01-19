const base =
  "px-6 py-3 rounded-xl font-medium transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2";

const variants = {
  primary:
    "bg-blue-600 text-white shadow-md hover:bg-blue-700 focus:ring-blue-400",
  outline:
    "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-400",
};

const Button = ({
  text,
  onClick,
  variant = "primary",
}) => {
  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]}`}
    >
      {text}
    </button>
  );
};

export default Button;
