export function fail<T>(message: string): T {
    throw new Error(message)
}