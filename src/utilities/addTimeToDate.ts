/**
 * Add or subtract time (hours, minutes, or days) from a date
 *
 * @param {Date | string} date - The base date (Date object or string)
 * @param {number} amount - The amount of time to add (positive) or subtract (negative)
 * @param {string} unit - The unit of time ('hours', 'minutes', 'days')
 * @returns {string | null} - The new date in UTC format or null if invalid
 */
export const addTimeToDate = (
    date: Date | string, 
    amount: number, 
    unit: 'hours' | 'minutes' | 'days'
): string | null => {
    let parsedDate = typeof date === 'string' ? new Date(date) : date;

    // Validate the parsed date
    if (isNaN(parsedDate.getTime())) {
        return "Invalid date format.";
    }

    // Add or subtract the specified amount of time based on the unit
    switch (unit) {
        case 'hours':
            parsedDate.setHours(parsedDate.getHours() + amount);
            break;
        case 'minutes':
            parsedDate.setMinutes(parsedDate.getMinutes() + amount);
            break;
        case 'days':
            parsedDate.setDate(parsedDate.getDate() + amount);
            break;
        default:
            return "Invalid time unit provided.";
    }

    // Return the new date in ISO string format
    return parsedDate.toISOString();
};
