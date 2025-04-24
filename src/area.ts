import { engine, Entity, Transform } from '@dcl/sdk/ecs'
import { fail } from './utils';
import { Vector3 } from '@dcl/sdk/math';

export interface SpawnArea {
    randomPose(): Vector3
}

export function newArea(): SpawnArea {
    const start: Entity = engine.getEntityOrNullByName("spawn-start") ?? fail("cannot find spawn-start");
    const end: Entity = engine.getEntityOrNullByName("spawn-end") ?? fail("cannot find spawn-start");

    function randomBetween(left: number, right: number): number {
        const min = Math.min(left, right);
        const max = Math.max(left, right);
        const randomValue = Math.random();
        const delta = max - min;
        const result = (delta * randomValue) + min;
        return result;
    }

    function randomPose(): Vector3 {
        const tStart = Transform.get(start)
        const tEnd = Transform.get(end)

        return {
            x: randomBetween(tStart.position.x, tEnd.position.x),
            y: randomBetween(tStart.position.y, tEnd.position.y),
            z: randomBetween(tStart.position.z, tEnd.position.z)
        }
    }

    return {
        randomPose: randomPose
    }
}