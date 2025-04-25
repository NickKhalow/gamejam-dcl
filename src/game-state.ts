import { playersRecordsProxy } from "./records"
import { resetTimer } from "./timers/timer"

type GameState = {
    kind: "play",
    coinsSpawnDelay: number,
}

export function restartGame() {
    resetTimer()
    playersRecordsProxy.reset()
}