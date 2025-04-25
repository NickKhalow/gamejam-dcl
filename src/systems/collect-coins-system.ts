import { engine, Transform } from "@dcl/sdk/ecs";
import { CoinComponent } from "../coins";
import { Vector3 } from "@dcl/sdk/math";
import { getPlayer } from "@dcl/sdk/src/players";
import { fail } from "../utils";
import { currentTimerOrFail } from "../timers/timer";
import { playersRecordsProxy } from "../records";

export function collectCoinsSystem() {
    const t = currentTimerOrFail()
    if (!t.countingDown)
        return

    const playerTransform = Transform.get(engine.PlayerEntity)

    for (const [entity, coin, transform] of engine.getEntitiesWith(CoinComponent, Transform)) {
        const distance = Vector3.distance(playerTransform.position, transform.position)

        if (distance <= coin.radius) {
            engine.removeEntity(entity)
            const self: string = getPlayer()?.userId || fail("cannot find self player")
            playersRecordsProxy.increase(self)
        }
    }
}