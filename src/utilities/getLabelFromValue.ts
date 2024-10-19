import { TimeZoneEntry, TimeZoneNames } from "../types";
import { list } from "./list";

/**
 * Get the label corresponding to a given timezone value
 * 
 * @param {TimeZoneNames} value - The timezone value
 * @returns {string | null} - The label of the timezone or null if not found
 */
export const getLabelFromValue = (value: TimeZoneNames): string | null => {
    // Find the timezone entry in the list that matches the given value
    const tz = list().find((tz: TimeZoneEntry) => tz.value === value);
    // Return the label if found, otherwise return null
    return tz ? tz.label : null;
};
