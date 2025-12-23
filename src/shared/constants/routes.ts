export const ROUTES = {
  AUTH: {
    LOGIN: '/(auth)/login',
    REGISTER: '/(auth)/register',
    VERIFY_PHONE: '/(auth)/verify-phone',
    FORGOT_PASSWORD: '/(auth)/forgot-password',
  },
  PASSENGER: {
    HOME: '/(passenger)/(tabs)/home',
    ACTIVITY: '/(passenger)/(tabs)/activity',
    WALLET: '/(passenger)/(tabs)/wallet',
    PROFILE: '/(passenger)/(tabs)/profile',
    SELECT_DESTINATION: '/(passenger)/booking/select-destination',
    CONFIRM_RIDE: '/(passenger)/booking/confirm-ride',
    PAYMENT_METHOD: '/(passenger)/booking/payment-method',
    CHAT: '/(passenger)/booking/chat',
    RIDE_DETAILS: (id: string) => `/(passenger)/ride-details/${id}`,
  },
} as const;

