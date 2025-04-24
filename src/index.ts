import { } from '@dcl/sdk/math'
import { engine } from '@dcl/sdk/ecs'
import { newArea } from './area'
import { spawnCoinsSystem } from './systems/spawn-coins-system';
import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'
import { CoinsRecordComponent, newCoin } from './coins';
import { collectCoinsSystem } from './systems/collect-coins-system';
import { displayCoinsRecordSystem } from './systems/display-coins-record-system';
import { uiMenu } from './game.ui';
import { syncEntity } from '@dcl/sdk/network';

enum EnumId {
    RECORD = 1
}

const recordEntity = engine.addEntity();
export const playersRecord = CoinsRecordComponent.create(recordEntity)

export function main() {
    console.log("Main function is called")

    const area = newArea();

    syncEntity(recordEntity, [CoinsRecordComponent.componentId], EnumId.RECORD)

    engine.addSystem(
        spawnCoinsSystem(
            {
                spawnArea: area,
                newCoinConstructor: newCoin,
                delaySeconds: 5
            }
        )
    )
    engine.addSystem(collectCoinsSystem)
    engine.addSystem(displayCoinsRecordSystem)

    ReactEcsRenderer.setUiRenderer(uiMenu)
}
