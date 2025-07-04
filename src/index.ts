/**
 * Timezone Utility
 * 
 * A versatile timezone management package designed for CommonJS, ES Module (ESM), JavaScript, and TypeScript projects. 
 * It offers a range of features, including timezone listing, retrieving labels and values, region-based filtering, and converting between UTC and other timezones.
 * @packageDocumentation
 */

import timezonesData from "./timezones.json";
import regionsData from "./region.json";

interface TimeZoneEntry {
    label: string;
    value: string;
    country: string;
    phoneCode: string;
    utcOffset: string;
}

interface ConvertOptions {
    returnISO?: boolean;
    is24Hour?: boolean;
    dateSeparator?: string;
    timeSeparator?: string;
}

type TimeZoneNames = 
    | "Africa/Abidjan"
    | "Africa/Accra"
    | "Africa/Addis_Ababa"
    | "Africa/Algiers"
    | "Africa/Asmera"
    | "Africa/Bamako"
    | "Africa/Bangui"
    | "Africa/Banjul"
    | "Africa/Bissau"
    | "Africa/Blantyre"
    | "Africa/Brazzaville"
    | "Africa/Bujumbura"
    | "Africa/Cairo"
    | "Africa/Casablanca"
    | "Africa/Ceuta"
    | "Africa/Conakry"
    | "Africa/Dakar"
    | "Africa/Dar_es_Salaam"
    | "Africa/Djibouti"
    | "Africa/Douala"
    | "Africa/El_Aaiun"
    | "Africa/Freetown"
    | "Africa/Gaborone"
    | "Africa/Harare"
    | "Africa/Johannesburg"
    | "Africa/Juba"
    | "Africa/Kampala"
    | "Africa/Khartoum"
    | "Africa/Kigali"
    | "Africa/Kinshasa"
    | "Africa/Lagos"
    | "Africa/Libreville"
    | "Africa/Lome"
    | "Africa/Luanda"
    | "Africa/Lubumbashi"
    | "Africa/Lusaka"
    | "Africa/Malabo"
    | "Africa/Maputo"
    | "Africa/Maseru"
    | "Africa/Mbabane"
    | "Africa/Mogadishu"
    | "Africa/Monrovia"
    | "Africa/Nairobi"
    | "Africa/Ndjamena"
    | "Africa/Niamey"
    | "Africa/Nouakchott"
    | "Africa/Ouagadougou"
    | "Africa/Porto-Novo"
    | "Africa/Sao_Tome"
    | "Africa/Tripoli"
    | "Africa/Tunis"
    | "Africa/Windhoek"
    | "America/Adak"
    | "America/Anchorage"
    | "America/Anguilla"
    | "America/Antigua"
    | "America/Araguaina"
    | "America/Argentina/La_Rioja"
    | "America/Argentina/Rio_Gallegos"
    | "America/Argentina/Salta"
    | "America/Argentina/San_Juan"
    | "America/Argentina/San_Luis"
    | "America/Argentina/Tucuman"
    | "America/Argentina/Ushuaia"
    | "America/Aruba"
    | "America/Asuncion"
    | "America/Bahia"
    | "America/Bahia_Banderas"
    | "America/Barbados"
    | "America/Belem"
    | "America/Belize"
    | "America/Blanc-Sablon"
    | "America/Boa_Vista"
    | "America/Bogota"
    | "America/Boise"
    | "America/Buenos_Aires"
    | "America/Cambridge_Bay"
    | "America/Campo_Grande"
    | "America/Cancun"
    | "America/Caracas"
    | "America/Catamarca"
    | "America/Cayenne"
    | "America/Cayman"
    | "America/Chicago"
    | "America/Chihuahua"
    | "America/Ciudad_Juarez"
    | "America/Coral_Harbour"
    | "America/Cordoba"
    | "America/Costa_Rica"
    | "America/Coyhaique"
    | "America/Creston"
    | "America/Cuiaba"
    | "America/Curacao"
    | "America/Danmarkshavn"
    | "America/Dawson"
    | "America/Dawson_Creek"
    | "America/Denver"
    | "America/Detroit"
    | "America/Dominica"
    | "America/Edmonton"
    | "America/Eirunepe"
    | "America/El_Salvador"
    | "America/Fort_Nelson"
    | "America/Fortaleza"
    | "America/Glace_Bay"
    | "America/Godthab"
    | "America/Goose_Bay"
    | "America/Grand_Turk"
    | "America/Grenada"
    | "America/Guadeloupe"
    | "America/Guatemala"
    | "America/Guayaquil"
    | "America/Guyana"
    | "America/Halifax"
    | "America/Havana"
    | "America/Hermosillo"
    | "America/Indiana/Knox"
    | "America/Indiana/Marengo"
    | "America/Indiana/Petersburg"
    | "America/Indiana/Tell_City"
    | "America/Indiana/Vevay"
    | "America/Indiana/Vincennes"
    | "America/Indiana/Winamac"
    | "America/Indianapolis"
    | "America/Inuvik"
    | "America/Iqaluit"
    | "America/Jamaica"
    | "America/Jujuy"
    | "America/Juneau"
    | "America/Kentucky/Monticello"
    | "America/Kralendijk"
    | "America/La_Paz"
    | "America/Lima"
    | "America/Los_Angeles"
    | "America/Louisville"
    | "America/Lower_Princes"
    | "America/Maceio"
    | "America/Managua"
    | "America/Manaus"
    | "America/Marigot"
    | "America/Martinique"
    | "America/Matamoros"
    | "America/Mazatlan"
    | "America/Mendoza"
    | "America/Menominee"
    | "America/Merida"
    | "America/Metlakatla"
    | "America/Mexico_City"
    | "America/Miquelon"
    | "America/Moncton"
    | "America/Monterrey"
    | "America/Montevideo"
    | "America/Montserrat"
    | "America/Nassau"
    | "America/New_York"
    | "America/Nome"
    | "America/Noronha"
    | "America/North_Dakota/Beulah"
    | "America/North_Dakota/Center"
    | "America/North_Dakota/New_Salem"
    | "America/Ojinaga"
    | "America/Panama"
    | "America/Paramaribo"
    | "America/Phoenix"
    | "America/Port-au-Prince"
    | "America/Port_of_Spain"
    | "America/Porto_Velho"
    | "America/Puerto_Rico"
    | "America/Punta_Arenas"
    | "America/Rankin_Inlet"
    | "America/Recife"
    | "America/Regina"
    | "America/Resolute"
    | "America/Rio_Branco"
    | "America/Santarem"
    | "America/Santiago"
    | "America/Santo_Domingo"
    | "America/Sao_Paulo"
    | "America/Scoresbysund"
    | "America/Sitka"
    | "America/St_Barthelemy"
    | "America/St_Johns"
    | "America/St_Kitts"
    | "America/St_Lucia"
    | "America/St_Thomas"
    | "America/St_Vincent"
    | "America/Swift_Current"
    | "America/Tegucigalpa"
    | "America/Thule"
    | "America/Tijuana"
    | "America/Toronto"
    | "America/Tortola"
    | "America/Vancouver"
    | "America/Whitehorse"
    | "America/Winnipeg"
    | "America/Yakutat"
    | "Antarctica/Casey"
    | "Antarctica/Davis"
    | "Antarctica/DumontDUrville"
    | "Antarctica/Macquarie"
    | "Antarctica/Mawson"
    | "Antarctica/McMurdo"
    | "Antarctica/Palmer"
    | "Antarctica/Rothera"
    | "Antarctica/Syowa"
    | "Antarctica/Troll"
    | "Antarctica/Vostok"
    | "Arctic/Longyearbyen"
    | "Asia/Aden"
    | "Asia/Almaty"
    | "Asia/Amman"
    | "Asia/Anadyr"
    | "Asia/Aqtau"
    | "Asia/Aqtobe"
    | "Asia/Ashgabat"
    | "Asia/Atyrau"
    | "Asia/Baghdad"
    | "Asia/Bahrain"
    | "Asia/Baku"
    | "Asia/Bangkok"
    | "Asia/Barnaul"
    | "Asia/Beirut"
    | "Asia/Bishkek"
    | "Asia/Brunei"
    | "Asia/Calcutta"
    | "Asia/Chita"
    | "Asia/Colombo"
    | "Asia/Damascus"
    | "Asia/Dhaka"
    | "Asia/Dili"
    | "Asia/Dubai"
    | "Asia/Dushanbe"
    | "Asia/Famagusta"
    | "Asia/Gaza"
    | "Asia/Hebron"
    | "Asia/Hong_Kong"
    | "Asia/Hovd"
    | "Asia/Irkutsk"
    | "Asia/Jakarta"
    | "Asia/Jayapura"
    | "Asia/Jerusalem"
    | "Asia/Kabul"
    | "Asia/Kamchatka"
    | "Asia/Karachi"
    | "Asia/Katmandu"
    | "Asia/Khandyga"
    | "Asia/Krasnoyarsk"
    | "Asia/Kuala_Lumpur"
    | "Asia/Kuching"
    | "Asia/Kuwait"
    | "Asia/Macau"
    | "Asia/Magadan"
    | "Asia/Makassar"
    | "Asia/Manila"
    | "Asia/Muscat"
    | "Asia/Nicosia"
    | "Asia/Novokuznetsk"
    | "Asia/Novosibirsk"
    | "Asia/Omsk"
    | "Asia/Oral"
    | "Asia/Phnom_Penh"
    | "Asia/Pontianak"
    | "Asia/Pyongyang"
    | "Asia/Qatar"
    | "Asia/Qostanay"
    | "Asia/Qyzylorda"
    | "Asia/Rangoon"
    | "Asia/Riyadh"
    | "Asia/Saigon"
    | "Asia/Sakhalin"
    | "Asia/Samarkand"
    | "Asia/Seoul"
    | "Asia/Shanghai"
    | "Asia/Singapore"
    | "Asia/Srednekolymsk"
    | "Asia/Taipei"
    | "Asia/Tashkent"
    | "Asia/Tbilisi"
    | "Asia/Tehran"
    | "Asia/Thimphu"
    | "Asia/Tokyo"
    | "Asia/Tomsk"
    | "Asia/Ulaanbaatar"
    | "Asia/Urumqi"
    | "Asia/Ust-Nera"
    | "Asia/Vientiane"
    | "Asia/Vladivostok"
    | "Asia/Yakutsk"
    | "Asia/Yekaterinburg"
    | "Asia/Yerevan"
    | "Atlantic/Azores"
    | "Atlantic/Bermuda"
    | "Atlantic/Canary"
    | "Atlantic/Cape_Verde"
    | "Atlantic/Faeroe"
    | "Atlantic/Madeira"
    | "Atlantic/Reykjavik"
    | "Atlantic/South_Georgia"
    | "Atlantic/St_Helena"
    | "Atlantic/Stanley"
    | "Australia/Adelaide"
    | "Australia/Brisbane"
    | "Australia/Broken_Hill"
    | "Australia/Darwin"
    | "Australia/Eucla"
    | "Australia/Hobart"
    | "Australia/Lindeman"
    | "Australia/Lord_Howe"
    | "Australia/Melbourne"
    | "Australia/Perth"
    | "Australia/Sydney"
    | "Europe/Amsterdam"
    | "Europe/Andorra"
    | "Europe/Astrakhan"
    | "Europe/Athens"
    | "Europe/Belgrade"
    | "Europe/Berlin"
    | "Europe/Bratislava"
    | "Europe/Brussels"
    | "Europe/Bucharest"
    | "Europe/Budapest"
    | "Europe/Busingen"
    | "Europe/Chisinau"
    | "Europe/Copenhagen"
    | "Europe/Dublin"
    | "Europe/Gibraltar"
    | "Europe/Guernsey"
    | "Europe/Helsinki"
    | "Europe/Isle_of_Man"
    | "Europe/Istanbul"
    | "Europe/Jersey"
    | "Europe/Kaliningrad"
    | "Europe/Kiev"
    | "Europe/Kirov"
    | "Europe/Lisbon"
    | "Europe/Ljubljana"
    | "Europe/London"
    | "Europe/Luxembourg"
    | "Europe/Madrid"
    | "Europe/Malta"
    | "Europe/Mariehamn"
    | "Europe/Minsk"
    | "Europe/Monaco"
    | "Europe/Moscow"
    | "Europe/Oslo"
    | "Europe/Paris"
    | "Europe/Podgorica"
    | "Europe/Prague"
    | "Europe/Riga"
    | "Europe/Rome"
    | "Europe/Samara"
    | "Europe/San_Marino"
    | "Europe/Sarajevo"
    | "Europe/Saratov"
    | "Europe/Simferopol"
    | "Europe/Skopje"
    | "Europe/Sofia"
    | "Europe/Stockholm"
    | "Europe/Tallinn"
    | "Europe/Tirane"
    | "Europe/Ulyanovsk"
    | "Europe/Vaduz"
    | "Europe/Vatican"
    | "Europe/Vienna"
    | "Europe/Vilnius"
    | "Europe/Volgograd"
    | "Europe/Warsaw"
    | "Europe/Zagreb"
    | "Europe/Zurich"
    | "Indian/Antananarivo"
    | "Indian/Chagos"
    | "Indian/Christmas"
    | "Indian/Cocos"
    | "Indian/Comoro"
    | "Indian/Kerguelen"
    | "Indian/Mahe"
    | "Indian/Maldives"
    | "Indian/Mauritius"
    | "Indian/Mayotte"
    | "Indian/Reunion"
    | "Pacific/Apia"
    | "Pacific/Auckland"
    | "Pacific/Bougainville"
    | "Pacific/Chatham"
    | "Pacific/Easter"
    | "Pacific/Efate"
    | "Pacific/Enderbury"
    | "Pacific/Fakaofo"
    | "Pacific/Fiji"
    | "Pacific/Funafuti"
    | "Pacific/Galapagos"
    | "Pacific/Gambier"
    | "Pacific/Guadalcanal"
    | "Pacific/Guam"
    | "Pacific/Honolulu"
    | "Pacific/Kiritimati"
    | "Pacific/Kosrae"
    | "Pacific/Kwajalein"
    | "Pacific/Majuro"
    | "Pacific/Marquesas"
    | "Pacific/Midway"
    | "Pacific/Nauru"
    | "Pacific/Niue"
    | "Pacific/Norfolk"
    | "Pacific/Noumea"
    | "Pacific/Pago_Pago"
    | "Pacific/Palau"
    | "Pacific/Pitcairn"
    | "Pacific/Ponape"
    | "Pacific/Port_Moresby"
    | "Pacific/Rarotonga"
    | "Pacific/Saipan"
    | "Pacific/Tahiti"
    | "Pacific/Tarawa"
    | "Pacific/Tongatapu"
    | "Pacific/Truk"
    | "Pacific/Wake"
    | "Pacific/Wallis"
    | "UTC";

