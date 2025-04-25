import { engine } from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, UiEntity } from '@dcl/sdk/react-ecs'
import { currentTimer, resetTimer, TimerComponent } from './timers/timer'
import { restartGame } from './game-state'

let items: ReactEcs.JSX.Element[] = elementsFrom([{ address: "", name: "none", count: 10 }])

export type RecordItem = {
    address: string,
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
        <UiEntity
            uiTransform={{
                width: 200,
                height: 60
            }}
            uiText={{
                value: secondsLeftText(),
                fontSize: 20
            }}
            uiBackground={{
                color: color
            }}
        />
        {restartTimerButton()}
        {items}
    </UiEntity>
)

function secondsLeftText(): string {
    for (const [_, t] of engine.getEntitiesWith(TimerComponent)) {
        if (!t.countingDown) return "Time over"
        return "Seconds left: " + t.secondsLeft.toFixed(0)
    }
    return "Time over"
}

export function restartTimerButton(): ReactEcs.JSX.Element | null {
    const t = currentTimer()
    if (t === null || t.countingDown)
        return null

    return (<Button
        value='Restart'
        fontSize={20}
        uiTransform={{ width: 100, height: 30, margin: 6 }}
        onMouseDown={restartGame}
        color={Color4.White()}
        uiBackground={{color}}
    />)
}

export function assignItems(recordItems: ReadonlyArray<RecordItem>): void {
    items = elementsFrom(recordItems)
}

function elementsFrom(items: ReadonlyArray<RecordItem>): ReactEcs.JSX.Element[] {
    const color = Color4.Black();
    color.a = 0.5;

    return items.map(i =>
        <UiEntity
            key={i.address}
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
