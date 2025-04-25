import { } from '@dcl/sdk/math'
import { engine } from '@dcl/sdk/ecs'
import { newArea } from './area'
import { spawnCoinsSystem } from './systems/spawn-coins-system';
import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'
import { newCoin } from './coins';
import { collectCoinsSystem } from './systems/collect-coins-system';
import { displayCoinsRecordSystem } from './systems/display-coins-record-system';
import { uiMenu } from './game.ui';
import { createTimer, timerCountingSystem } from './timers/timer';
import { newSyncPlayerRecord, playersRecordsProxy } from './records';

export const roundTime: number = 30

export enum EnumId {
    RECORD = 1,
    TIMER = 2,
}

export function main() {
    console.log("Main function is called")

    const area = newArea()
    playersRecordsProxy.assignProxy(newSyncPlayerRecord())
    createTimer(roundTime)

    engine.addSystem(
        spawnCoinsSystem(
            {
                spawnArea: area,
                newCoinConstructor: newCoin,
                delaySeconds: 2.5
            }
        )
    )
    engine.addSystem(collectCoinsSystem)
    engine.addSystem(displayCoinsRecordSystem)
    engine.addSystem(timerCountingSystem)

    ReactEcsRenderer.setUiRenderer(uiMenu)
}
