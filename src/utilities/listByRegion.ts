// Import the TimeZoneEntry type from the types module
import { TimeZoneEntry } from "../types";

// Import the list function from the list module
import { list } from "./list";

// Create a cache object to store timezones by region
const timezoneCache: Record<string, TimeZoneEntry[]> = {};

// Function to get the list of timezones for a specific region
export const listByRegion = (region: string): TimeZoneEntry[] => {
    // Check if the region is already cached
    if (!timezoneCache[region]) {
        // If not cached, filter the timezones by the region and store in cache
        timezoneCache[region] = list().filter((tz) => tz.label.includes(region));
    }
    // Return the cached timezones for the region
    return timezoneCache[region];
};
