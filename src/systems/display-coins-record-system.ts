import { getPlayer } from '@dcl/sdk/src/players'
import { assignItems, RecordItem } from "../game.ui";
import { playersRecordsProxy } from '../records';

export function displayCoinsRecordSystem() {
    const output: RecordItem[] = []
    for (const [userId, record] of playersRecordsProxy) {
        const name: string = getPlayer({ userId })?.name ?? "cannot get name"
        output.push({ address: userId, name, count: record })
    }
    assignItems(output)
}