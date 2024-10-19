import { TimeZoneNames } from "../types";
import { listWithoutLabel } from "./listWithoutLabel";

/**
 * Get the time difference between two timezones
 * 
 * @param {string} date - The base date-time string
 * @param {string} fromTimeZone - The source timezone
 * @param {string} toTimeZone - The target timezone
 * @returns {string | null} - The time difference in hours and minutes or null if invalid
 */
export const getTimeDifferenceBetweenTimeZones = (
    date: string, 
    fromTimeZone: TimeZoneNames, 
    toTimeZone: TimeZoneNames
): string | null => {

    // Check if the provided timezones are valid
    if (!listWithoutLabel().includes(fromTimeZone) || !listWithoutLabel().includes(toTimeZone)) {
        return "Invalid timezone provided.";
    }

    // Create Date objects for the provided date in both timezones
    const fromDate = new Date(date);
    const toDate = new Date(date);

    // Validate the created Date objects
    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
        return "Invalid date format.";
    }

    // Get the timezone offsets in hours
    const fromOffset = -fromDate.getTimezoneOffset() / 60;
    const toOffset = -toDate.getTimezoneOffset() / 60;

    // Calculate the time difference between the two timezones
    const timeDifference = toOffset - fromOffset;
    const hours = Math.floor(Math.abs(timeDifference));
    const minutes = (Math.abs(timeDifference) % 1) * 60;

    // Return the time difference in hours and minutes
    return `${timeDifference >= 0 ? "+" : "-"}${hours} hours ${minutes} minutes`;
};
