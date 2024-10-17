import timezones from "./data/timezones.json" assert { type: "json" };
import regions from "./data/region.json" assert { type: "json" };

interface TimeZoneEntry {
    label: string;
    value: string; // Flexible string for time zone values
}

// Type assertion for the imported JSON as an array of TimeZoneEntry
const timeZoneEntries: TimeZoneEntry[] = timezones as TimeZoneEntry[];
const regionList: string[] = regions as string[];

export type TimeZoneNames = TimeZoneEntry["value"];

interface ConvertOptions {
    is24Hour?: boolean;
    dateSeparator?: string;
    timeSeparator?: string;
}

class TimeZone {
    // Static property containing all time zones
    static timezones: TimeZoneEntry[] = timeZoneEntries;

    static regions: string[] = regionList;

    private static timezoneCache: Record<string, TimeZoneEntry[]> = {};

    // Check if the input string is a valid ISO 8601 date-time string
    static isISODateTime(dateTime: string): boolean {
        // Basic ISO 8601 DateTime regex
        const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|([+-]\d{2}:\d{2}))?$/;
        return isoRegex.test(dateTime);
    }
    /**
     * 1. Get all timezone list with label and value pair
     */
    static list(): TimeZoneEntry[] {
        return this.timezones;
    }

    /**
     * 2. Get all timezone list only values
     */
    static listWithoutLabel(): TimeZoneNames[] {
        return this.timezones.map((tz) => tz.value);
    }

    /**
     * 3. Get all timezone list only labels
     */
    static listWithoutValue(): string[] {
        return this.timezones.map((tz) => tz.label);
    }

    /**
     * 4. Get timezone list by a region
     */
    static listByRegion(region: string): TimeZoneEntry[] {
        if (!this.timezoneCache[region]) {
            this.timezoneCache[region] = this.timezones.filter((tz) =>
                tz.label.includes(region)
            );
        }
        return this.timezoneCache[region];
    }

    /**
     * 5. Get timezone label from value
     */
    static getLabelFromValue(value: TimeZoneNames): string | null {
        const tz = this.timezones.find((tz) => tz.value === value);
        return tz ? tz.label : null;
    }

    /**
     * 6. Get timezone value from label
     */
    static getValueFromLabel(label: string): TimeZoneNames | null {
        const tz = this.timezones.find((tz) => tz.label === label);
        return tz ? tz.value : null;
    }

    /**
     * 7. Get region list
     */
    static getRegions(): string[] {
        return this.regions;
    }

    /**
     * 8. Convert a UTC DateTime to the selected timezone
     * @param {Date | string} utcDate - The UTC DateTime (Date object or ISO string)
     * @param {string} targetTimeZone - The target timezone (e.g., 'America/New_York')
     * @param {object} options - The options object
     * @returns {string | null} - The converted date string or null if invalid
     */
    static convertUTCToTimeZone(
        utcDate: Date | string,
        targetTimeZone: TimeZoneNames,
        options: ConvertOptions = {}
    ): string | null {

        // Set default values for options
        const { is24Hour = true, dateSeparator = '/', timeSeparator = ':' } = options || {};

        if (!this.listWithoutLabel().includes(targetTimeZone)) {
            return "Invalid timezone provided.";
        }
    
        let date: Date;
        if (typeof utcDate === 'string') {
            date = new Date(utcDate);
        } else {
            date = utcDate;
        }
    
        if (isNaN(date.getTime())) {
            return "Invalid date format.";
        }
    
        const formatOptions: Intl.DateTimeFormatOptions = {
            timeZone: targetTimeZone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: !is24Hour // Toggle between 24-hour and 12-hour format
        };
    
        const formatter = new Intl.DateTimeFormat("en-US", formatOptions);
        let formattedDate = formatter.format(date);
    
        // Replace the default date separator with the user-defined one
        formattedDate = formattedDate.replace(/\//g, dateSeparator);

        // Replace the default time separator with the user-defined one
        if (timeSeparator !== ':') {
            formattedDate = formattedDate.replace(/:/g, timeSeparator);
        }
        return formattedDate;
    }

    /**
     * 9. Convert DateTime from one timezone to another
     * @param {string} date - The original date string
     * @param {string} fromTimeZone - The source timezone
     * @param {string} toTimeZone - The target timezone
     * @param {object} options - The options object
     * @returns {string | null} - The converted date string or null if invalid
     */
    static convertBetweenTimeZones(
        date: string,
        fromTimeZone: TimeZoneNames,
        toTimeZone: TimeZoneNames,
        options: ConvertOptions = {}
    ): string | null {
        // Set default values for options
        const { is24Hour = true, dateSeparator = '/', timeSeparator = ':' } = options;
        try {
            if (!this.listWithoutLabel().includes(fromTimeZone) || !this.listWithoutLabel().includes(toTimeZone)) {
                return 'Invalid timezone provided.';
            }
    
            // Create a date object from the input date string
            const originalDate = new Date(date);
            if (isNaN(originalDate.getTime())) {
                return 'Invalid date format.';
            }

            // Convert the original date to the source timezone using toLocaleString
            const formattedInSourceTimeZone = originalDate.toLocaleString("en-US", {
                timeZone: fromTimeZone,
            });

            // Convert the source timezone date to a Date object
            const dateInSourceTimeZone = new Date(formattedInSourceTimeZone);
    
            // Convert to target timezone using the updated Date object
            let convertedDate = dateInSourceTimeZone.toLocaleString("en-US", {
                timeZone: fromTimeZone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: !is24Hour // Toggle between 24-hour and 12-hour format
            });
    
            // Replace default separators with user-provided ones
            convertedDate = convertedDate.replace(/\//g, dateSeparator);
            if (timeSeparator !== ':') {
                convertedDate = convertedDate.replace(/:/g, timeSeparator);
            }

        return convertedDate;

        } catch (error) {
            console.error(error);
            return "An error occurred during time zone conversion.";
        }
    }

    /**
     * 10. Convert any date-time string to UTC format
     * @param {string} dateTime - The input date-time string in any format
     * @returns {string | null} - The corresponding UTC date string in ISO format or null if invalid
     */
    static convertToUTC(dateTime: string): string | null {
        try {

            // Trim the input to remove extra spaces
            const trimmedDateTime = dateTime.trim();

            // Check if the input string is a valid ISO 8601 date-time string
            if(!this.isISODateTime(trimmedDateTime)) {
                return "Invalid date format.";
            }

            // Attempt to create a new Date object
            const date = new Date(trimmedDateTime);
            
            // Check if the date is valid
            if (isNaN(date.getTime())) {
                return "Invalid date format.";
            }

            // Convert to UTC format (ISO 8601)
            return date.toISOString();
        } catch (error) {
            return "An error occurred during conversion.";
        }
    }
    /**
     * 11. Get the current date-time in a specific timezone
     * @param {string} targetTimeZone - The target timezone
     * @param {object} options - The options object
     * @returns {string | null} - The current date-time string in the target timezone or null if invalid
     */
    static getCurrentTimeInTimeZone(
        targetTimeZone: TimeZoneNames, 
        options: ConvertOptions = {}
    ): string | null {
        const { is24Hour = true, dateSeparator = '/', timeSeparator = ':' } = options;

        // Check if the provided target timezone is valid
        if (!this.listWithoutLabel().includes(targetTimeZone)) {
            return "Invalid timezone provided.";
        }

        // Get the current UTC date-time
        const now = new Date();

        // Convert the current date-time to the target timezone using the existing convertUTCToTimeZone method
        return this.convertUTCToTimeZone(now, targetTimeZone, { is24Hour, dateSeparator, timeSeparator });
    }

    /**
     * 12. Add or subtract time (hours, minutes, or days) from a date
     * @param {Date | string} date - The base date (Date object or string)
     * @param {number} amount - The amount of time to add (positive) or subtract (negative)
     * @param {string} unit - The unit of time ('hours', 'minutes', 'days')
     * @returns {string | null} - The new date in UTC format or null if invalid
     */
    static addTimeToDate(date: Date | string, amount: number, unit: 'hours' | 'minutes' | 'days'): string | null {
        let parsedDate = typeof date === 'string' ? new Date(date) : date;

        // Check if the date is valid
        if (isNaN(parsedDate.getTime())) {
            return "Invalid date format.";
        }

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

        // Return the updated date in UTC format
        return parsedDate.toISOString();
    }

    /**
     * 13. Get the time difference between two timezones
     * @param {string} date - The base date-time string
     * @param {string} fromTimeZone - The source timezone
     * @param {string} toTimeZone - The target timezone
     * @returns {string | null} - The time difference in hours and minutes or null if invalid
     */
    static getTimeDifferenceBetweenTimeZones(
        date: string, 
        fromTimeZone: TimeZoneNames, 
        toTimeZone: TimeZoneNames
        ): string | null {

        // Trim the input to remove extra spaces
        const trimmedDate = date.trim();

        const fromDate = new Date(trimmedDate);
        const toDate = new Date(trimmedDate);

        // Check if both dates are valid
        if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
            return "Invalid date format.";
        }

        // Convert both dates to their respective timezones
        const fromOffset = -fromDate.getTimezoneOffset() / 60;
        const toOffset = -toDate.getTimezoneOffset() / 60;

        // Calculate the time difference
        const timeDifference = toOffset - fromOffset;

        const hours = Math.floor(Math.abs(timeDifference));
        const minutes = (Math.abs(timeDifference) % 1) * 60;

        return `${timeDifference >= 0 ? "+" : "-"}${hours} hours ${minutes} minutes`;
    }
}

export default TimeZone;
