export const fetchRequest = async (fn: () => Promise<Response>) => {
    try {
        const response = await fn()

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message)
        }
        return await response.json()
    } catch (err) {
        return {errorMessage: err}
    }
}