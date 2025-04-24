import { engine, Transform } from "@dcl/sdk/ecs";
import { CoinComponent } from "../coins";
import { Vector3 } from "@dcl/sdk/math";
import { playersRecord } from "..";
import { getPlayer } from "@dcl/sdk/src/players";
import { fail } from "../utils";

export function collectCoinsSystem() {
    const playerTransform = Transform.get(engine.PlayerEntity)

    for (const [entity, coin, transform] of engine.getEntitiesWith(CoinComponent, Transform)) {
        const distance = Vector3.distance(playerTransform.position, transform.position)

        if (distance <= coin.radius) {
            engine.removeEntity(entity)
            const self: string = getPlayer()?.userId || fail("cannot find self player")
            const index = playersRecord.collectedCount.findIndex(x => x.address == self)
            if (index == -1) {
                playersRecord.collectedCount.push({ address: self, record: 1 })
            }
            playersRecord.collectedCount[index].record =
                (playersRecord.collectedCount[index].record ?? 0) + 1
            playersRecord.collectedCount = [...playersRecord.collectedCount]
        }
    }
}