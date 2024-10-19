// Import the TimeZoneEntry and TimeZoneNames types from the types module
import { TimeZoneEntry, TimeZoneNames } from "../types";

// Import the list function from the list module
import { list } from "./list";

// Function to get the list of timezone values without labels
export const listWithoutLabel = (): TimeZoneNames[] => {
    // Map the list of timezones to an array of their values
    return list().map((tz: TimeZoneEntry) => tz.value);
};
