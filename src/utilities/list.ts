// Import the TimeZoneEntry type from the types module
import { TimeZoneEntry } from "../types";

// Import the timezones data from the JSON file
import timezonesData from "../../data/timezones.json";

// Assign the imported timezones data to a constant variable
const timezones: TimeZoneEntry[] = timezonesData;

// Function to get the list of timezones
export const list = (): TimeZoneEntry[] => {
    // Return the timezones data
    return timezones;
};
