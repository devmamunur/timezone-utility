/**
 * Check if a given date-time string is in ISO 8601 format
 * 
 * @param {string} dateTime - The date-time string to check
 * @returns {boolean} - True if the date-time string is in ISO 8601 format, otherwise false
 */
export const isISODateTime = (dateTime: string): boolean => {
    // Regular expression to match ISO 8601 date-time format
    const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|([+-]\d{2}:\d{2}))?$/;
    // Test the date-time string against the regular expression
    return isoRegex.test(dateTime);
};
