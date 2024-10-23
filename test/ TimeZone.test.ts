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
      expect(converted).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
    });

    test('handle invalid date-time format', () => {
      const result = TimeZone.convertDateTime('invalid-date', 'UTC', 'America/New_York');
      expect(result).toBeInstanceOf(Error);
    });

    test('handle invalid time zone', () => {
      const result = TimeZone.convertDateTime('2023-10-10T10:00:00', 'UTC', 'Invalid/Zone');
      expect(result).toBeInstanceOf(Error);
    });
  });

  describe('list', () => {
    test('list all time zones', () => {
      const timeZones = TimeZone.list();
      expect(timeZones.length).toBeGreaterThan(0);
    });
  });

  describe('getCurrentTimeInTimeZone', () => {
    test('get current time in valid time zone', () => {
      const currentTime = TimeZone.getCurrentTimeInTimeZone('UTC');
      expect(currentTime).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
    });

    test('handle invalid time zone', () => {
      const result = TimeZone.getCurrentTimeInTimeZone('Invalid/Zone');
      expect(result).toBe('Invalid timezone provided.');
    });
  });

  describe('convertUTCToTimeZone', () => {
    test('convert valid UTC date to time zone', () => {
      const utcDate = '2023-10-10T10:00:00';
      const converted = TimeZone.convertUTCToTimeZone(utcDate, 'America/New_York');
      expect(converted).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
    });

    test('handle invalid UTC date format', () => {
      const result = TimeZone.convertUTCToTimeZone('invalid-date', 'America/New_York');
      expect(result).toBe('Invalid date format.');
    });

    test('handle invalid time zone', () => {
      const result = TimeZone.convertUTCToTimeZone('2023-10-10T10:00:00', 'Invalid/Zone');
      expect(result).toBe('Invalid timezone provided.');
    });
  });

  describe('convertToUTC', () => {
    test('convert valid date-time to UTC', () => {
      const dateTime = '2023-10-10T10:00:00';
      const converted = TimeZone.convertToUTC(dateTime, 'America/New_York');
      expect(converted).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
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

  describe('getTimeDifferenceBetweenTimeZones', () => {
    test('get time difference between valid time zones', () => {
      const date = '2023-10-10T10:00:00';
      const difference = TimeZone.getTimeDifferenceBetweenTimeZones(date, 'UTC', 'America/New_York');
      expect(difference).toMatch(/[\+\-]\d+ hours \d+ minutes/);
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

  describe('convertToISO', () => {
    test('convert valid date-time string to ISO', () => {
      const dateTimeString = "10th October 2023, 10:00 AM";
      const isoString = TimeZone.convertToISO(dateTimeString);
      expect(isoString).toBe('2023-10-10T10:00:00');
    });

    test('handle invalid date-time string', () => {
      const result = TimeZone.convertToISO('invalid-date');
      expect(result).toBeNull();
    });
  });
});