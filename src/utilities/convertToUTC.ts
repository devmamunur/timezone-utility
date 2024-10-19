import { isISODateTime } from "./isISODateTime";

/**
 * Convert any date-time string to UTC format
 * 
 * @param {string} dateTime - The input date-time string in any format
 * @returns {string | null} - The corresponding UTC date string in ISO format or null if invalid
 */
export const convertToUTC = (dateTime: string): string | null => {
    // Trim any leading or trailing whitespace from the input date-time string
    const trimmedDateTime = dateTime.trim();

    // Check if the trimmed date-time string is in ISO format
    if (!isISODateTime(trimmedDateTime)) {
        return "Invalid date format.";
    }

    // Create a new Date object from the trimmed date-time string
    const date = new Date(trimmedDateTime);
    
    // Validate the created Date object
    if (isNaN(date.getTime())) {
        return "Invalid date format.";
    }

    // Return the date in ISO string format (UTC)
    return date.toISOString();
};
