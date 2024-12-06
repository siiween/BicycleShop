export function formatConflictMessage(conflictingOptions: string[]): string {

    console.log('conflictingOptions:', conflictingOptions);

    if (conflictingOptions.length === 0) {
        return "";
    }

    if (conflictingOptions.length === 1) {
        return conflictingOptions[0];
    }

    if (conflictingOptions.length === 2) {
        return `${conflictingOptions[0]} and ${conflictingOptions[1]}`;
    }

    const allButLast = conflictingOptions.slice(0, -1).join(", ");
    const last = conflictingOptions[conflictingOptions.length - 1];

    return `${allButLast}, and ${last}`;
}
