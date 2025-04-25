import { engine } from "@dcl/sdk/ecs"
import { CoinsRecordComponent } from "./coins"
import { EnumId } from "."
import { syncEntity } from "@dcl/sdk/network"

export const playersRecordsProxy = newProxy()

export interface PlayersRecords extends Iterable<[string, number]> {
    increase(userId: string): void

    reset(): void
}

function newProxy(): PlayersRecords & { assignProxy(proxy: PlayersRecords): void } {
    let proxyObject: PlayersRecords = null!

    return {
        increase: (u) => proxyObject.increase(u),

        reset: () => proxyObject.reset,

        assignProxy: (proxy: PlayersRecords) => {
            proxyObject = proxy
        },

        *[Symbol.iterator]() {
            for (const [key, value] of proxyObject) {
                yield [key, value] as [string, number];
            }
        }
    }
}

export function newSyncPlayerRecord(): PlayersRecords {
    const recordEntity = engine.addEntity();
    const playersRecord = CoinsRecordComponent.create(recordEntity)
    playersRecord.collectedCountJson = JSON.stringify({})
    syncEntity(recordEntity, [CoinsRecordComponent.componentId], EnumId.RECORD)

    return {
        increase: (userId: string) => {
            const jsonObject = JSON.parse(playersRecord.collectedCountJson)
            const value = jsonObject[userId] ?? 0
            jsonObject[userId] = value + 1
            playersRecord.collectedCountJson = JSON.stringify(jsonObject)
        },

        reset: () => {
            playersRecord.collectedCountJson = JSON.stringify({})
        },

        *[Symbol.iterator]() {
            const jsonObject = JSON.parse(playersRecord.collectedCountJson)
            for (const [key, value] of Object.entries(jsonObject)) {
                yield [key, value] as [string, number];
            }
        }
    }
}