const timezones: TimeZoneEntry[] = timezonesData;

const regions: string[] = regionsData;

/**
 * TimeZone class providing static methods for time zone operations.
 */
class TimeZone {
    static readonly timezones: TimeZoneEntry[] = timezones;
    static readonly regions: string[] = regions;

    private static timezoneCache: Record<string, TimeZoneEntry[]> = {};

    /**
     * Checks if a given string is a valid ISO date-time format.
     * @param dateTime - The date-time string to validate.
     * @returns True if the string is a valid ISO date-time, false otherwise.
     */
    static isISODateTime(dateTime: string): boolean {
        const date = new Date(dateTime);
        return !isNaN(date.getTime()) && dateTime.includes('T');
    }

    /**
     * Validates if a given string is a valid time zone.
     * @param timeZone - The time zone string to validate.
     * @returns True if the time zone is valid, false otherwise.
     */
    static isValidTimeZone(timeZone: string): boolean {
        return this.listWithOnlyValue().includes(timeZone as TimeZoneNames);
    }

    /**
     * Converts a date-time from one time zone to another.
     * @param dateTime - The date-time to convert (Date object or ISO string).
     * @param sourceTimeZone - The source time zone.
     * @param targetTimeZone - The target time zone.
     * @param returnISO - Whether to return ISO format (default: true).
     * @returns Converted date-time string in ISO format or Error if conversion fails.
     */
    static convertDateTime(dateTime: Date | string, sourceTimeZone: TimeZoneNames, targetTimeZone: TimeZoneNames, returnISO: boolean = true): string | Error {
        if (!this.isValidTimeZone(sourceTimeZone) || !this.isValidTimeZone(targetTimeZone)) {
            return new Error('Invalid time zone provided.');
        }

        try {
            let date: Date;
            if (typeof dateTime === 'string') {
                date = new Date(dateTime);
            } else {
                date = dateTime;
            }

            if (isNaN(date.getTime())) {
                throw new Error('Invalid date-time format.');
            }

            // Convert to target timezone using the same logic as convertToUTC
            const utcDate = this.convertToUTC(date, sourceTimeZone);
            if (typeof utcDate === 'string') {
                const targetDate = this.convertUTCToTimeZone(utcDate, targetTimeZone, { returnISO });
                return targetDate;
            }
            
            return utcDate;
        } catch (error) {
            return error;
        }
    }

