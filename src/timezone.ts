import { getCurrentTimeInTimeZone } from './utilities/getCurrentTimeInTimeZone';
import { listByRegion } from './utilities/listByRegion';
import { list } from "./utilities/list";
import { listWithoutLabel } from "./utilities/listWithoutLabel";
import { listWithoutValue } from "./utilities/listWithoutValue";
import { getLabelFromValue } from "./utilities/getLabelFromValue";
import { getValueFromLabel } from "./utilities/getValueFromLabel";
import { getRegions } from "./utilities/getRegions";
import { convertBetweenTimeZones } from "./utilities/convertBetweenTimeZones";
import { convertToUTC } from "./utilities/convertToUTC";
import { addTimeToDate } from './utilities/addTimeToDate';
import { getTimeDifferenceBetweenTimeZones } from './utilities/getTimeDifferenceBetweenTimeZones';
import { convertUTCToTimeZone } from './utilities/convertUTCToTimeZone';

class TimeZoneUtils {

    /**
     * Get all timezone list with label and value pair
     */
    static list = list;

    /**
     * Get all timezone list only values
     */
    static listWithoutLabel = listWithoutLabel;

    /**
     * Get all timezone list only labels
     */
    static listWithoutValue = listWithoutValue;

    /**
     * Get timezone list by a region
     */
    static listByRegion = listByRegion;

    /**
     * Get timezone label from value
     */
    static getLabelFromValue = getLabelFromValue;

    /**
     * Get timezone value from label
     */
    static getValueFromLabel = getValueFromLabel

    /**
     * Get region list
     */
    static getRegions = getRegions;

    /**
     * Convert a UTC DateTime to the selected timezone
     */
    static convertUTCToTimeZone = convertUTCToTimeZone;

    /**
     * Convert DateTime from one timezone to another
     */
    static convertBetweenTimeZones = convertBetweenTimeZones;

    /**
     * Convert any date-time string to UTC format
     */
    static convertToUTC = convertToUTC;
    /**
     * Get the current date-time in a specific timezone
     */
    static getCurrentTimeInTimeZone = getCurrentTimeInTimeZone;

    /**
     * Add or subtract time (hours, minutes, or days) from a date
     */
    static addTimeToDate = addTimeToDate;

    /**
     * Get the time difference between two timezones
     */
    static getTimeDifferenceBetweenTimeZones = getTimeDifferenceBetweenTimeZones;
}

export default TimeZoneUtils;