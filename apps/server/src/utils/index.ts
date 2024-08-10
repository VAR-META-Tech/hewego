export function nowInMillis(): number {
  return Date.now();
}

export function toUpperCaseHex(address: string) {
  if (address.startsWith('0x') || address.startsWith('0X')) {
    const hexPart = address.slice(2).toUpperCase();
    return `0x${hexPart}`;
  }
  throw new Error("Invalid address format. Address must start with '0x'.");
}
