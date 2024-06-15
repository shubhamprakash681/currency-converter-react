export interface ApiResponse {
  success?: boolean;
  message?: string;

  // optional API response data
  base_code: string;
  documentation: string;
  rates: { [key: string]: number };
  time_last_update_utc: string;
  time_next_update_utc: string;
}
