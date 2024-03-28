export default function ResetButton({ resetGame, children }) {
    return (
        <button 
        className="p-2 border-solid border-wOnDark border-[2px] rounded-lg hover:bg-[#575757]"
        onClick={resetGame}
        >
            {children}
        </button>
    )
}