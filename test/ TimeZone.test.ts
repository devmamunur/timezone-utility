import { TimeZone } from '../src/index'; // Adjust the import path as necessary

describe('TimeZone Class', () => {
  describe('isISODateTime', () => {
    test('valid ISO date-time', () => {
      expect(TimeZone.isISODateTime('2023-10-10T10:00:00')).toBe(true);
    });

    test('invalid ISO date-time', () => {
      expect(TimeZone.isISODateTime('invalid-date')).toBe(false);
    });
  });

  describe('isValidTimeZone', () => {
    test('valid time zone', () => {
      expect(TimeZone.isValidTimeZone('UTC')).toBe(true);
    });

    test('invalid time zone', () => {
      expect(TimeZone.isValidTimeZone('Invalid/Zone')).toBe(false);
    });
  });

  describe('convertDateTime', () => {
    test('convert between valid time zones', () => {
      const dateTime = '2023-10-10T10:00:00';
      const converted = TimeZone.convertDateTime(dateTime, 'UTC', 'America/New_York', true);
      expect(typeof converted === 'string' && converted.includes('T')).toBe(true);
    });

    test('convert with Date object input', () => {
      const dateTime = new Date('2023-10-10T10:00:00Z');
      const converted = TimeZone.convertDateTime(dateTime, 'UTC', 'America/New_York', true);
      expect(typeof converted === 'string' && converted.includes('T')).toBe(true);
    });

    test('handle invalid date-time format', () => {
      const result = TimeZone.convertDateTime('invalid-date', 'UTC', 'America/New_York', true);
      expect(result).toBeInstanceOf(Error);
    });

    test('handle invalid time zone', () => {
      const result = TimeZone.convertDateTime('2023-10-10T10:00:00', 'UTC', 'Invalid/Zone', true);
      expect(result).toBeInstanceOf(Error);
    });
  });

  describe('list and related methods', () => {
    test('list all time zones', () => {
      const timeZones = TimeZone.list();
      expect(timeZones.length).toBeGreaterThan(0);
      expect(timeZones[0]).toHaveProperty('label');
      expect(timeZones[0]).toHaveProperty('value');
    });

    test('list time zone values only', () => {
      const values = TimeZone.listWithOnlyValue();
      expect(values.length).toBeGreaterThan(0);
      expect(typeof values[0]).toBe('string');
    });

    test('list time zone labels only', () => {
      const labels = TimeZone.listWithOnlyLabel();
      expect(labels.length).toBeGreaterThan(0);
      expect(typeof labels[0]).toBe('string');
    });

    test('list by region', () => {
      const timeZones = TimeZone.listByRegion('America');
      expect(timeZones.length).toBeGreaterThan(0);
      expect(timeZones[0]).toHaveProperty('label');
    });

    test('list by country', () => {
      const timeZones = TimeZone.listByCountry('United States');
      expect(timeZones.length).toBeGreaterThan(0);
      expect(timeZones[0]).toHaveProperty('country');
    });
  });

  describe('getDetailsUsingTimeZoneValue', () => {
    test('get details for valid time zone', () => {
      const details = TimeZone.getDetailsUsingTimeZoneValue('UTC');
      expect(details).not.toBeNull();
      expect(details).toHaveProperty('value', 'UTC');
    });

    test('get details for invalid time zone', () => {
      const details = TimeZone.getDetailsUsingTimeZoneValue('Invalid/Zone' as any);
      expect(details).toBeNull();
    });
  });

  describe('getRegions', () => {
    test('get all regions', () => {
      const regions = TimeZone.getRegions();
      expect(regions.length).toBeGreaterThan(0);
      expect(Array.isArray(regions)).toBe(true);
    });
  });

  describe('getCurrentTimeInTimeZone', () => {
    test('get current time in valid time zone with ISO format', () => {
      const currentTime = TimeZone.getCurrentTimeInTimeZone('UTC', { returnISO: true });
      expect(typeof currentTime === 'string' && currentTime.includes('T')).toBe(true);
    });

    test('get current time in valid time zone with custom format', () => {
      const currentTime = TimeZone.getCurrentTimeInTimeZone('UTC', { 
        returnISO: false,
        is24Hour: true,
        dateSeparator: '/',
        timeSeparator: '-'
      });
      expect(typeof currentTime === 'string' && currentTime.includes('/')).toBe(true);
    });

    test('handle invalid time zone', () => {
      const result = TimeZone.getCurrentTimeInTimeZone('Invalid/Zone');
      expect(result).toBe('Invalid timezone provided.');
    });
  });

  describe('convertUTCToTimeZone', () => {
    test('convert valid UTC date to time zone with ISO format', () => {
      const utcDate = '2023-10-10T10:00:00Z';
      const converted = TimeZone.convertUTCToTimeZone(utcDate, 'America/New_York', { returnISO: true });
      expect(typeof converted === 'string' && converted.includes('T')).toBe(true);
    });

    test('convert valid UTC date to time zone with custom format', () => {
      const utcDate = '2023-10-10T10:00:00Z';
      const converted = TimeZone.convertUTCToTimeZone(utcDate, 'America/New_York', {
        returnISO: false,
        is24Hour: false,
        dateSeparator: '/',
        timeSeparator: '-'
      });
      expect(typeof converted === 'string' && converted.includes('/')).toBe(true);
    });

    test('return ISO format when returnISO is true', () => {
      const utcDate = '2023-10-10T10:00:00Z';
      const converted = TimeZone.convertUTCToTimeZone(utcDate, 'America/New_York', { returnISO: true });
      expect(typeof converted).toBe('string');
      // ISO format should contain 'T' and follow YYYY-MM-DDTHH:mm:ss pattern
      expect(converted).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });

    test('return non-ISO format when returnISO is false', () => {
      const utcDate = '2023-10-10T10:00:00Z';
      const converted = TimeZone.convertUTCToTimeZone(utcDate, 'America/New_York', { returnISO: false });
      expect(typeof converted).toBe('string');
      // Non-ISO format should not contain 'T' and should be in readable format
      expect(converted).not.toContain('T');
    });

    test('return ISO format by default when no options provided', () => {
      const utcDate = '2023-10-10T10:00:00Z';
      const converted = TimeZone.convertUTCToTimeZone(utcDate, 'America/New_York');
      expect(typeof converted).toBe('string');
      // Should return ISO format by default
      expect(converted).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });

    test('handle invalid UTC date format', () => {
      const result = TimeZone.convertUTCToTimeZone('invalid-date', 'America/New_York');
      expect(result).toBe('Invalid date format.');
    });

    test('handle invalid time zone', () => {
      const result = TimeZone.convertUTCToTimeZone('2023-10-10T10:00:00Z', 'Invalid/Zone');
      expect(result).toBe('Invalid timezone provided.');
    });
  });

  describe('convertToUTC', () => {
    test('convert valid date-time to UTC with ISO format', () => {
      const dateTime = '2023-10-10T10:00:00';
      const converted = TimeZone.convertToUTC(dateTime, 'America/New_York', { returnISO: true });
      expect(typeof converted === 'string' && converted.includes('T')).toBe(true);
    });

    test('convert valid date-time to UTC with custom format', () => {
      const dateTime = '2023-10-10T10:00:00';
      const converted = TimeZone.convertToUTC(dateTime, 'America/New_York', {
        returnISO: false,
        is24Hour: false,
        dateSeparator: '/',
        timeSeparator: '-'
      });
      expect(typeof converted === 'string' && converted.includes('/')).toBe(true);
    });

    test('return ISO format when returnISO is true', () => {
      const dateTime = '2023-10-10T10:00:00';
      const converted = TimeZone.convertToUTC(dateTime, 'America/New_York', { returnISO: true });
      expect(typeof converted).toBe('string');
      // ISO format should contain 'T' and follow YYYY-MM-DDTHH:mm:ss pattern
      expect(converted).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });

    test('return non-ISO format when returnISO is false', () => {
      const dateTime = '2023-10-10T10:00:00';
      const converted = TimeZone.convertToUTC(dateTime, 'America/New_York', { returnISO: false });
      expect(typeof converted).toBe('string');
      // Non-ISO format should not contain 'T' and should be in readable format
      expect(converted).not.toContain('T');
    });

    test('return ISO format by default when no options provided', () => {
      const dateTime = '2023-10-10T10:00:00';
      const converted = TimeZone.convertToUTC(dateTime, 'America/New_York');
      expect(typeof converted).toBe('string');
      // Should return ISO format by default
      expect(converted).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });

    test('handle invalid date-time format', () => {
      const result = TimeZone.convertToUTC('invalid-date', 'America/New_York');
      expect(result).toBe('Invalid date format.');
    });

    test('handle invalid time zone', () => {
      const result = TimeZone.convertToUTC('2023-10-10T10:00:00', 'Invalid/Zone');
      expect(result).toBe('Invalid timezone provided.');
    });
  });

  describe('convertBetweenTimeZones', () => {
    test('convert between valid time zones with ISO format', () => {
      const dateTime = '2023-10-10T10:00:00';
      const converted = TimeZone.convertBetweenTimeZones(dateTime, 'UTC', 'America/New_York', { returnISO: true });
      expect(typeof converted === 'string' && converted.includes('T')).toBe(true);
    });

    test('convert between valid time zones with custom format', () => {
      const dateTime = '2023-10-10T10:00:00';
      const converted = TimeZone.convertBetweenTimeZones(dateTime, 'UTC', 'America/New_York', {
        returnISO: false,
        is24Hour: false,
        dateSeparator: '/',
        timeSeparator: '-'
      });
      expect(typeof converted === 'string' && converted.includes('/')).toBe(true);
    });

    test('handle invalid date format', () => {
      const result = TimeZone.convertBetweenTimeZones('invalid-date', 'UTC', 'America/New_York');
      expect(result).toBe('Invalid date format.');
    });

    test('handle invalid time zones', () => {
      const result = TimeZone.convertBetweenTimeZones('2023-10-10T10:00:00', 'Invalid/Zone', 'America/New_York');
      expect(result).toBe('Invalid timezone provided.');
    });
  });

  describe('getTimeDifferenceBetweenTimeZones', () => {
    test('get time difference between valid time zones', () => {
      const date = '2023-10-10T10:00:00';
      const difference = TimeZone.getTimeDifferenceBetweenTimeZones(date, 'UTC', 'America/New_York');
      expect(typeof difference === 'string' && /[\+\-]\d+ hours \d+ minutes/.test(difference as string)).toBe(true);
    });

    test('handle invalid date format', () => {
      const result = TimeZone.getTimeDifferenceBetweenTimeZones('invalid-date', 'UTC', 'America/New_York');
      expect(result).toBe('Invalid date format.');
    });

    test('handle invalid time zones', () => {
      const result = TimeZone.getTimeDifferenceBetweenTimeZones('2023-10-10T10:00:00', 'Invalid/Zone', 'America/New_York');
      expect(result).toBe('Invalid timezone provided.');
    });
  });

  describe('convertUTCToLocal', () => {
    test('convert valid UTC date-time to local', () => {
      const utcDateTime = '2023-10-10T10:00:00Z';
      const localDateTime = TimeZone.convertUTCToLocal(utcDateTime);
      expect(typeof localDateTime === 'string' && localDateTime.includes('T')).toBe(true);
    });

    test('handle invalid UTC date-time', () => {
      const result = TimeZone.convertUTCToLocal('invalid-date');
      expect(result).toBeNull();
    });
  });

  describe('formatDateTime', () => {
    test('format valid date-time with custom format', () => {
      const isoDateTime = '2023-10-10T10:00:00Z';
      const formatted = TimeZone.formatDateTime(isoDateTime, 'yyyy-MM-dd HH:mm:ss');
      expect(typeof formatted === 'string' && formatted.includes(':')).toBe(true);
    });

    test('format with specific timezone', () => {
      const isoDateTime = '2023-10-10T10:00:00Z';
      const formatted = TimeZone.formatDateTime(isoDateTime, 'yyyy-MM-dd HH:mm:ss', 'America/New_York');
      expect(typeof formatted === 'string' && formatted.includes(':')).toBe(true);
    });

    test('handle invalid date-time', () => {
      const result = TimeZone.formatDateTime('invalid-date', 'yyyy-MM-dd');
      expect(result).toBe('Invalid ISO date-time string.');
    });

    test('handle invalid timezone', () => {
      const result = TimeZone.formatDateTime('2023-10-10T10:00:00Z', 'yyyy-MM-dd', 'Invalid/Zone');
      expect(result).toBe('Invalid timezone provided.');
    });
  });

  describe('getLocalTimeZone', () => {
    test('get local timezone', () => {
      const localTimeZone = TimeZone.getLocalTimeZone();
      expect(typeof localTimeZone).toBe('string');
      expect(localTimeZone.length).toBeGreaterThan(0);
    });
  });
});