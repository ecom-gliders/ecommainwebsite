export interface SanitizeTransform {
  id: string;
  detail?: string;
}

export interface SanitizePluginResult {
  content: string;
  transforms: SanitizeTransform[];
}

export type SanitizePlugin = (content: string) => SanitizePluginResult;
