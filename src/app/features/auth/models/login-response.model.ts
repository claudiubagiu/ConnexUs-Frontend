export interface LoginResponse {
  jwtToken: string;
  email: string;
  roles: string[];
}
