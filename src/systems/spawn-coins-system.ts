import { engine, Entity, Transform } from "@dcl/sdk/ecs";
import { SpawnArea } from "../area";
import { newSystem } from "./systems-util";
import { currentTimer, currentTimerOrFail } from "../timers/timer";

//TODO add prefab
export function spawnCoinsSystem(
    ctx: {
        spawnArea: SpawnArea,
        newCoinConstructor: () => Entity,
        delaySeconds: number
    }
) {

    let current = ctx.delaySeconds

    return newSystem(
        ctx,
        (ctx, dt) => {
            const timer = currentTimerOrFail()
            if (!timer.countingDown)
                return

            current -= dt

            if (current <= 0) {
                console.log("Trigger spawn")

                const entity = ctx.newCoinConstructor()
                const transform = Transform.getOrCreateMutable(entity)
                const pose = ctx.spawnArea.randomPose()

                transform.position = pose

                current = ctx.delaySeconds
            }
        }
    )
}