    /**
     * Returns a list of all available time zones.
     * @returns Array of TimeZoneEntry objects.
     */
    static list(): TimeZoneEntry[] {
        return this.timezones;
    }

    /**
     * Returns a list of all time zone values.
     * @returns Array of time zone values.
     */
    static listWithOnlyValue(): TimeZoneNames[] {
        return this.timezones.map((tz) => tz.value) as TimeZoneNames[];
    }

    /**
     * Returns a list of all time zone labels.
     * @returns Array of time zone labels.
     */
    static listWithOnlyLabel(): string[] {
        return this.timezones.map((tz) => tz.label);
    }

    /**
     * Lists time zones for a specific region.
     * @param region - The region to filter time zones.
     * @returns Array of TimeZoneEntry objects for the specified region.
     */
    static listByRegion(region: string): TimeZoneEntry[] {
        if (!region || typeof region !== 'string') {
            return [];
        }
        const searchTerm = region.toLowerCase().trim();
        if (!this.timezoneCache[searchTerm]) {
            this.timezoneCache[searchTerm] = this.timezones.filter((tz) =>
                tz.label.toLowerCase().includes(searchTerm)
            );
        }
        return this.timezoneCache[searchTerm];
    }

    /**
     * Lists time zones for a specific country.
     * @param country - The country to filter time zones.
     * @returns Array of TimeZoneEntry objects for the specified country.
     */
    static listByCountry(country: string): TimeZoneEntry[] {
        if (!country || typeof country !== 'string') {
            return [];
        }
        const searchTerm = country.toLowerCase().trim();
        if (!this.timezoneCache[searchTerm]) {
            this.timezoneCache[searchTerm] = this.timezones.filter((tz) =>
                tz.country.toLowerCase().includes(searchTerm)
            );
        }
        return this.timezoneCache[searchTerm];
    }

