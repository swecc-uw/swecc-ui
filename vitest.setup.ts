// React Aria calls `CSS.escape` when a modal opens, and jsdom does not
// implement it.
globalThis.CSS ??= { escape: (value: string) => value } as typeof CSS;
