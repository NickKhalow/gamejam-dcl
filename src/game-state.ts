import { resetRecords } from "./coins"
import { resetTimer } from "./timers/timer"

type GameState = {
    kind: "play",
    coinsSpawnDelay: number,
}

export function restartGame() {
    resetTimer()
    resetRecords()
}