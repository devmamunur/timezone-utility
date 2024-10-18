export interface TimeZoneEntry {
    label: string;
    value: string;
}

export interface ConvertOptions {
    is24Hour?: boolean;
    dateSeparator?: string;
    timeSeparator?: string;
}

export type TimeZoneNames = TimeZoneEntry["value"];