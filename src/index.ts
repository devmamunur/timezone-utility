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
        return this.listWithoutLabel().includes(timeZone);
    }

    /**
     * Converts a date-time from one time zone to another.
     * @param dateTime - The date-time to convert (Date object or ISO string).
     * @param sourceTimeZone - The source time zone.
     * @param targetTimeZone - The target time zone.
     * @param is24Hour - Whether to use 24-hour format (default: false).
     * @returns Converted date-time string or Error if conversion fails.
     */
    static convertDateTime(dateTime: Date | string, sourceTimeZone: TimeZoneNames, targetTimeZone: TimeZoneNames, is24Hour: boolean = false): string | Error {
        if (!this.isValidTimeZone(sourceTimeZone) || !this.isValidTimeZone(targetTimeZone)) {
            return new Error('Invalid time zone provided.');
        }

        try {
            const sourceDate = typeof dateTime === 'string' ? DateTime.fromISO(dateTime, { zone: sourceTimeZone }) : DateTime.fromJSDate(dateTime, { zone: sourceTimeZone });

            if (!sourceDate.isValid) {
                throw new Error('Invalid date-time format.');
            }

            const targetDate = sourceDate.setZone(targetTimeZone);
            return targetDate.toFormat(is24Hour ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd hh:mm:ss a');
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
     * Returns a list of all time zone values without labels.
     * @returns Array of time zone values.
     */
    static listWithoutLabel(): TimeZoneNames[] {
        return this.timezones.map((tz) => tz.value);
    }

    /**
     * Returns a list of all time zone labels without values.
     * @returns Array of time zone labels.
     */
    static listWithoutValue(): string[] {
        return this.timezones.map((tz) => tz.label);
    }

    /**
     * Lists time zones for a specific region.
     * @param region - The region to filter time zones.
     * @returns Array of TimeZoneEntry objects for the specified region.
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
     * Lists time zones for a specific country.
     * @param country - The country to filter time zones.
     * @returns Array of TimeZoneEntry objects for the specified country.
     */
    static listByCountry(country: string): TimeZoneEntry[] {
        if (!this.timezoneCache[country]) {
            this.timezoneCache[country] = this.timezones.filter((tz) =>
                tz.country.includes(country)
            );
        }
        return this.timezoneCache[country];
    }

    /**
     * Gets the label for a given time zone value.
     * @param value - The time zone value.
     * @returns The corresponding label or null if not found.
     */
    static getLabelFromValue(value: TimeZoneNames): string | null {
        const tz = this.timezones.find((tz) => tz.value === value);
        return tz ? tz.label : null;
    }

    /**
     * Gets the value for a given time zone label.
     * @param label - The time zone label.
     * @returns The corresponding value or null if not found.
     */
    static getValueFromLabel(label: string): TimeZoneNames | null {
        const tz = this.timezones.find((tz) => tz.label === label);
        return tz ? tz.value : null;
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
     * @returns Formatted date-time string in the target time zone or error message.
     */
    static convertUTCToTimeZone(utcDate: Date | string, targetTimeZone: TimeZoneNames, options: ConvertOptions = {}): string | null {
        const { is24Hour = true, dateSeparator = '-', timeSeparator = ':' } = options;

        if (!this.isValidTimeZone(targetTimeZone)) {
            return "Invalid timezone provided.";
        }

        const date = typeof utcDate === "string" ? DateTime.fromISO(utcDate, { zone: 'UTC' }) : DateTime.fromJSDate(utcDate, { zone: 'UTC' });

        if (!date.isValid) {
            return "Invalid date format.";
        }

        const targetDate = date.setZone(targetTimeZone);
        let formattedDate = targetDate.toFormat(is24Hour ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd hh:mm:ss a');

        if (dateSeparator !== '-') {
            formattedDate = formattedDate.replace(/-/g, dateSeparator);
        }
        if (timeSeparator !== ':') {
            formattedDate = formattedDate.replace(/:/g, timeSeparator);
        }

        return formattedDate;
    }

    /**
     * Converts a date-time from a specified time zone to UTC.
     * @param dateTime - The date-time to convert (Date object or ISO string).
     * @param sourceTimeZone - The source time zone.
     * @param options - Conversion options (optional).
     * @returns Formatted UTC date-time string or error message.
     */
    static convertToUTC(dateTime: Date | string, sourceTimeZone: TimeZoneNames, options: ConvertOptions = {}): string | Error {
        try {
            const { is24Hour = true, dateSeparator = '-', timeSeparator = ':' } = options;

            if (!this.isValidTimeZone(sourceTimeZone)) {
                return "Invalid timezone provided.";
            }

            const date = typeof dateTime === "string" ? DateTime.fromISO(dateTime, { zone: sourceTimeZone }) : DateTime.fromJSDate(dateTime, { zone: sourceTimeZone });

            if (!date.isValid) {
                return "Invalid date format.";
            }

            const utcDate = date.setZone('UTC');
            let formattedUTC = utcDate.toFormat(is24Hour ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd hh:mm:ss a');

            if (dateSeparator !== '-') {
                formattedUTC = formattedUTC.replace(/-/g, dateSeparator);
            }
            if (timeSeparator !== ':') {
                formattedUTC = formattedUTC.replace(/:/g, timeSeparator);
            }

            return formattedUTC;
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
     * @returns Formatted date-time string in the target time zone or error message.
     */
    static convertBetweenTimeZones(date: string, fromTimeZone: TimeZoneNames, toTimeZone: TimeZoneNames, options: ConvertOptions = {}): string | null {
        const { is24Hour = true, dateSeparator = '-', timeSeparator = ':' } = options;
        try {
            if (!this.isValidTimeZone(fromTimeZone) || !this.isValidTimeZone(toTimeZone)) {
                return "Invalid timezone provided.";
            }

            const originalDate = DateTime.fromISO(date, { zone: fromTimeZone });

            if (!originalDate.isValid) {
                return 'Invalid date format.';
            }

            const targetDate = originalDate.setZone(toTimeZone);
            let formattedDate = targetDate.toFormat(is24Hour ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd hh:mm:ss a');

            if (dateSeparator !== '-') {
                formattedDate = formattedDate.replace(/-/g, dateSeparator);
            }
            if (timeSeparator !== ':') {
                formattedDate = formattedDate.replace(/:/g, timeSeparator);
            }

            return formattedDate;
        } catch (error) {
            return "An error occurred during time zone conversion.";
        }
    }

    /**
     * Gets the current time in a specified time zone.
     * @param targetTimeZone - The target time zone.
     * @param options - Formatting options (optional).
     * @returns Formatted current date-time string in the target time zone or error message.
     */
    static getCurrentTimeInTimeZone(targetTimeZone: TimeZoneNames, options: ConvertOptions = {}): string | null {
        const { is24Hour = true, dateSeparator = '-', timeSeparator = ':' } = options;

        if (!this.isValidTimeZone(targetTimeZone)) {
            return "Invalid timezone provided.";
        }

        const currentDateInTimeZone = DateTime.now().setZone(targetTimeZone);
        let formattedDate = currentDateInTimeZone.toFormat(is24Hour ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd hh:mm:ss a');

        if (dateSeparator !== '-') {
            formattedDate = formattedDate.replace(/-/g, dateSeparator);
        }

        if (timeSeparator !== ':') {
            formattedDate = formattedDate.replace(/:/g, timeSeparator);
        }

        return formattedDate;
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
     * Converts a formatted date-time string to ISO format.
     * @param dateTimeString - The date-time string to convert.
     * @returns ISO formatted date-time string or null if conversion fails.
     */
    static convertToISO(dateTimeString: string): string | null {
        const dateTime = DateTime.fromFormat(dateTimeString, "d'th' MMMM yyyy, h:mm a", { zone: 'UTC' });

        if (!dateTime.isValid) {
            return null;
        }

        return dateTime.toISO({ suppressMilliseconds: true, includeOffset: false });
    }
}

export { TimeZone };
export default TimeZone;