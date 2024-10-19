import { TimeZoneNames, ConvertOptions } from "../types";
import { listWithoutLabel } from "./listWithoutLabel";

/**
 * Convert a UTC DateTime to the selected timezone
 *
 * @param {Date | string} utcDate - The UTC DateTime (Date object or ISO string)
 * @param {string} targetTimeZone - The target timezone (e.g., 'America/New_York')
 * @param {object} options - The options object containing formatting preferences
 * @returns {string | null} - The converted date string or null if invalid
 */
export const convertUTCToTimeZone = (
    utcDate: Date | string, 
    targetTimeZone: TimeZoneNames, 
    options: ConvertOptions = {}
): string | null => {

    const { is24Hour = true, dateSeparator = '/', timeSeparator = ':' } = options;

    // Check if the provided target time zone is valid
    if (!listWithoutLabel().includes(targetTimeZone)) {
        return "Invalid timezone provided.";
    }

    let date: Date;
    // Parse the input date
    if (typeof utcDate === 'string') {
        date = new Date(utcDate);
    } else {
        date = utcDate;
    }

    // Validate the parsed date
    if (isNaN(date.getTime())) {
        return "Invalid date format.";
    }

    // Define formatting options for the date
    const formatOptions: Intl.DateTimeFormatOptions = {
        timeZone: targetTimeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: !is24Hour
    };

    // Create a formatter with the specified options
    const formatter = new Intl.DateTimeFormat("en-US", formatOptions);
    let formattedDate = formatter.format(date);

    // Replace date and time separators if necessary
    formattedDate = formattedDate.replace(/\//g, dateSeparator);
    if (timeSeparator !== ':') {
        formattedDate = formattedDate.replace(/:/g, timeSeparator);
    }

    return formattedDate;
};
