/**
 * Timezone Utility
 * 
 * A versatile timezone management package designed for CommonJS, ES Module (ESM), JavaScript, and TypeScript projects. 
 * It offers a range of features, including timezone listing, retrieving labels and values, region-based filtering, and converting between UTC and other timezones.
 * @packageDocumentation
 */

import { DateTime } from 'luxon';
import timezonesData from "./timezones.json";
import regionsData from "./region.json";

interface TimeZoneEntry {
    label: string;
    value: string;
    country: string;
    phoneCode: string;
    utcOffset: string;
}

interface ConvertOptions {
    returnISO?: boolean;
    is24Hour?: boolean;
    dateSeparator?: string;
    timeSeparator?: string;
}

type TimeZoneNames = TimeZoneEntry["value"];

const timezones: TimeZoneEntry[] = timezonesData; 
const regions: string[] = regionsData;

/**
 * TimeZone class providing static methods for time zone operations.
 */
class TimeZone {
    static readonly timezones: TimeZoneEntry[] = timezones;
    static readonly regions: string[] = regions;

    private static timezoneCache: Record<string, TimeZoneEntry[]> = {};

    /**
     * Checks if a given string is a valid ISO date-time format.
     * @param dateTime - The date-time string to validate.
     * @returns True if the string is a valid ISO date-time, false otherwise.
     */
    static isISODateTime(dateTime: string): boolean {
        return DateTime.fromISO(dateTime).isValid;
    }

    /**
     * Validates if a given string is a valid time zone.
     * @param timeZone - The time zone string to validate.
     * @returns True if the time zone is valid, false otherwise.
     */
    static isValidTimeZone(timeZone: string): boolean {
        return this.listWithOnlyValue().includes(timeZone);
    }

    /**
     * Converts a date-time from one time zone to another.
     * @param dateTime - The date-time to convert (Date object or ISO string).
     * @param sourceTimeZone - The source time zone.
     * @param targetTimeZone - The target time zone.
     * @param returnISO - Whether to return ISO format (default: true).
     * @returns Converted date-time string in ISO format or Error if conversion fails.
     */
    static convertDateTime(dateTime: Date | string, sourceTimeZone: TimeZoneNames, targetTimeZone: TimeZoneNames, returnISO: boolean = true): string | Error {
        if (!this.isValidTimeZone(sourceTimeZone) || !this.isValidTimeZone(targetTimeZone)) {
            return new Error('Invalid time zone provided.');
        }

        try {
            const sourceDate = typeof dateTime === 'string' ? DateTime.fromISO(dateTime, { zone: sourceTimeZone }) : DateTime.fromJSDate(dateTime, { zone: sourceTimeZone });

            if (!sourceDate.isValid) {
                throw new Error('Invalid date-time format.');
            }

            const targetDate = sourceDate.setZone(targetTimeZone);
            return returnISO ? targetDate.toISO() : targetDate.toFormat('yyyy-MM-dd HH:mm:ss');
        } catch (error) {
            return error;
        }
    }

    /**
     * Returns a list of all available time zones.
     * @returns Array of TimeZoneEntry objects.
     */
    static list(): TimeZoneEntry[] {
        return this.timezones;
    }

    /**
     * Returns a list of all time zone values.
     * @returns Array of time zone values.
     */
    static listWithOnlyValue(): TimeZoneNames[] {
        return this.timezones.map((tz) => tz.value);
    }

    /**
     * Returns a list of all time zone labels.
     * @returns Array of time zone labels.
     */
    static listWithOnlyLabel(): string[] {
        return this.timezones.map((tz) => tz.label);
    }

    /**
     * Lists time zones for a specific region.
     * @param region - The region to filter time zones.
     * @returns Array of TimeZoneEntry objects for the specified region.
     */
    static listByRegion(region: string): TimeZoneEntry[] {
        if (!region || typeof region !== 'string') {
            return [];
        }
        const searchTerm = region.toLowerCase().trim();
        if (!this.timezoneCache[searchTerm]) {
            this.timezoneCache[searchTerm] = this.timezones.filter((tz) =>
                tz.label.toLowerCase().includes(searchTerm)
            );
        }
        return this.timezoneCache[searchTerm];
    }

    /**
     * Lists time zones for a specific country.
     * @param country - The country to filter time zones.
     * @returns Array of TimeZoneEntry objects for the specified country.
     */
    static listByCountry(country: string): TimeZoneEntry[] {
        if (!country || typeof country !== 'string') {
            return [];
        }
        const searchTerm = country.toLowerCase().trim();
        if (!this.timezoneCache[searchTerm]) {
            this.timezoneCache[searchTerm] = this.timezones.filter((tz) =>
                tz.country.toLowerCase().includes(searchTerm)
            );
        }
        return this.timezoneCache[searchTerm];
    }

