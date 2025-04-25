import { engine, PlayerIdentityData } from "@dcl/sdk/ecs";
import { getPlayer } from '@dcl/sdk/src/players'
import { assignItems, RecordItem } from "../game.ui";
import { CoinsRecordComponent } from "../coins";
import { playersRecord } from "..";
import { fail } from "../utils";

export function displayCoinsRecordSystem() {
    const output: RecordItem[] = []
    playersRecord.collectedCount.forEach((i) => {
        const name: string = getPlayer({ userId: i.address })?.name ?? "cannot get name"
        output.push({ address: i.address, name, count: i.record })
    });
    assignItems(output)
}