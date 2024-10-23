# Timezone Utility

A versatile timezone management package designed for CommonJS, ES Module (ESM), JavaScript, and TypeScript projects. It offers a range of features, including timezone listing, retrieving labels and values, region-based filtering, and converting between UTC and other timezones.


## Table of Contents

- [Installation](#installation)
- [Importing](#importing)
- [Methods Overview](#methods-overview)
- [Methods](#methods)
  - [list](#list)
  - [listWithoutLabel](#listWithoutLabel)
  - [listWithoutValue](#listWithoutValue)
  - [listByRegion](#listByRegion)
  - [getLabelFromValue](#getLabelFromValue)
  - [getValueFromLabel](#getValueFromLabel)
  - [getRegions](#getRegions)
  - [convertUTCToTimeZone](#convertUTCToTimeZone)
  - [convertToUTC](#convertToUTC)
  - [convertBetweenTimeZones](#convertBetweenTimeZones)
  - [getCurrentTimeInTimeZone](#getCurrentTimeInTimeZone)
  - [getTimeDifferenceBetweenTimeZones](#getTimeDifferenceBetweenTimeZones)
  - [convertToISO](#convertToISO)
- [ConvertOptions](#convertoptions)
- [Conclusion](#conclusion)

## Installation
Install the package using npm:

```bash
npm install timezone-utility
npm install luxon
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
| `listWithoutLabel` | Returns a list of all time zone values without labels. |
| `listWithoutValue` | Returns a list of all time zone labels without values. |
| `listByRegion` | Lists time zones for a specific region. |
| `getLabelFromValue` | Gets the label for a given time zone value. |
| `getValueFromLabel` | Gets the value for a given time zone label. |
| `getRegions` | Returns a list of all available regions. |
| `convertUTCToTimeZone` | Converts a UTC date to a specified time zone. |
| `convertToUTC` | Converts a date-time from a specified time zone to UTC. |
| `convertBetweenTimeZones` | Converts a date-time between two specified time zones. |
| `getCurrentTimeInTimeZone` | Gets the current time in a specified time zone. |
| `getTimeDifferenceBetweenTimeZones` | Calculates the time difference between two time zones. |
| `convertToISO` | Converts a formatted date-time string to ISO format. |

## Methods


### list
Returns a list of all available time zones.

```javascript
const timeZones = TimeZone.list();
console.log(timeZones);
```

Output Example:

```javascript
[
  { "label": "(UTC+00:00) Africa/Abidjan", "value": "Africa/Abidjan" },
  { "label": "(UTC-05:00) America/New_York", "value": "America/New_York" },
  ...
]
```

### listWithoutLabel
Returns a list of all time zone values without labels.

```javascript
const timeZoneValues = TimeZone.listWithoutLabel();
console.log(timeZoneValues);
```

Output Example:

```javascript
[
  "Africa/Abidjan",
  "America/New_York",
  ...
]
```

### listWithoutValue
Returns a list of all time zone labels without values.

```javascript
const timeZoneLabels = TimeZone.listWithoutValue();
console.log(timeZoneLabels);
```

Output Example:

```javascript
[
  "(UTC+00:00) Africa/Abidjan",
  "(UTC-05:00) America/New_York",
  ...
]
```

### listByRegion
Lists time zones for a specific region.

```javascript
const timeZonesInRegion = TimeZone.listByRegion('America');
console.log(timeZonesInRegion);
```

Output Example:

```javascript
[
  { "label": "(UTC-05:00) America/New_York", "value": "America/New_York" },
  { "label": "(UTC-06:00) America/Chicago", "value": "America/Chicago" },
  ...
]
```

Parameters:
- `region: string`: The region to filter time zones.

### getLabelFromValue
Gets the label for a given time zone value.

```javascript
const label = TimeZone.getLabelFromValue('America/New_York');
console.log(label);
```

Output Example:

```javascript
"(UTC-05:00) America/New_York"
```

Parameters:
- `value: TimeZoneNames`: The time zone value.

### getValueFromLabel
Gets the value for a given time zone label.

```javascript
const value = TimeZone.getValueFromLabel('(UTC-05:00) America/New_York');
console.log(value);
```

Output Example:

```javascript
"America/New_York"
```

Parameters:
- `label: string`: The time zone label.

### getRegions
Returns a list of all available regions.

```javascript
const regions = TimeZone.getRegions();
console.log(regions);
```

Output Example:

```javascript
[
  "Africa",
  "America",
  "Asia",
  "Atlantic",
  "Australia",
  "Europe",
  "Indian",
  "Pacific"
]
```

### convertUTCToTimeZone
Converts a UTC date to a specified time zone.

```javascript
const converted = TimeZone.convertUTCToTimeZone('2023-10-10T10:00:00', 'America/New_York', { is24Hour: true });
console.log(converted);
```

Output Example:

```javascript
"2023-10-10 06:00:00"
```

Parameters:
- `utcDate: Date | string`: The UTC date.
- `targetTimeZone: TimeZoneNames`: The target time zone.
- `options: ConvertOptions (optional)`: Object containing optional formatting options:
  - `is24Hour: boolean`: Whether to use 24-hour format (default `true`).
  - `dateSeparator: string`: The date separator (default `-`).
  - `timeSeparator: string`: The time separator (default `:`).

### convertToUTC
Converts a date-time from a specified time zone to UTC.

```javascript
const converted = TimeZone.convertToUTC('2023-10-10T10:00:00', 'America/New_York', { is24Hour: false });
console.log(converted);
```

Output Example:

```javascript
"2023-10-10T14:00:00.000Z"
```

Parameters:
- `dateTime: Date | string`: The date-time to convert.
- `sourceTimeZone: TimeZoneNames`: The source time zone.
- `options: ConvertOptions (optional)`: Object containing optional formatting options:
  - `is24Hour: boolean`: Whether to use 24-hour format (default `true`).
  - `dateSeparator: string`: The date separator (default `-`).
  - `timeSeparator: string`: The time separator (default `:`).

### convertBetweenTimeZones
Convert a datetime from one timezone to another and format it in either 12-hour or 24-hour format. You can also specify a custom date separator. By default, the function uses a 24-hour format (`is24Hour = true`) and the date separator is `-`.

```javascript
const originalDate = "2024-10-15T14:00:00Z";
const convertedTime = TimeZone.convertBetweenTimeZones(originalDate, 'America/New_York', 'Asia/Dhaka', {is24Hour: false, dateSeparator: '-', timeSeparator: ':'});
console.log(convertedTime); 
```

Output Example:

```javascript
"10/15/2024, 12:00:00"
```

Parameters: 
- `date: string`: The date-time string to convert.
- `fromTimeZone: TimeZoneNames`: The source timezone.
- `toTimeZone: TimeZoneNames`: The target timezone.
- `options: ConvertOptions (optional)`: Object containing optional formatting options:
  - `is24Hour: boolean`: Whether to use 24-hour format (default `true`).
  - `dateSeparator: string`: The date separator (default `-`).
  - `timeSeparator: string`: The time separator (default `:`).

### getCurrentTimeInTimeZone
Returns the current date and time in the specified timezone. The method allows formatting options such as 24-hour or 12-hour format and custom date and time separators.

```javascript
const currentTimeInNY = TimeZone.getCurrentTimeInTimeZone('America/New_York', { is24Hour: false, dateSeparator: '-', timeSeparator: ':' });
console.log(currentTimeInNY); 
```

Output Example:

```javascript
"10-15-2024 08:34:56 AM"
```

Parameters:
- `targetTimeZone: TimeZoneNames`: The target timezone in which you want the current time.
- `options: ConvertOptions (optional)`: Object containing optional formatting options:
  - `is24Hour: boolean`: Whether to use 24-hour format (default `true`).
  - `dateSeparator: string`: The date separator (default `-`).
  - `timeSeparator: string`: The time separator (default `:`).

### getTimeDifferenceBetweenTimeZones
Calculates the time difference between two time zones for a specific date.

```javascript
const difference = TimeZone.getTimeDifferenceBetweenTimeZones('2023-10-10T10:00:00', 'UTC', 'America/New_York');
console.log(difference);
```

Output Example:

```javascript
"+4 hours 0 minutes"
```

Parameters:
- `date: string`: The date string to use for calculation.
- `fromTimeZone: TimeZoneNames`: The source time zone.
- `toTimeZone: TimeZoneNames`: The target time zone.

### convertToISO
Converts a formatted date-time string to ISO format.

```javascript
const isoString = TimeZone.convertToISO("10th October 2023, 10:00 AM");
console.log(isoString);
```

Output Example:

```javascript
"2023-10-10T10:00:00"
```

Parameters:
- `dateTimeString: string`: The date-time string to convert.



## License
This project is licensed under the MIT License.

## Contributing
We welcome contributions to this package! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.


### Key Points:
- The `README.md` provides clear instructions for installation, usage, and examples for each method.
- Each method is documented with a brief description, input/output, and examples.
- The `convertUTCToTimeZone` method now includes an option for the 12-hour/24-hour format, as requested.
