// Import the regions data from the JSON file
import regionsData from "../../data/region.json";

// Function to get the list of regions
export const getRegions = (): string[] => {
    // Return the regions data
    return regionsData;
};