    /**
     * Gets the details for a given time zone value.
     * @param value - The time zone value.
     * @returns The corresponding details or null if not found.
     */
    static getDetailsUsingTimeZoneValue(value: TimeZoneNames): TimeZoneEntry | null {
        const tz = this.timezones.find((tz) => tz.value === value);
        return tz ? tz : null;
    }

    /**
     * Returns a list of all available regions.
     * @returns Array of region strings.
     */
    static getRegions(): string[] {
        return this.regions;
    }

    /**
     * Converts a UTC date to a specified time zone.
     * @param utcDate - The UTC date (Date object or ISO string).
     * @param targetTimeZone - The target time zone.
     * @param options - Conversion options (optional).
     * @returns ISO formatted date-time string in the target time zone or error message.
     */
    static convertUTCToTimeZone(utcDate: Date | string, targetTimeZone: TimeZoneNames, options: ConvertOptions = {}): string | null {
        const { returnISO = true } = options;

        if (!this.isValidTimeZone(targetTimeZone)) {
            return "Invalid timezone provided.";
        }

        let date: Date;
        if (typeof utcDate === "string") {
            date = new Date(utcDate);
        } else {
            date = utcDate;
        }

        if (isNaN(date.getTime())) {
            return "Invalid date format.";
        }

        if (returnISO) {
            // Convert to target timezone and return ISO string
            const targetDate = new Date(date.getTime());
            const formatter = new Intl.DateTimeFormat('en-CA', {
                timeZone: targetTimeZone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hourCycle: 'h23'
            });
            
            const parts = Object.fromEntries(
                formatter.formatToParts(targetDate).map(p => [p.type, p.value])
            );
            
            return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}`;
        } else {
            const { is24Hour = true, dateSeparator = '-', timeSeparator = ':' } = options;
            const formatter = new Intl.DateTimeFormat('en-CA', {
                timeZone: targetTimeZone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hourCycle: is24Hour ? 'h23' : 'h12'
            });
            
            let formattedDate = formatter.format(date);
            
            if (dateSeparator !== '-') {
                formattedDate = formattedDate.replace(/-/g, dateSeparator);
            }
            if (timeSeparator !== ':') {
                formattedDate = formattedDate.replace(/:/g, timeSeparator);
            }

            return formattedDate;
        }
    }

    /**
     * Converts a date-time from a specified time zone to UTC.
     * @param dateTime - The date-time to convert (Date object or ISO string).
     * @param sourceTimeZone - The source time zone.
     * @param options - Conversion options (optional).
     * @returns ISO formatted UTC date-time string or error message.
     */
    static convertToUTC(date: Date | string, timeZone: TimeZoneNames, options: ConvertOptions = {}): string | Error {
        try {
            const { returnISO = true } = options;
            
            if (typeof date === 'string') {
                date = new Date(date);
            }

            if (isNaN(date.getTime())) {
                return "Invalid date format.";
            }

            // 1. Grab the local fields we want to reinterpret.
            const Y = date.getFullYear();          // year
            const M = date.getMonth();             // 0‑based month
            const D = date.getDate();
            const h = date.getHours();
            const m = date.getMinutes();
            const s = date.getSeconds();
            const ms = date.getMilliseconds();

            // 2. Build a *temporary* UTC date from those parts.
            //    (We'll use it only to learn the zone offset.)
            const tempUTC = new Date(Date.UTC(Y, M, D, h, m, s, ms));

            // 3. Ask Intl what clock time that UTC instant shows *inside* the zone.
            const dtf = new Intl.DateTimeFormat("en", {
                timeZone,
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hourCycle: "h23",
            });
            const parts = Object.fromEntries(
                dtf.formatToParts(tempUTC).map(p => [p.type, p.value])
            );

            // 4. Re‑encode those zone parts as a UTC millisecond value.
            const zoneMillis = Date.UTC(
                +parts.year,
                +parts.month - 1,
                +parts.day,
                +parts.hour,
                +parts.minute,
                +parts.second,
                ms
            );

            // 5. Offset between our *intended* wall time and what we got in step 3:
            const offset = zoneMillis - tempUTC.getTime(); // +offset means zone is ahead of UTC

            // 6. Apply that offset to the original wall‑time parts → correct UTC tick.
            const targetUtcMillis = Date.UTC(Y, M, D, h, m, s, ms) - offset;

            const utcDate = new Date(targetUtcMillis);

            if (returnISO) {
                return utcDate.toISOString();
            } else {
                const { is24Hour = true, dateSeparator = '-', timeSeparator = ':' } = options;
                const formatter = new Intl.DateTimeFormat('en-CA', {
                    timeZone: 'UTC',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hourCycle: is24Hour ? 'h23' : 'h12'
                });
                
                let formattedDate = formatter.format(utcDate);
                
                if (dateSeparator !== '-') {
                    formattedDate = formattedDate.replace(/-/g, dateSeparator);
                }
                if (timeSeparator !== ':') {
                    formattedDate = formattedDate.replace(/:/g, timeSeparator);
                }

                return formattedDate;
            }
        } catch (error) {
            return "An error occurred during conversion.";
        }
    }

    /**
     * Converts a date-time between two specified time zones.
     * @param date - The date-time string to convert.
     * @param fromTimeZone - The source time zone.
     * @param toTimeZone - The target time zone.
     * @param options - Conversion options (optional).
     * @returns ISO formatted date-time string in the target time zone or error message.
     */
    static convertBetweenTimeZones(date: string, fromTimeZone: TimeZoneNames, toTimeZone: TimeZoneNames, options: ConvertOptions = {}): string | null {
        try {
            if (!this.isValidTimeZone(fromTimeZone) || !this.isValidTimeZone(toTimeZone)) {
                return "Invalid timezone provided.";
            }

            const originalDate = new Date(date);

            if (isNaN(originalDate.getTime())) {
                return 'Invalid date format.';
            }

            // First convert to UTC from source timezone
            const utcDate = this.convertToUTC(originalDate, fromTimeZone);
            if (typeof utcDate !== 'string') {
                return "An error occurred during time zone conversion.";
            }

            // Then convert from UTC to target timezone
            const targetDate = this.convertUTCToTimeZone(utcDate, toTimeZone, options);
            return targetDate;
        } catch (error) {
            return "An error occurred during time zone conversion.";
        }
    }

    /**
     * Gets the current time in a specified time zone.
     * @param targetTimeZone - The target time zone.
     * @param options - Formatting options (optional).
     * @returns ISO formatted current date-time string in the target time zone or error message.
     */
    static getCurrentTimeInTimeZone(targetTimeZone: TimeZoneNames, options: ConvertOptions = {}): string | null {
        const { returnISO = true } = options;

        if (!this.isValidTimeZone(targetTimeZone)) {
            return "Invalid timezone provided.";
        }

        const currentDate = new Date();
        return this.convertUTCToTimeZone(currentDate, targetTimeZone, options);
    }

    /**
     * Calculates the time difference between two time zones for a given date.
     * @param date - The date string to use for calculation.
     * @param fromTimeZone - The source time zone.
     * @param toTimeZone - The target time zone.
     * @returns Formatted time difference string or error message.
     */
    static getTimeDifferenceBetweenTimeZones(date: string, fromTimeZone: TimeZoneNames, toTimeZone: TimeZoneNames): string | null {
        if (!this.isValidTimeZone(fromTimeZone) || !this.isValidTimeZone(toTimeZone)) {
            return "Invalid timezone provided.";
        }

        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            return 'Invalid date format.';
        }

        // Get the time in both timezones
        const fromTime = this.convertUTCToTimeZone(parsedDate, fromTimeZone);
        const toTime = this.convertUTCToTimeZone(parsedDate, toTimeZone);

        if (!fromTime || !toTime) {
            return 'Invalid date format.';
        }

        // Calculate the difference in milliseconds
        const fromMs = new Date(fromTime).getTime();
        const toMs = new Date(toTime).getTime();
        const timeDifferenceMs = toMs - fromMs;

        // Convert to hours and minutes
        const hours = Math.floor(Math.abs(timeDifferenceMs) / (1000 * 60 * 60));
        const minutes = Math.floor((Math.abs(timeDifferenceMs) % (1000 * 60 * 60)) / (1000 * 60));

        return `${timeDifferenceMs >= 0 ? "+" : "-"}${hours} hours ${minutes} minutes`;
    }

    /**
     * Convert UTC date-time to Local date-time and return local ISO string
     * @param dateTimeString - The date-time string to convert.
     * @returns Local formatted date-time string or null if conversion fails.
     */
    static convertUTCToLocal(dateTimeString: string): string | null {
        try {
            const utcDate = new Date(dateTimeString);

            if (isNaN(utcDate.getTime())) {
                return null;
            }

            // Convert to local timezone
            const localDate = new Date(utcDate.getTime());
            return localDate.toISOString();
        } catch (error) {
            return null;
        }
    }

    /**
     * Format an ISO date-time string using a custom format pattern
     * @param isoDateTimeString - The ISO date-time string to format
     * @param format - The format pattern (simplified version)
     * @param timezone - Optional timezone to convert to before formatting (default: UTC)
     * @returns Formatted date-time string or null if formatting fails
     */
    static formatDateTime(isoDateTimeString: string, format: string, timezone: TimeZoneNames = 'UTC'): string | null {
        try {
            if (!this.isValidTimeZone(timezone) && timezone !== 'UTC') {
                return "Invalid timezone provided.";
            }

            const date = new Date(isoDateTimeString);

            if (isNaN(date.getTime())) {
                return "Invalid ISO date-time string.";
            }

            // Use Intl.DateTimeFormat for formatting
            const formatter = new Intl.DateTimeFormat('en-CA', {
                timeZone: timezone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hourCycle: 'h23'
            });

            const parts = Object.fromEntries(
                formatter.formatToParts(date).map(p => [p.type, p.value])
            );

            // Simple format replacement (basic implementation)
            let formattedDate = format;
            formattedDate = formattedDate.replace(/yyyy/g, parts.year);
            formattedDate = formattedDate.replace(/MM/g, parts.month);
            formattedDate = formattedDate.replace(/dd/g, parts.day);
            formattedDate = formattedDate.replace(/HH/g, parts.hour);
            formattedDate = formattedDate.replace(/mm/g, parts.minute);
            formattedDate = formattedDate.replace(/ss/g, parts.second);

            return formattedDate;
        } catch (error) {
            return null;
        }
    }

    /**
     * Get the user's local timezone
     * @returns The IANA timezone identifier string for the user's local timezone
     */
    static getLocalTimeZone(): string {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
}

export { TimeZone };
export default TimeZone;