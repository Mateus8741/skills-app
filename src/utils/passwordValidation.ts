export function passwordValidation(password: string) {
  return {
    hasMinLength: password?.length >= 6,
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
}
