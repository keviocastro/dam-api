import { DistributionRule } from '../generated/prisma/client.js';

interface DateRangeConfig {
  startDate: string;
  endDate: string;
}

interface LocationConfig {
  countries?: string[];
  regions?: string[];
  cities?: string[];
}

interface DeviceConfig {
  types?: string[];
}

interface ValidationContext {
  location?: string;
  device?: string;
  currentDate?: Date;
}

export const validateRule = (
  rule: DistributionRule,
  context: ValidationContext = {}
): boolean => {
  if (!rule.isActive) {
    return false;
  }

  const config = JSON.parse(rule.config);
  const currentDate = context.currentDate || new Date();

  switch (rule.type) {
    case 'DATE_RANGE':
      return validateDateRange(config as DateRangeConfig, currentDate);
    
    case 'LOCATION':
      return validateLocation(config as LocationConfig, context.location);
    
    case 'DEVICE':
      return validateDevice(config as DeviceConfig, context.device);
    
    default:
      return false;
  }
};

const validateDateRange = (config: DateRangeConfig, currentDate: Date): boolean => {
  const startDate = new Date(config.startDate);
  const endDate = new Date(config.endDate);
  
  return currentDate >= startDate && currentDate <= endDate;
};

const validateLocation = (config: LocationConfig, location?: string): boolean => {
  if (!location) {
    return true;
  }

  const normalizedLocation = location.toLowerCase().trim();

  if (config.countries && config.countries.length > 0) {
    return config.countries.some(
      country => country.toLowerCase() === normalizedLocation
    );
  }

  if (config.regions && config.regions.length > 0) {
    return config.regions.some(
      region => region.toLowerCase() === normalizedLocation
    );
  }

  if (config.cities && config.cities.length > 0) {
    return config.cities.some(
      city => city.toLowerCase() === normalizedLocation
    );
  }

  return true;
};

const validateDevice = (config: DeviceConfig, device?: string): boolean => {
  if (!device || !config.types || config.types.length === 0) {
    return true;
  }

  const normalizedDevice = device.toLowerCase().trim();
  
  return config.types.some(
    type => type.toLowerCase() === normalizedDevice
  );
};

