interface ButtonSmProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const SmallButton = ({ children, onClick }: ButtonSmProps) => {
  return (
    <button onClick={onClick} className="bg-customGreen rounded-lg text-white text-xs px-2 py-1 w-[65px]">
      {children}
    </button>
  );
};

export default SmallButton;
