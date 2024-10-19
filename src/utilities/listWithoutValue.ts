// Import the TimeZoneEntry type from the types module
import { TimeZoneEntry } from "../types";

// Import the list function from the list module
import { list } from "./list";

// Function to get the list of timezone labels without values
export const listWithoutValue = (): string[] => {
    // Map the list of timezones to an array of their labels
    return list().map((tz: TimeZoneEntry) => tz.label);
};
