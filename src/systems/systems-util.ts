export function newSystem<TContext>(
    context: TContext,
    systemUpdate: (context: TContext, dt: number) => void
): (dt: number) => void {
    return (dt: number) => systemUpdate(context, dt)
}