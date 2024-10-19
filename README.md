# Timezone Utility

A versatile timezone management package with zero dependencies, designed for CommonJS, ES Module (ESM), JavaScript, and TypeScript projects. It offers a range of features, including timezone listing, retrieving labels and values, region-based filtering, and converting between UTC and other timezones.


## Table of Contents

- [⚙️ Installation](#installation)
- [📖 Usage](#usage)
  - [📦 Importing the Package](#importing-the-package)
  - [🌍 Get All Timezones (Label-Value Pair)](#1-get-all-timezones-label-value-pair)
  - [🕑 et All Timezone Values (Without Label)](#2-get-all-timezone-values-without-label)
  - [🏷️ Get All Timezone Labels (Without Value)](#3-get-all-timezone-labels-without-value)
  - [🌐 Get Timezones by Region](#4-get-timezones-by-region)
  - [🔖 Get Timezone Label from Value](#5-get-timezone-label-from-value)
  - [🎯 Get Timezone Value from Label](#6-get-timezone-value-from-label)
  - [🌏 Get List of Regions](#7-get-list-of-regions)
  - [⏰ Convert UTC Time to Specific Timezone](#8-convert-utc-time-to-specific-timezone)
  - [🔄 Convert Datetime From One Timezone to Another](#9-convert-datetime-from-one-timezone-to-another)
  - [🌐🕓 Convert any Date-Time String to UTC Format](#10-convert-any-datetime-string-to-utc-format)
  - [🕰️ Get the Current Date-Time in a Specific Timezone](#11-get-the-current-datetime-in-a-specific-timezone)
  - [➕➖ Add or Subtract Time (hours, minutes, or days) From a Date](#12-add-or-subtract-time-hours-minutes-or-days-from-a-date)
  - [🕒➡️🕕 Get the Time Difference Between Two Timezones](#13-get-the-time-difference-between-two-timezones)
- [📋 Methods Overview](#methods-overview)
- [📜 License](#license)
- [🤝 Contributing](#contributing)

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

### 1. Get All Timezones (Label-Value Pair)

Retrieve a list of all available timezones with both label and value.

```javascript
const allTimezones = TimeZone.list();
console.log(allTimezones);
```

Output Example:

```javascript
[
  { "label": "(UTC+00:00) Africa/Abidjan", "value": "Africa/Abidjan" },
  { "label": "(UTC-05:00) America/New_York", "value": "America/New_York" },
  ...
]
```

#### 2. Get All Timezone Values (Without Label)
Get a list of timezone values (useful for APIs or forms where only the value is needed).

```javascript
const timezoneValues = TimeZone.listWithoutLabel();
console.log(timezoneValues);
```

Output Example:

```javascript
[
  "Africa/Abidjan",
  "America/New_York",
  ...
]
```

#### 3. Get All Timezone Labels (Without Value)
Retrieve a list of timezone labels.

```javascript
const timezoneLabels = TimeZone.listWithoutValue();
console.log(timezoneLabels);
```

Output Example:

```javascript
[
  "(UTC+00:00) Africa/Abidjan",
  "(UTC-05:00) America/New_York",
  ...
]
```

#### 4. Get Timezones by Region
Retrieve timezones for a specific region (e.g., America, Europe, Asia).

```javascript
const americanTimezones = TimeZone.listByRegion("America");
console.log(americanTimezones);
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
- `region: string`: The region to filter by (e.g., "America", "Europe").

#### 5. Get Timezone Label from Value
Retrieve the label (human-readable name) for a given timezone value.

```javascript
const labelFromValue = TimeZone.getLabelFromValue("America/New_York");
console.log(labelFromValue);
```

Output Example:

```javascript
"(UTC-05:00) America/New_York"
```

Parameters: 
- `value: string`: The timezone value to convert to a label.

#### 6. Get Timezone Value from Label
Retrieve the timezone value from a label.

```javascript
const valueFromLabel = TimeZone.getValueFromLabel("(UTC-05:00) America/New_York");
console.log(valueFromLabel);
```

Output Example:

```javascript
"America/New_York"
```

Parameters: 
- `label: string`: The timezone label to convert to a value.
#### 7. Get List of Regions
Retrieve a list of all available regions.

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

#### 8. Convert UTC Time to Specific Timezone
Convert a UTC/GMT time to a specific timezone and format it in either 12-hour or 24-hour format. You can also specify a custom date separator. By default, the function uses a 24-hour format (`is24Hour = true`) and the date separator is `/`.


```javascript
const utcDate = "2024-10-15T14:00:00Z";
const convertedTime = TimeZone.convertUTCToTimeZone(utcDate, 'America/New_York', {is24Hour: false, dateSeparator: '/', timeSeparator: ':'});
console.log(convertedTime);
```

Output Example:

```javascript
"10/15/2024, 10:00:00 AM"
```

Parameters: 
- `dateTimeString: string`: The date-time string to convert.
- `toTimeZone: TimeZoneNames`: The target timezone.
- `options: ConvertOptions (optional)`: Object containing optional formatting options:
  - `is24Hour: boolean`: Whether to use 24-hour format (default `true`).
  - `dateSeparator: string`: The date separator (default `/`).
  - `timeSeparator: string`: The time separator (default `:`).

#### 9. Convert Datetime From One Timezone to Another
Convert a datetime from one timezone to another and format it in either 12-hour or 24-hour format. You can also specify a custom date separator. By default, the function uses a 24-hour format (`is24Hour = true`) and the date separator is `/`.

```javascript
const originalDate = "2024-10-15T14:00:00Z";
const convertedTime = TimeZone.convertBetweenTimeZones(originalDate, 'America/New_York', 'Asia/Dhaka', {is24Hour: false, dateSeparator: '/', timeSeparator: ':'});
console.log(convertedTime); 
```

Output Example:

```javascript
"10/15/2024, 12:00:00"
```

Parameters: 
- `dateTimeString: string`: The date-time string to convert.
- `fromTimeZone: TimeZoneNames`: The source timezone.
- `toTimeZone: TimeZoneNames`: The target timezone.
- `options: ConvertOptions (optional)`: Object containing optional formatting options:
  - `is24Hour: boolean`: Whether to use 24-hour format (default `true`).
  - `dateSeparator: string`: The date separator (default `/`).
  - `timeSeparator: string`: The time separator (default `:`).


#### 10. Convert any Date-Time String to UTC Format.
Converts any date-time string into a UTC format (ISO 8601). This method also validates the input and provides a clear error message if the date is invalid.

```javascript
const utcDate1 = TimeZone.convertToUTC('October 15, 2024 12:34:56');
console.log(utcDate1); 

const utcDate2 = TimeZone.convertToUTC('2024-10-15T12:34:56');
console.log(utcDate2); 
```

Output Example:

```javascript
"2024-10-15T12:34:56.000Z"
"2024-10-15T12:34:56.000Z"
```

Parameters: 
- `dateTimeString: string`: The date-time string to convert to UTC.
- `format: string`: The format of the date-time string (e.g., 'MM-dd-yyyy HH:mm:ss AM/PM', 'yyyy-MM-ddTHH:mm:ss').

#### 11. Get the Current Date-Time in a Specific Timezone
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
  - `dateSeparator: string`: The date separator (default `/`).
  - `timeSeparator: string`: The time separator (default `:`).


#### 12. Add or Subtract Time (hours, minutes, or days) From a Date.
Adds or subtracts time (hours, minutes, or days) to a given date and returns the resulting date in UTC format.

```javascript
const newDate = TimeZone.addTimeToDate('2024-10-15T12:00:00', 3, 'hours');
console.log(newDate); 
```

Output Example:

```javascript
"2024-10-15T15:00:00.000Z"
```

Parameters:
- `date: Date | string`: The base date (as a `Date` object or string) from which to add/subtract time.
- `amount: number`: The amount of time to add (positive) or subtract (negative).
- `unit: 'hours' | 'minutes' | 'days'`: The unit of time to add or subtract.



#### 13. Get the Time Difference Between Two Timezones.
Calculates the time difference between two timezones in hours and minutes for a specific date.

```javascript
const timeDiff = TimeZone.getTimeDifferenceBetweenTimeZones('2024-10-15T12:00:00', 'America/New_York', 'Asia/Tokyo');
console.log(timeDiff); 
```

Output Example:

```javascript
"+13 hours 0 minutes"
```

Parameters:
- `date: string`: The base date-time string to calculate the difference from.
- `fromTimeZone: TimeZoneNames`: The source timezone.
- `toTimeZone: TimeZoneNames`: The target timezone.

## Methods Overview

| Method Name | Description |
|-------------|-------------|
| TimeZone.list() | Get a list of all timezones (label-value pairs). |
| TimeZone.listWithoutLabel() | Get a list of all timezone values. |
| TimeZone.listWithoutValue() | Get a list of all timezone labels. |
| TimeZone.listByRegion(region) | Get timezones by a specific region (e.g., "America", "Europe"). |
| TimeZone.getLabelFromValue(value) | Get the timezone label for a specific value. |
| TimeZone.getValueFromLabel(label) | Get the timezone value for a specific label. |
| TimeZone.getRegions() | Get a list of all regions. |
| TimeZone.convertUTCToTimeZone() | Convert a UTC date/time string to a specific timezone, with support for 12-hour or 24-hour format (default 24-hour) and customizable date and time separators. |
| TimeZone.convertBetweenTimeZones() | Convert a date from one timezone to another with support for 12-hour or 24-hour format (default 24-hour) and customizable date and time separators. |
| TimeZone.convertToUTC() | Convert any date-time string into a UTC format (ISO 8601). |
| TimeZone.getCurrentTimeInTimeZone() | Get the current date and time in a specific timezone, with options for 12-hour or 24-hour format (default 24-hour) and customizable date and time separators. |
| TimeZone.addTimeToDate() | Add or subtract time (hours, minutes, or days) from a given date and return the result in UTC format. |
| TimeZone.getTimeDifferenceBetweenTimeZones() | Get the time difference between two timezones in hours and minutes for a specific date. |


## License
This project is licensed under the MIT License.

## Contributing
We welcome contributions to this package! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.


### Key Points:
- The `README.md` provides clear instructions for installation, usage, and examples for each method.
- Each method is documented with a brief description, input/output, and examples.
- The `convertUTCToTimeZone` method now includes an option for the 12-hour/24-hour format, as requested.
