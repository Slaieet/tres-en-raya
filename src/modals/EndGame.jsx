import { createPortal } from "react-dom";
import Square from "../components/Square";
import ResetButton from "../components/ResetButton";

export default function EndGame({ winner, resetGame }) {

    if (winner === null) return null;

    const winnerText = (winner === "Empate") ? "Empate" : "Gano:";

    return createPortal(
    <section className="absolute-center rounded-[8px] p-10 bg-[#0f0f0f] w-[350px] winner gap-10 flex flex-col items-center">
        <h1 className="text-center text-[2.5rem] font-bold">
            {winnerText}
        </h1>

        {(winner !== "Empate") ? <Square>{winner}</Square> : null}

        <ResetButton resetGame={resetGame}>Empezar de nuevo</ResetButton>
    </section>
    , document.getElementById("onFinish"))
}