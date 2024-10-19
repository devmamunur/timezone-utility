import { TimeZoneNames, ConvertOptions } from "../types";
import { listWithoutLabel } from "./listWithoutLabel";

/**
 * Convert DateTime from one timezone to another
 * 
 * @param {string} date - The original date string
 * @param {string} fromTimeZone - The source timezone
 * @param {string} toTimeZone - The target timezone
 * @param {object} options - The options object
 * @returns {string | null} - The converted date string or null if invalid
 */
export const convertBetweenTimeZones = (
    date: string,
    fromTimeZone: TimeZoneNames,
    toTimeZone: TimeZoneNames,
    options: ConvertOptions = {}
): string | null => {
    const { is24Hour = true, dateSeparator = '/', timeSeparator = ':' } = options;

    // Check if the provided timezones are valid
    if (!listWithoutLabel().includes(fromTimeZone) || !listWithoutLabel().includes(toTimeZone)) {
        return 'Invalid timezone provided.';
    }

    const originalDate = new Date(date);
    // Validate the original date
    if (isNaN(originalDate.getTime())) {
        return 'Invalid date format.';
    }

    // Convert the original date to the source timezone
    const formattedInSourceTimeZone = originalDate.toLocaleString("en-US", {
        timeZone: fromTimeZone,
    });

    const dateInSourceTimeZone = new Date(formattedInSourceTimeZone);

    // Convert the date from the source timezone to the target timezone
    let convertedDate = dateInSourceTimeZone.toLocaleString("en-US", {
        timeZone: fromTimeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: !is24Hour
    });

    // Replace date and time separators if necessary
    convertedDate = convertedDate.replace(/\//g, dateSeparator);
    if (timeSeparator !== ':') {
        convertedDate = convertedDate.replace(/:/g, timeSeparator);
    }

    return convertedDate;
};
