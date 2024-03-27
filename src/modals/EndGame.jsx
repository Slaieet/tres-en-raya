import { createPortal } from "react-dom"
import Square from "../components/Square"

export default function EndGame({ winner, resetGame }) {
    return createPortal(
    <section className="absolute-center rounded-[8px] p-10 bg-[#0f0f0f] w-[350px] winner gap-10 flex flex-col items-center">
        <h1 className="text-center text-[2.5rem] font-bold">
            {(winner !== "Empate") ? "Gano:" : winner}
        </h1>

        {(winner !== "Empate") ? <Square>{winner}</Square> : null}

        <button 
        className="p-2 border-solid border-wOnDark border-[2px] rounded-lg hover:bg-[#575757]"
        onClick={resetGame}
        >
            Empezar de nuevo
        </button>
    </section>
    , document.getElementById("onFinish"))
}