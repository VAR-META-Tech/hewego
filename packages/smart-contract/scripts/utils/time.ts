export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getCurrentTimestampSecond() {
    const now = Date.now();
    const timestampInSeconds = Math.floor(now / 1000);
    return timestampInSeconds;
}