    /**
     * Gets the details for a given time zone value.
     * @param value - The time zone value.
     * @returns The corresponding details or null if not found.
     */
    static getDetailsUsingTimeZoneValue(value: TimeZoneNames): TimeZoneEntry | null {
        const tz = this.timezones.find((tz) => tz.value === value);
        return tz ? tz : null;
    }


    /**
     * Returns a list of all available regions.
     * @returns Array of region strings.
     */
    static getRegions(): string[] {
        return this.regions;
    }

    /**
     * Converts a UTC date to a specified time zone.
     * @param utcDate - The UTC date (Date object or ISO string).
     * @param targetTimeZone - The target time zone.
     * @param options - Conversion options (optional).
     * @returns ISO formatted date-time string in the target time zone or error message.
     */
    static convertUTCToTimeZone(utcDate: Date | string, targetTimeZone: TimeZoneNames, options: ConvertOptions = {}): string | null {
        const { returnISO = true } = options;

        if (!this.isValidTimeZone(targetTimeZone)) {
            return "Invalid timezone provided.";
        }

        const date = typeof utcDate === "string" ? DateTime.fromISO(utcDate, { zone: 'UTC' }) : DateTime.fromJSDate(utcDate, { zone: 'UTC' });

        if (!date.isValid) {
            return "Invalid date format.";
        }

        const targetDate = date.setZone(targetTimeZone);
        
        if (returnISO) {
            return targetDate.toISO();
        } else {
            const { is24Hour = true, dateSeparator = '-', timeSeparator = ':' } = options;
            let formattedDate = targetDate.toFormat(is24Hour ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd hh:mm:ss a');

            if (dateSeparator !== '-') {
                formattedDate = formattedDate.replace(/-/g, dateSeparator);
            }
            if (timeSeparator !== ':') {
                formattedDate = formattedDate.replace(/:/g, timeSeparator);
            }
            
            return formattedDate;
        }
    }

    /**
     * Converts a date-time from a specified time zone to UTC.
     * @param dateTime - The date-time to convert (Date object or ISO string).
     * @param sourceTimeZone - The source time zone.
     * @param options - Conversion options (optional).
     * @returns ISO formatted UTC date-time string or error message.
     */
    static convertToUTC(dateTime: Date | string, sourceTimeZone: TimeZoneNames, options: ConvertOptions = {}): string | Error {
        try {
            const { returnISO = true } = options;

            if (!this.isValidTimeZone(sourceTimeZone)) {
                return "Invalid timezone provided.";
            }

            const date = typeof dateTime === "string" ? DateTime.fromISO(dateTime, { zone: sourceTimeZone }) : DateTime.fromJSDate(dateTime, { zone: sourceTimeZone });

            if (!date.isValid) {
                return "Invalid date format.";
            }

            const utcDate = date.setZone('UTC');
            
            if (returnISO) {
                return utcDate.toISO();
            } else {
                const { is24Hour = true, dateSeparator = '-', timeSeparator = ':' } = options;
                let formattedUTC = utcDate.toFormat(is24Hour ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd hh:mm:ss a');

                if (dateSeparator !== '-') {
                    formattedUTC = formattedUTC.replace(/-/g, dateSeparator);
                }
                if (timeSeparator !== ':') {
                    formattedUTC = formattedUTC.replace(/:/g, timeSeparator);
                }
                
                return formattedUTC;
            }
        } catch (error) {
            return "An error occurred during conversion.";
        }
    }

    /**
     * Converts a date-time between two specified time zones.
     * @param date - The date-time string to convert.
     * @param fromTimeZone - The source time zone.
     * @param toTimeZone - The target time zone.
     * @param options - Conversion options (optional).
     * @returns ISO formatted date-time string in the target time zone or error message.
     */
    static convertBetweenTimeZones(date: string, fromTimeZone: TimeZoneNames, toTimeZone: TimeZoneNames, options: ConvertOptions = {}): string | null {
        const { returnISO = true } = options;
        
        try {
            if (!this.isValidTimeZone(fromTimeZone) || !this.isValidTimeZone(toTimeZone)) {
                return "Invalid timezone provided.";
            }

            const originalDate = DateTime.fromISO(date, { zone: fromTimeZone });

            if (!originalDate.isValid) {
                return 'Invalid date format.';
            }

            const targetDate = originalDate.setZone(toTimeZone);
            
            if (returnISO) {
                return targetDate.toISO();
            } else {
                const { is24Hour = true, dateSeparator = '-', timeSeparator = ':' } = options;
                let formattedDate = targetDate.toFormat(is24Hour ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd hh:mm:ss a');

                if (dateSeparator !== '-') {
                    formattedDate = formattedDate.replace(/-/g, dateSeparator);
                }
                if (timeSeparator !== ':') {
                    formattedDate = formattedDate.replace(/:/g, timeSeparator);
                }
                
                return formattedDate;
            }
        } catch (error) {
            return "An error occurred during time zone conversion.";
        }
    }

    /**
     * Gets the current time in a specified time zone.
     * @param targetTimeZone - The target time zone.
     * @param options - Formatting options (optional).
     * @returns ISO formatted current date-time string in the target time zone or error message.
     */
    static getCurrentTimeInTimeZone(targetTimeZone: TimeZoneNames, options: ConvertOptions = {}): string | null {
        const { returnISO = true } = options;

        if (!this.isValidTimeZone(targetTimeZone)) {
            return "Invalid timezone provided.";
        }

        const currentDateInTimeZone = DateTime.now().setZone(targetTimeZone);
        
        if (returnISO) {
            return currentDateInTimeZone.toISO();
        } else {
            const { is24Hour = true, dateSeparator = '-', timeSeparator = ':' } = options;
            let formattedDate = currentDateInTimeZone.toFormat(is24Hour ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd hh:mm:ss a');

            if (dateSeparator !== '-') {
                formattedDate = formattedDate.replace(/-/g, dateSeparator);
            }

            if (timeSeparator !== ':') {
                formattedDate = formattedDate.replace(/:/g, timeSeparator);
            }
            
            return formattedDate;
        }
    }

    /**
     * Calculates the time difference between two time zones for a given date.
     * @param date - The date string to use for calculation.
     * @param fromTimeZone - The source time zone.
     * @param toTimeZone - The target time zone.
     * @returns Formatted time difference string or error message.
     */
    static getTimeDifferenceBetweenTimeZones(date: string, fromTimeZone: TimeZoneNames, toTimeZone: TimeZoneNames): string | null {
        if (!this.isValidTimeZone(fromTimeZone) || !this.isValidTimeZone(toTimeZone)) {
            return "Invalid timezone provided.";
        }

        const fromTime = DateTime.fromISO(date, { zone: fromTimeZone });
        const toTime = DateTime.fromISO(date, { zone: toTimeZone });

        if (!fromTime.isValid || !toTime.isValid) {
            return 'Invalid date format.';
        }

        const timeDifference = toTime.diff(fromTime, ['hours', 'minutes']);
        const hours = Math.abs(timeDifference.hours);
        const minutes = Math.abs(timeDifference.minutes);

        return `${timeDifference.toMillis() >= 0 ? "+" : "-"}${hours} hours ${minutes} minutes`;
    }

    /**
     * Convert UTC date-time to Local date-time and return local ISO string
     * @param dateTimeString - The date-time string to convert.
     * @returns Local formatted date-time string or null if conversion fails.
     */
    static convertUTCToLocal(dateTimeString: string): string | null {
        try {
  
            const utcDateTime = DateTime.fromISO(dateTimeString, { zone: 'UTC' });

            if (!utcDateTime.isValid) {
                return null;
            }
            const localDateTime = utcDateTime.toLocal();

            return localDateTime.toISO();
        } catch (error) {
            return null;
        }
    }

    /**
     * Format an ISO date-time string using a custom format pattern
     * @param isoDateTimeString - The ISO date-time string to format
     * @param format - The format pattern (using Luxon's format tokens)
     * @param timezone - Optional timezone to convert to before formatting (default: UTC)
     * @returns Formatted date-time string or null if formatting fails
     */
    static formatDateTime(isoDateTimeString: string, format: string, timezone: TimeZoneNames = 'UTC'): string | null {
        try {
            if (!this.isValidTimeZone(timezone) && timezone !== 'UTC') {
                return "Invalid timezone provided.";
            }

            const dateTime = DateTime.fromISO(isoDateTimeString);
            
            if (!dateTime.isValid) {
                return "Invalid ISO date-time string.";
            }
            
            const dateInTimezone = dateTime.setZone(timezone);
            return dateInTimezone.toFormat(format);
        } catch (error) {
            return null;
        }
    }

    /**
     * Get the user's local timezone
     * @returns The IANA timezone identifier string for the user's local timezone
     */
    static getLocalTimeZone(): string {
        return DateTime.local().zoneName;
    }
}

export { TimeZone };
export default TimeZone;