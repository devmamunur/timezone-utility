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
  - [convertToISO](#convertToISO)
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
| `convertToISO` | Converts a formatted date-time string to ISO format. |

## Methods


### list
Returns a list of all available time zones.

```javascript
const timeZones = TimeZone.list();
console.log(timeZones);
```

### listWithOnlyValue
Returns a list of all time zone values without labels.

```javascript
const timeZoneWithOnlyValue = TimeZone.listWithOnlyValue();
console.log(timeZoneWithOnlyValue);
```


### listWithOnlyLabel
Returns a list of all time zone labels without values.

```javascript
const timeZonelistWithOnlyLabel = TimeZone.listWithOnlyLabel();
console.log(timeZonelistWithOnlyLabel);
```


### listByRegion
Lists time zones for a specific region.

```javascript
const timeZonesListByRegion = TimeZone.listByRegion('America');
console.log(timeZonesListByRegion);
```

Parameters:
- `region: string`: The region to filter time zones.

### listByCountry
Lists time zones for a specific country.

```javascript
const timeZonesListByCountry = TimeZone.listByCountry('America');
console.log(timeZonesListByCountry);
```

Parameters:
- `country: string`: The region to filter time zones.

### getDetailsUsingTimeZoneValue
Gets the details for a given time zone value.

```javascript
const detailsUsingTimeZoneValue = TimeZone.getDetailsUsingTimeZoneValue('America/New_York');
console.log(detailsUsingTimeZoneValue);
```

Parameters:
- `value: string`: The time zone value.

### getRegions
Returns a list of all available regions.

```javascript
const regions = TimeZone.getRegions();
console.log(regions);
```

### convertUTCToTimeZone
Converts a UTC date to a specified time zone.

```javascript
const converted = TimeZone.convertUTCToTimeZone('2023-10-10T10:00:00', 'America/New_York', { is24Hour: true });
console.log(converted);
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


Parameters:
- `dateTimeString: string`: The date-time string to convert.



## License
This project is licensed under the MIT License.

## Contributing
We welcome contributions to this package! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.


