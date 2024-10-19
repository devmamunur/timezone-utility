import { TimeZoneNames, ConvertOptions } from "../types";
import { convertUTCToTimeZone } from "./convertUTCToTimeZone";
import { listWithoutLabel } from "./listWithoutLabel";

/**
 * Get the current date-time in a specific timezone
 * 
 * @param {string} targetTimeZone - The target timezone
 * @param {object} options - The options object
 * @returns {string | null} - The current date-time string in the target timezone or null if invalid
 */
export const getCurrentTimeInTimeZone = (
    targetTimeZone: TimeZoneNames, 
    options: ConvertOptions = {}
): string | null => {
    // Destructure options with default values
    const { is24Hour = true, dateSeparator = '/', timeSeparator = ':' } = options;

    // Check if the provided target timezone is valid
    if (!listWithoutLabel().includes(targetTimeZone)) {
        return "Invalid timezone provided.";
    }

    // Get the current date and time
    const now = new Date();

    // Convert the current date and time to the target timezone
    return convertUTCToTimeZone(now, targetTimeZone, { is24Hour, dateSeparator, timeSeparator });
};
