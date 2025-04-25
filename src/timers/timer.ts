import { engine, ISchema, MapResult, Schemas } from "@dcl/sdk/ecs";
import { syncEntity } from "@dcl/sdk/network";
import { EnumId, roundTime } from "..";
import { fail } from "../utils";

export type TimerSchema = MapResult<{
    secondsLeft: ISchema<number>;
    countingDown: ISchema<boolean>;
}>

export const TimerComponent = engine.defineComponent(
    "TimerComponent",
    {
        secondsLeft: Schemas.Number,
        countingDown: Schemas.Boolean
    }
)

export function createTimer(initialLeftSeconds: number) {
    const e = engine.addEntity()
    const timer = TimerComponent.create(e)

    timer.countingDown = true
    timer.secondsLeft = initialLeftSeconds

    syncEntity(e, [TimerComponent.componentId], EnumId.TIMER)
}

export function resetTimer() {
    const t = currentTimer()
    if (t) {
        t.countingDown = true
        t.secondsLeft = roundTime
    }
}

export function currentTimer(): TimerSchema | null {
    for (const [e] of engine.getEntitiesWith(TimerComponent)) {
        const t = TimerComponent.getMutable(e)
        return t
    }
    return null
}

export function currentTimerOrFail(): TimerSchema {
    return currentTimer() ?? fail("cannot find timer")
}

export function timerCountingSystem(dt: number) {
    const t = currentTimerOrFail()
    if (t.countingDown) {
        t.secondsLeft -= dt
        if (t.secondsLeft < 0) {
            t.secondsLeft = 0
            t.countingDown = false
        }
    }
}