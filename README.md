# Timezone Utility

A versatile timezone management package designed for CommonJS, ES Module (ESM), JavaScript, and TypeScript projects. It offers a range of features, including timezone listing, retrieving labels and values, region-based filtering, and converting between UTC and other timezones.


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Methods Overview](#methods-overview)
- [Methods](#methods)
  - [list](#list)
  - [listWithOnlyValue](#listWithOnlyValue)
  - [listWithOnlyLabel](#listWithOnlyLabel)
  - [listByRegion](#listByRegion)
  - [listByCountry](#listByCountry)
  - [getDetailsUsingTimeZoneValue](#getDetailsUsingTimeZoneValue)
  - [getRegions](#getRegions)
  - [convertUTCToTimeZone](#convertUTCToTimeZone)
  - [convertToUTC](#convertToUTC)
  - [convertBetweenTimeZones](#convertBetweenTimeZones)
  - [getCurrentTimeInTimeZone](#getCurrentTimeInTimeZone)
  - [getTimeDifferenceBetweenTimeZones](#getTimeDifferenceBetweenTimeZones)
  - [convertUTCToLocal](#convertUTCToLocal)
  - [formatDateTime](#formatDateTime)
  - [getLocalTimeZone](#getLocalTimeZone)
- [License](#license)
- [Contributing](#contributing)

## Installation
Install the package using npm:

```bash
npm install timezone-utility
```

## Usage

```javascript
// For ES Module (ESM)
import { TimeZone } from "timezone-utility";

// For CommonJS
const { TimeZone } = require("timezone-utility");
```

## Methods Overview

| Method Name | Description |
|-------------|-------------|
| `list` | Returns a list of all available time zones. |
| `listWithOnlyValue` | Returns a list of all time zone values. |
| `listWithOnlyLabel` | Returns a list of all time zone labels. |
| `listByRegion` | Lists time zones for a specific region. |
| `listByCountry` | Lists time zones for a specific country. |
| `getDetailsUsingTimeZoneValue` | Gets the details for a given time zone value. |
| `getRegions` | Returns a list of all available regions. |
| `convertUTCToTimeZone` | Converts a UTC date to a specified time zone. |
| `convertToUTC` | Converts a date-time from a specified time zone to UTC. |
| `convertBetweenTimeZones` | Converts a date-time between two specified time zones. |
| `getCurrentTimeInTimeZone` | Gets the current time in a specified time zone. |
| `getTimeDifferenceBetweenTimeZones` | Calculates the time difference between two time zones. |
| `convertUTCToLocal` | Converts UTC date-time to Local date-time. |
| `formatDateTime` | Format an ISO date-time string using a custom format pattern. |
| `getLocalTimeZone` | Get the user's local timezone. |

## Methods

### list
Returns a list of all available time zones.

```javascript
const timeZones = TimeZone.list();
console.log(timeZones);
/* OUTPUT:
[
  {
    "label": "(UTC-05:00) Eastern Time - New York",
    "value": "America/New_York",
    "country": "United States",
    "phoneCode": "+1",
    "utcOffset": "-05:00"
  },
  ...
]
*/
```

### listWithOnlyValue
Returns a list of all time zone values without labels.

```javascript
const timeZoneValues = TimeZone.listWithOnlyValue();
console.log(timeZoneValues);
/* OUTPUT:
["America/New_York", "Europe/London", "Asia/Tokyo", ...]
*/
```

### listWithOnlyLabel
Returns a list of all time zone labels without values.

```javascript
const timeZoneLabels = TimeZone.listWithOnlyLabel();
console.log(timeZoneLabels);
/* OUTPUT:
["(UTC-05:00) Eastern Time - New York", "(UTC+00:00) London", ...]
*/
```

### listByRegion
Lists time zones for a specific region.

```javascript
const timeZonesInAmerica = TimeZone.listByRegion('America');
console.log(timeZonesInAmerica);
/* OUTPUT:
[
  {
    "label": "(UTC-05:00) America/New_York",
    "value": "America/New_York",
    "country": "United States",
    "phoneCode": "+1",
    "utcOffset": "-05:00"
  },
  ...
]
*/
```

Parameters:
- `region: string`: The region to filter time zones.

### listByCountry
Lists time zones for a specific country.

```javascript
const timeZonesInUS = TimeZone.listByCountry('United States');
console.log(timeZonesInUS);
/* OUTPUT:
[
  {
    "label": "(UTC-05:00) Eastern Time - New York",
    "value": "America/New_York",
    "country": "United States",
    "phoneCode": "+1",
    "utcOffset": "-05:00"
  },
  ...
]
*/
```

Parameters:
- `country: string`: The country to filter time zones.

### getDetailsUsingTimeZoneValue
Gets the details for a given time zone value.

```javascript
const tzDetails = TimeZone.getDetailsUsingTimeZoneValue('America/New_York');
console.log(tzDetails);
/* OUTPUT:
{
  "label": "(UTC-05:00) Eastern Time - New York",
  "value": "America/New_York",
  "country": "United States",
  "phoneCode": "+1",
  "utcOffset": "-05:00"
}
*/
```

Parameters:
- `value: string`: The time zone value.

### getRegions
Returns a list of all available regions.

```javascript
const regions = TimeZone.getRegions();
console.log(regions);
/* OUTPUT:
["Africa", "America", "Asia", "Atlantic", "Australia", "Europe", "Indian", "Pacific"]
*/
```

### convertUTCToTimeZone
Converts a UTC date to a specified time zone.

```javascript
// Using ISO string
const converted1 = TimeZone.convertUTCToTimeZone('2024-03-15T10:00:00Z', 'America/New_York', { is24Hour: true });
console.log(converted1);
/* OUTPUT:
"2024-03-15T05:00:00.000-05:00"
*/

// Using Date object with custom formatting
const date = new Date('2024-03-15T10:00:00Z');
const converted2 = TimeZone.convertUTCToTimeZone(date, 'America/New_York', {
  returnISO: false,
  is24Hour: false,
  dateSeparator: '/',
  timeSeparator: ':'
});
console.log(converted2);
/* OUTPUT:
"2024/03/15 05:00:00 AM"
*/
```

Parameters:
- `utcDate: Date | string`: The UTC date.
- `targetTimeZone: string`: The target time zone.
- `options: ConvertOptions (optional)`: Object containing optional formatting options:
  - `returnISO: boolean`: Whether to return ISO format (default `true`).
  - `is24Hour: boolean`: Whether to use 24-hour format (default `true`).
  - `dateSeparator: string`: The date separator (default `-`).
  - `timeSeparator: string`: The time separator (default `:`).

### convertToUTC
Converts a date-time from a specified time zone to UTC.

```javascript
// Using ISO string
const utc1 = TimeZone.convertToUTC('2024-03-15T05:00:00', 'America/New_York', { returnISO: true });
console.log(utc1);
/* OUTPUT:
"2024-03-15T10:00:00.000Z"
*/

// Using Date object with custom formatting
const localDate = new Date('2024-03-15T05:00:00');
const utc2 = TimeZone.convertToUTC(localDate, 'America/New_York', {
  returnISO: false,
  is24Hour: false,
  dateSeparator: '/',
  timeSeparator: ':'
});
console.log(utc2);
/* OUTPUT:
"2024/03/15 10:00:00 AM"
*/
```

Parameters:
- `dateTime: Date | string`: The date-time to convert.
- `sourceTimeZone: string`: The source time zone.
- `options: ConvertOptions (optional)`: Object containing optional formatting options:
  - `returnISO: boolean`: Whether to return ISO format (default `true`).
  - `is24Hour: boolean`: Whether to use 24-hour format (default `true`).
  - `dateSeparator: string`: The date separator (default `-`).
  - `timeSeparator: string`: The time separator (default `:`).

### convertBetweenTimeZones
Convert a datetime from one timezone to another.

```javascript
// Using ISO format
const converted1 = TimeZone.convertBetweenTimeZones(
  '2024-03-15T10:00:00Z',
  'America/New_York',
  'Asia/Tokyo',
  { returnISO: true }
);
console.log(converted1);
/* OUTPUT:
"2024-03-16T00:00:00.000+09:00"
*/

// Using custom formatting
const converted2 = TimeZone.convertBetweenTimeZones(
  '2024-03-15T10:00:00Z',
  'America/New_York',
  'Asia/Tokyo',
  {
    returnISO: false,
    is24Hour: false,
    dateSeparator: '/',
    timeSeparator: ':'
  }
);
console.log(converted2);
/* OUTPUT:
"2024/03/16 12:00:00 AM"
*/
```

Parameters:
- `date: string`: The date-time string to convert.
- `fromTimeZone: string`: The source timezone.
- `toTimeZone: string`: The target timezone.
- `options: ConvertOptions (optional)`: Object containing optional formatting options:
  - `returnISO: boolean`: Whether to return ISO format (default `true`).
  - `is24Hour: boolean`: Whether to use 24-hour format (default `true`).
  - `dateSeparator: string`: The date separator (default `-`).
  - `timeSeparator: string`: The time separator (default `:`).

### getCurrentTimeInTimeZone
Returns the current date and time in the specified timezone.

```javascript
// Get current time in ISO format
const currentTime1 = TimeZone.getCurrentTimeInTimeZone('America/New_York', { returnISO: true });
console.log(currentTime1);
/* OUTPUT:
"2024-03-15T05:00:00.000-05:00"
*/

// Get current time with custom formatting
const currentTime2 = TimeZone.getCurrentTimeInTimeZone('America/New_York', {
  returnISO: false,
  is24Hour: false,
  dateSeparator: '/',
  timeSeparator: ':'
});
console.log(currentTime2);
/* OUTPUT:
"2024/03/15 05:00:00 AM"
*/
```

Parameters:
- `targetTimeZone: string`: The target timezone.
- `options: ConvertOptions (optional)`: Object containing optional formatting options:
  - `returnISO: boolean`: Whether to return ISO format (default `true`).
  - `is24Hour: boolean`: Whether to use 24-hour format (default `true`).
  - `dateSeparator: string`: The date separator (default `-`).
  - `timeSeparator: string`: The time separator (default `:`).

### getTimeDifferenceBetweenTimeZones
Calculates the time difference between two time zones for a specific date.

```javascript
const difference = TimeZone.getTimeDifferenceBetweenTimeZones(
  '2024-03-15T10:00:00Z',
  'America/New_York',
  'Asia/Tokyo'
);
console.log(difference);
/* OUTPUT:
"+14 hours 0 minutes"
*/
```

Parameters:
- `date: string`: The date string to use for calculation.
- `fromTimeZone: string`: The source time zone.
- `toTimeZone: string`: The target time zone.

### convertUTCToLocal
Converts UTC date-time to Local date-time and returns local ISO string.

```javascript
const localTime = TimeZone.convertUTCToLocal('2024-03-15T10:00:00Z');
console.log(localTime);
/* OUTPUT:
"2024-03-15T05:00:00.000-05:00"  (if in EST)
*/
```

Parameters:
- `dateTimeString: string`: The UTC date-time string to convert.

### formatDateTime
Format an ISO date-time string using a custom format pattern.

```javascript
// Format with default timezone (UTC)
const formatted1 = TimeZone.formatDateTime(
  '2024-03-15T10:00:00Z',
  'yyyy-MM-dd HH:mm:ss'  // See format tokens reference below
);
console.log(formatted1);
/* OUTPUT:
"2024-03-15 10:00:00"
*/

// Format with specific timezone and custom pattern
const formatted2 = TimeZone.formatDateTime(
  '2024-03-15T10:00:00Z',
  'MMMM dd, yyyy hh:mm a',  // See format tokens reference below
  'America/New_York'
);
console.log(formatted2);
/* OUTPUT:
"March 15, 2024 05:00 AM"
*/
```

Parameters:
- `isoDateTimeString: string`: The ISO date-time string to format.
- `format: string`: The format pattern (using [Luxon's format tokens](https://moment.github.io/luxon/#/formatting?id=table-of-tokens)).
- `timezone: string`: Optional timezone to convert to before formatting (default: UTC).

Format Tokens Reference:
| Token | Example | Description |
|-------|---------|-------------|
| yyyy  | 2024    | Full year   |
| MM    | 03      | Month number (01-12) |
| dd    | 15      | Day of month (01-31) |
| HH    | 14      | 24-hour hour (00-23) |
| hh    | 02      | 12-hour hour (01-12) |
| mm    | 30      | Minute (00-59) |
| ss    | 45      | Second (00-59) |
| a     | AM/PM   | Meridiem |
| MMMM  | March   | Full month name |
| MMM   | Mar     | Short month name |

For a complete list of format tokens, visit the [Luxon formatting documentation](https://moment.github.io/luxon/#/formatting?id=table-of-tokens).

### getLocalTimeZone
Get the user's local timezone.

```javascript
const localTZ = TimeZone.getLocalTimeZone();
console.log(localTZ);
/* OUTPUT:
"America/New_York"  (example output)
*/
```

## License
This project is licensed under the MIT License.

## Contributing
We welcome contributions to this package! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.


