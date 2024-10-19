import { TimeZoneEntry, TimeZoneNames } from "../types";
import { list } from "./list";

/**
 * Get the timezone value corresponding to a given label
 * 
 * @param {string} label - The label of the timezone
 * @returns {TimeZoneNames | null} - The value of the timezone or null if not found
 */
export const getValueFromLabel = (label: string): TimeZoneNames | null => {
    // Find the timezone entry in the list that matches the given label
    const tz = list().find((tz: TimeZoneEntry) => tz.label === label);
    // Return the value if found, otherwise return null
    return tz ? tz.value : null;
};
