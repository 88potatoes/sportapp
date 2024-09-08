export interface ApiResponse<T = undefined> {
  success: boolean;
  message?: string; // Optional, provides additional context
  data?: T; // Optional, includes the main data payload
  error?: string; // Optional, provides error details if `success` is false
}
