export type Role = string;
export type Status = 'ON' | 'OFF' | 'FAULT' | 'OK';
export type EquipmentType = 
  | 'pump' | 'meter' | 'valve' | 'panel' | 'light' | 'sensor' | 'other'
  | 'dg' | 'ups' | 'transformer' | 'stp_pump' | 'wtp_pump' | 'lift' 
  | 'fire_panel' | 'water_flow_meter' | 'rain_water_meter' | 'lighting_circuit'
  | 'hvac' | 'swimming_pool_pump' | 'booster_pump' | 'sump_pump';
export type AlertSeverity = 'high' | 'medium' | 'low';
export type SubscriptionStatus = 'Active' | 'Expired' | 'Upcoming' | 'Inactive';
export type Permission = 'control' | 'edit_users' | 'edit_automation' | 'control_limited' | 'manage_data';

export interface Site {
  id: string;
  name: string;
  city: string;
  towers: number;
  address?: string;
  latitude?: number;
  longitude?: number;
  contactName?: string;
  contactPhone?: string;
  tags?: string[];
  subscriptionStartDate?: string;
  subscriptionEndDate?: string;
}

export interface Tower {
  id: string;
  siteId: string;
  name: string;
  code?: string;
  type?: 'tower' | 'block' | 'plant';
  floors?: number;
  tags?: string[];
}

export interface HttpHeader {
  id: string;
  key: string;
  value: string;
}

export interface MqttConfig {
  brokerUrl?: string;
  port?: number;
  topic?: string;
  username?: string;
  password?: string;
}

export interface HttpConfig {
  endpointUrl?: string;
  method?: 'GET' | 'POST';
  headers?: HttpHeader[];
}

export interface CoapConfig {
  endpointUrl?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
}


export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  siteId: string;
  towerId: string;
  status: Status;
  runHours: number;
  lastSeen: string;
  alarms: string[];
  powerKw: number;
  ratedKw?: number;
  serialNo?: string;
  commissionedAt?: string;
  lastServiceAt?: string;
  nextServiceAt?: string;
  tags?: string[];
  voltage?: number;
  current?: number;
  // IoT Specific
  isIoT?: boolean;
  deviceId?: string;
  firmwareVersion?: string;
  protocol?: 'MQTT' | 'HTTP' | 'CoAP' | string;
  protocolConfig?: MqttConfig | HttpConfig | CoapConfig;
  // DG specific
  fuelLevelPct?: number; 
  fuelConsumptionLph?: number;
  // HVAC specific
  temperature?: number;
  humidity?: number;
  sensorId?: string;
}


export interface SensorTankLevel {
  id: string;
  towerId: string;
  name: string;
  levelPct: number;
  capacityLiters: number;
}

export interface SensorFlowRate {
  towerId: string;
  lpm: number;
}

export interface SensorEnergyKwhDaily {
  date: string;
  [key: string]: any; // Allow for dynamic site keys
}

export interface SensorPumpRuntimeHoursWeekly {
  week: string;
  [key: string]: any;
}

export interface AutomationAction {
  id: string;
  type: 'equipment' | 'notification';
  // for 'equipment' type
  targetId?: string;
  to?: 'ON' | 'OFF';
  // for 'notification' type
  message?: string;
  severity?: AlertSeverity;
}


export interface AutomationCondition {
  id: string;
  type: 'metric' | 'time';
  // metric
  equipmentId?: string;
  metric?: 'powerKw' | 'fuelLevelPct' | 'temperature' | 'humidity' | 'voltage' | 'current' | 'runHours' | 'alarmCount';
  operator?: '>' | '<' | '=';
  threshold?: number;
  // time
  cron?: string;
}

export interface AutomationConditionGroup {
  id: string;
  logic: 'AND' | 'OR';
  conditions: AutomationCondition[];
  /** Defines the logic operator to the *next* group in the sequence. The last group will not use this. */
  nextGroupOperator?: 'AND' | 'OR';
}


