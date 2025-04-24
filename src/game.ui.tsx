import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'

let items: ReactEcs.JSX.Element[] = elementsFrom([{ name: "none", count: 10 }])

export type RecordItem = {
    name: string,
    count: number
}

const color = Color4.Black();
color.a = 0.5;

export const uiMenu = () => (
    <UiEntity
        uiTransform={{
            width: 300,
            height: '30%',
            flexWrap: "wrap",
            flexDirection: "column",
            margin: { top: '35px', left: '500px' },
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: { top: '15px', bottom: '15px' },
            borderRadius: '30',
        }}
        uiBackground={{ color }}
    >
        {items}
    </UiEntity>
)

export function assignItems(recordItems: ReadonlyArray<RecordItem>): void {
    items = elementsFrom(recordItems)
}

function elementsFrom(items: ReadonlyArray<RecordItem>): ReactEcs.JSX.Element[] {
    const color = Color4.Black();
    color.a = 0.5;

    return items.map(i =>
        <UiEntity
            key={i.name}
            uiTransform={{
                width: 200, height: 40,
                margin: { left: 10, right: 10, top: 5, bottom: 5 }
            }}
            uiBackground={{ color }}
            uiText={{
                value: `${i.name}: ${i.count}`,
                textAlign: "middle-center",
                fontSize: 20
            }}
        />
    );
}
