interface ButtonProps {
    style?: string;
    children: React.ReactNode;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({ style, children, onClick }: ButtonProps) => {
    return (
        <button className={`bg-[#0079FE] text-[#C2C6CE] rounded-[4px] ${style}`} onClick={onClick}>
            {children}
        </button>
    );
};
