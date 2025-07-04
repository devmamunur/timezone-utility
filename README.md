# Timezone Utility

A versatile timezone management package designed for CommonJS, ES Module (ESM), JavaScript, and TypeScript projects. It offers a range of features, including timezone listing, retrieving labels and values, region-based filtering, and converting between UTC and other timezones.


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Methods Overview](#methods-overview)
- [Methods](#methods)
  - [isISODateTime](#isISODateTime)
  - [isValidTimeZone](#isValidTimeZone)
  - [convertDateTime](#convertDateTime)
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
- [TypeScript Support](#typescript-support)
- [Error Handling](#error-handling)
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
| `isISODateTime` | Validates if a string is a valid ISO date-time format. |
| `isValidTimeZone` | Validates if a given string is a valid time zone. |
| `convertDateTime` | Converts a date-time from one time zone to another. |
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

### isISODateTime
Validates if a string is a valid ISO date-time format.

```javascript
const isValid1 = TimeZone.isISODateTime('2023-10-10T10:00:00');
console.log(isValid1); // true

const isValid2 = TimeZone.isISODateTime('invalid-date');
console.log(isValid2); // false
```

Parameters:
- `dateTime: string`: The date-time string to validate.

Returns:
- `boolean`: True if the string is a valid ISO date-time, false otherwise.

### isValidTimeZone
Validates if a given string is a valid time zone.

```javascript
const isValid1 = TimeZone.isValidTimeZone('UTC');
console.log(isValid1); // true

const isValid2 = TimeZone.isValidTimeZone('Invalid/Zone');
console.log(isValid2); // false
```

Parameters:
- `timeZone: string`: The time zone string to validate.

Returns:
- `boolean`: True if the time zone is valid, false otherwise.

### convertDateTime
Converts a date-time from one time zone to another.

```javascript
// Using string input
const converted1 = TimeZone.convertDateTime(
  '2023-10-10T10:00:00', 
  'UTC', 
  'America/New_York', 
  true
);
console.log(converted1); // "2023-10-10T06:00:00"

// Using Date object input
const dateTime = new Date('2023-10-10T10:00:00Z');
const converted2 = TimeZone.convertDateTime(
  dateTime, 
  'UTC', 
  'America/New_York', 
  true
);
console.log(converted2); // "2023-10-10T06:00:00"
```

Parameters:
- `dateTime: Date | string`: The date-time to convert.
- `sourceTimeZone: string`: The source time zone.
- `targetTimeZone: string`: The target time zone.
- `returnISO: boolean`: Whether to return ISO format (default: true).

Returns:
- `string | Error`: Converted date-time string or Error if conversion fails.

### list
Returns a list of all available time zones.

```javascript
const timeZones = TimeZone.list();
console.log(timeZones);
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

Returns:
- `Array<TimeZoneEntry>`: Array of TimeZoneEntry objects.

### listWithOnlyValue
Returns a list of all time zone values without labels.

```javascript
const timeZoneValues = TimeZone.listWithOnlyValue();
console.log(timeZoneValues);
/* OUTPUT:
["Africa/Abidjan", "Africa/Accra", "America/New_York", "Europe/London", "Asia/Tokyo", ...]
*/
```

Returns:
- `Array<string>`: Array of time zone values.

### listWithOnlyLabel
Returns a list of all time zone labels without values.

```javascript
const timeZoneLabels = TimeZone.listWithOnlyLabel();
console.log(timeZoneLabels);
/* OUTPUT:
["(UTC-05:00) America/New_York", "(UTC+00:00) London", ...]
*/
```

Returns:
- `Array<string>`: Array of time zone labels.

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

Returns:
- `Array<TimeZoneEntry>`: Array of TimeZoneEntry objects for the specified region.

### listByCountry
Lists time zones for a specific country.

```javascript
const timeZonesInUS = TimeZone.listByCountry('United States');
console.log(timeZonesInUS);
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
- `country: string`: The country to filter time zones.

Returns:
- `Array<TimeZoneEntry>`: Array of TimeZoneEntry objects for the specified country.

### getDetailsUsingTimeZoneValue
Gets the details for a given time zone value.

```javascript
const tzDetails = TimeZone.getDetailsUsingTimeZoneValue('America/New_York');
console.log(tzDetails);
/* OUTPUT:
{
  "label": "(UTC-05:00) America/New_York",
  "value": "America/New_York",
  "country": "United States",
  "phoneCode": "+1",
  "utcOffset": "-05:00"
}
*/
```

Parameters:
- `value: string`: The time zone value.

Returns:
- `TimeZoneEntry | null`: The corresponding details or null if not found.

### getRegions
Returns a list of all available regions.

```javascript
const regions = TimeZone.getRegions();
console.log(regions);
/* OUTPUT:
["Africa", "America", "Asia", "Atlantic", "Australia", "Europe", "Indian", "Pacific"]
*/
```

Returns:
- `Array<string>`: Array of region strings.

### convertUTCToTimeZone
Converts a UTC date to a specified time zone.

```javascript
// Using ISO string with default options (ISO format)
const converted1 = TimeZone.convertUTCToTimeZone('2024-03-15T10:00:00Z', 'America/New_York');
console.log(converted1); // "2024-03-15T06:00:00"

// Using Date object with custom formatting
const date = new Date('2024-03-15T10:00:00Z');
const converted2 = TimeZone.convertUTCToTimeZone(date, 'America/New_York', {
  returnISO: false,
  is24Hour: false,
  dateSeparator: '/',
  timeSeparator: ':'
});
console.log(converted2); // "2024/03/15 6:00:00 AM"
```

Parameters:
- `utcDate: Date | string`: The UTC date.
- `targetTimeZone: string`: The target time zone.
- `options: ConvertOptions (optional)`: Object containing optional formatting options:
  - `returnISO: boolean`: Whether to return ISO format (default `true`).
  - `is24Hour: boolean`: Whether to use 24-hour format (default `true`).
  - `dateSeparator: string`: The date separator (default `-`).
  - `timeSeparator: string`: The time separator (default `:`).

Returns:
- `string | null`: ISO formatted date-time string in the target time zone or error message.

### convertToUTC
Converts a date-time from a specified time zone to UTC.

```javascript
// Using ISO string with default options (ISO format)
const utc1 = TimeZone.convertToUTC('2024-03-15T06:00:00', 'America/New_York');
console.log(utc1); // "2024-03-15T10:00:00.000Z"

// Using Date object with custom formatting
const localDate = new Date('2024-03-15T06:00:00');
const utc2 = TimeZone.convertToUTC(localDate, 'America/New_York', {
  returnISO: false,
  is24Hour: false,
  dateSeparator: '/',
  timeSeparator: ':'
});
console.log(utc2); // "2024/03/15 10:00:00 AM"
```

Parameters:
- `date: Date | string`: The date-time to convert.
- `timeZone: string`: The source time zone.
- `options: ConvertOptions (optional)`: Object containing optional formatting options:
  - `returnISO: boolean`: Whether to return ISO format (default `true`).
  - `is24Hour: boolean`: Whether to use 24-hour format (default `true`).
  - `dateSeparator: string`: The date separator (default `-`).
  - `timeSeparator: string`: The time separator (default `:`).

Returns:
- `string | Error`: ISO formatted UTC date-time string or error message.

### convertBetweenTimeZones
Converts a date-time between two specified time zones.

```javascript
// Using ISO format
const converted1 = TimeZone.convertBetweenTimeZones(
  '2024-03-15T10:00:00',
  'America/New_York',
  'Asia/Tokyo',
  { returnISO: true }
);
console.log(converted1); // "2024-03-15T23:00:00"

// Using custom formatting
const converted2 = TimeZone.convertBetweenTimeZones(
  '2024-03-15T10:00:00',
  'America/New_York',
  'Asia/Tokyo',
  {
    returnISO: false,
    is24Hour: false,
    dateSeparator: '/',
    timeSeparator: ':'
  }
);
console.log(converted2); // "2024/03/15 11:00:00 PM"
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

Returns:
- `string | null`: ISO formatted date-time string in the target time zone or error message.

### getCurrentTimeInTimeZone
Gets the current time in a specified time zone.

```javascript
// Get current time in ISO format
const currentTime1 = TimeZone.getCurrentTimeInTimeZone('America/New_York', { returnISO: true });
console.log(currentTime1); // "2024-03-15T06:00:00"

// Get current time with custom formatting
const currentTime2 = TimeZone.getCurrentTimeInTimeZone('America/New_York', {
  returnISO: false,
  is24Hour: false,
  dateSeparator: '/',
  timeSeparator: ':'
});
console.log(currentTime2); // "2024/03/15 6:00:00 AM"
```

Parameters:
- `targetTimeZone: string`: The target timezone.
- `options: ConvertOptions (optional)`: Object containing optional formatting options:
  - `returnISO: boolean`: Whether to return ISO format (default `true`).
  - `is24Hour: boolean`: Whether to use 24-hour format (default `true`).
  - `dateSeparator: string`: The date separator (default `-`).
  - `timeSeparator: string`: The time separator (default `:`).

Returns:
- `string | null`: ISO formatted current date-time string in the target time zone or error message.

### getTimeDifferenceBetweenTimeZones
Calculates the time difference between two time zones for a specific date.

```javascript
const difference = TimeZone.getTimeDifferenceBetweenTimeZones(
  '2024-03-15T10:00:00',
  'America/New_York',
  'Asia/Tokyo'
);
console.log(difference); // "+13 hours 0 minutes"
```

Parameters:
- `date: string`: The date string to use for calculation.
- `fromTimeZone: string`: The source time zone.
- `toTimeZone: string`: The target time zone.

Returns:
- `string | null`: Formatted time difference string or error message.

### convertUTCToLocal
Converts UTC date-time to Local date-time and returns local ISO string.

```javascript
const localTime = TimeZone.convertUTCToLocal('2024-03-15T10:00:00Z');
console.log(localTime); // "2024-03-15T10:00:00.000Z" (returns ISO string)
```

Parameters:
- `dateTimeString: string`: The UTC date-time string to convert.

Returns:
- `string | null`: Local formatted date-time string or null if conversion fails.

### formatDateTime
Format an ISO date-time string using a custom format pattern.

```javascript
// Format with default timezone (UTC)
const formatted1 = TimeZone.formatDateTime(
  '2024-03-15T10:00:00Z',
  'yyyy-MM-dd HH:mm:ss'
);
console.log(formatted1); // "2024-03-15 10:00:00"

// Format with specific timezone
const formatted2 = TimeZone.formatDateTime(
  '2024-03-15T10:00:00Z',
  'yyyy-MM-dd HH:mm:ss',
  'America/New_York'
);
console.log(formatted2); // "2024-03-15 06:00:00"
```

Parameters:
- `isoDateTimeString: string`: The ISO date-time string to format.
- `format: string`: The format pattern using supported tokens (see below).
- `timezone: string`: Optional timezone to convert to before formatting (default: 'UTC').

Returns:
- `string | null`: Formatted date-time string or null/error message if formatting fails.

**Supported Format Tokens:**
| Token | Example | Description |
|-------|---------|-------------|
| yyyy  | 2024    | Full year (4 digits) |
| MM    | 03      | Month number (01-12) |
| dd    | 15      | Day of month (01-31) |
| HH    | 14      | 24-hour hour (00-23) |
| mm    | 30      | Minute (00-59) |
| ss    | 45      | Second (00-59) |

### getLocalTimeZone
Get the user's local timezone.

```javascript
const localTZ = TimeZone.getLocalTimeZone();
console.log(localTZ); // "America/New_York" (example output)
```

Returns:
- `string`: The IANA timezone identifier string for the user's local timezone.

## TypeScript Support

This package includes comprehensive TypeScript support with type definitions. The main types include:

- `TimeZoneNames`: Union type of all supported timezone values
- `TimeZoneEntry`: Interface for timezone objects with label, value, country, phoneCode, and utcOffset
- `ConvertOptions`: Interface for formatting options used in conversion methods

```typescript
import { TimeZone } from "timezone-utility";

// TypeScript will provide intellisense and type checking
const timeZone: TimeZoneNames = 'America/New_York';
const isValid: boolean = TimeZone.isValidTimeZone(timeZone);
```

## Error Handling

Most methods return appropriate error messages or null values when operations fail:

- Invalid timezone names return error messages like "Invalid timezone provided."
- Invalid date formats return error messages like "Invalid date format."
- Failed conversions return null or Error objects
- Validation methods return boolean values

Always check return values for error conditions:

```javascript
const result = TimeZone.convertToUTC('invalid-date', 'America/New_York');
if (result === 'Invalid date format.') {
  // Handle error
  console.error('Date conversion failed');
}
```

## License
This project is licensed under the MIT License.

## Contributing
We welcome contributions to this package! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.


