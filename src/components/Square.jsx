export default function Square({ children, isSelected, index, updateBoard }) {

    const className = `square h-[100px] w-[100px] grid place-items-center rounded-[8px] ${(isSelected) ? "bg-blue-500" : ""}`;

    return (
        <div className={className} onClick={() => updateBoard(index)}>
            <strong className="text-[3rem]">{children}</strong>
        </div>
    )
}