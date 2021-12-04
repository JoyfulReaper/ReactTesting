export const increment = (step) =>
{
    return {
        type: 'INCREMENT',
        payload: step
    }
}

export const decrement = () =>
{
    return {
        type: 'DECREMENT'
    }
}