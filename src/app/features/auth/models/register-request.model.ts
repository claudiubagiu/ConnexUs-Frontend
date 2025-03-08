export interface RegisterRequest {
  UserName: string;
  Email: string;
  Password: string;
  FirstName: string;
  LastName: string;
  Roles: string[];
  Age: number | undefined;
}
