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
    SEARCHING_DRIVER: '/(passenger)/booking/searching-driver',
    DRIVER_FOUND: '/(passenger)/booking/driver-found',
    RIDE_IN_PROGRESS: '/(passenger)/booking/ride-in-progress',
    RIDE_COMPLETED: '/(passenger)/booking/ride-completed',
    RIDE_DETAILS: (id: string) => `/(passenger)/ride-details/${id}`,
  },
} as const;

