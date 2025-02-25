export interface BaseResponse<T = any> {
  status_code: number;
  message: string;
  error: any;
  data: T;
}