export interface Automation {
  id: string;
  name: string;
  siteId: string;
  enabled: boolean;
  conditionGroups: AutomationConditionGroup[];
  // FIX: Added missing actions property to the Automation type.
  actions: AutomationAction[];
  notifyOnExecution?: boolean;
  /** @deprecated Migrated to conditionGroups. Will be removed in future versions. */
  conditions?: AutomationCondition[];
  /** @deprecated Migrated to conditionGroups. Will be removed in future versions. */
  conditionLogic?: 'AND' | 'OR';
  /** @deprecated Migrated to nextGroupOperator on each conditionGroup. */
  triggerLogic?: 'AND' | 'OR';
}


export interface Schedule {
  id: string;
  name: string;
  scope: string; // siteId
  cron: string;
  action: 'ON' | 'OFF';
  targets: string[]; // equipment IDs
}

export interface AlertRuleCondition {
  metric: 'powerKw' | 'fuelLevelPct' | 'temperature' | 'humidity';
  operator: '>' | '<' | '=';
  threshold: number;
  durationMinutes: number;
}

export interface SiteSpecificCondition {
  siteId: string;
  condition: AlertRuleCondition;
}

export interface AlertRule {
  id: string;
  name: string;
  enabled: boolean;
  equipmentType: EquipmentType;
  severity: AlertSeverity;
  // A rule now has a default condition and optional site-specific overrides
  defaultCondition: AlertRuleCondition;
  siteOverrides: SiteSpecificCondition[];
  escalationConfig?: {
    enabled: boolean;
    delayMinutes: number;
    notifyRoles: Role[];
  };
  /** @deprecated Migrated to defaultCondition and siteOverrides */
  siteId?: string;
  /** @deprecated Migrated to defaultCondition and siteOverrides */
  condition?: AlertRuleCondition;
}


export interface Alert {
  id: string;
  type: string;
  ts: string;
  message: string;
  equipmentId: string;
  severity: AlertSeverity;
  acknowledgedBy?: string;
  ruleId?: string;
  escalationLevel?: number;
}

export interface User {
  id: string;
  name: string;
  role: Role;
  email: string;
  phone?: string;
  assignedSiteIds?: string[];
}

export interface CommandLogItem {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
}

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  action?: ToastAction;
}

// For historical data generation
export interface HistoricalEnergyRecord {
  date: string;
  kwh: number;
  cost: number;
  siteId: string;
  towerId?: string;
}

export interface HistoricalPumpRecord {
  date: string;
  runtimeHours: number;
  pumpId: string;
  siteId: string;
}

export interface HistoricalAlertRecord extends Alert {
  siteId: string;
}

export interface HistoricalTankLevelRecord {
  date: string;
  levelPct: number;
  tankId: string;
  siteId: string;
}

export interface HistoricalWaterConsumptionRecord {
  date: string;
  towerId: string;
  siteId: string;
  litersConsumedDomestic: number;
  litersConsumedTreated: number;
  litersRainWaterHarvested?: number;
}

export interface HistoricalDgRecord {
  date: string;
  runtimeHours: number;
  fuelConsumedLiters: number;
  energyGeneratedKwh: number;
  dgId: string;
  siteId: string;
}

export interface CalculationSettings {
  costPerKwh: number;
  costPerLiterDiesel: number;
  costPerKlDomesticWater: number;
  costPerKlTreatedWater: number;
}

// --- Notification Configurations ---

export interface WhatsAppConfig {
  enabled: boolean;
  apiKey?: string;
  senderPhoneNumber?: string;
}

export interface TelegramConfig {
  enabled: boolean;
  botToken?: string;
  chatId?: string;
}

export interface SmsConfig {
  enabled: boolean;
  provider?: 'twilio' | 'vonage' | 'custom';
  accountSid?: string;
  authToken?: string;
  fromNumber?: string;
}

export interface EmailConfig {
  enabled: boolean;
  smtpHost?: string;
  smtpPort?: number;
  smtpUser?: string;
  smtpPass?: string;
  fromEmail?: string;
}

export interface SiteConfiguration {
  siteId: string;
  calculations: CalculationSettings;
  notifications: {
    whatsapp: WhatsAppConfig;
    telegram: TelegramConfig;
    sms: SmsConfig;
    email: EmailConfig;
  };
}