import { ColliderLayer, engine, Entity, GltfContainer, Schemas, Transform } from "@dcl/sdk/ecs";
import { syncEntity } from '@dcl/sdk/network'

const src = "assets/asset-packs/diamond_-_yellow/diamond_pattern_yellow.glb"
const defaultRadius = 1;

export const CoinComponent = engine.defineComponent(
    "coinComponent",
    {
        radius: Schemas.Number
    }
)

export const CoinsRecordComponent = engine.defineComponent(
    "coinsRecordComponent",
    {
        collectedCount: Schemas.Array(
            Schemas.Map({
                address: Schemas.String,
                record: Schemas.Number
            })
        )
    }
)

export function newCoin(): Entity {
    const entity = engine.addEntity()
    GltfContainer.create(entity, {
        src,
        invisibleMeshesCollisionMask: ColliderLayer.CL_NONE,
        visibleMeshesCollisionMask: ColliderLayer.CL_NONE,
    })
    CoinComponent.create(entity, { radius: defaultRadius })
    syncEntity(entity, [Transform.componentId, CoinComponent.componentId])
    return entity
}