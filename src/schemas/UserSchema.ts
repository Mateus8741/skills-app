export interface UserSchema {
  token: string;
  user: User;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  isAuthenticated: boolean;
  rating: number;
}
