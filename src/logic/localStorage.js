export const saveOnStorage = ({ board, turn }) => {
    window.localStorage.setItem("board", JSON.stringify(board));
    window.localStorage.setItem("turn", turn);
}

export const removeOnStorage = () => {
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
}