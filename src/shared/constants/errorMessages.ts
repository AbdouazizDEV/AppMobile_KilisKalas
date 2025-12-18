export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erreur de connexion. Vérifiez votre connexion internet.',
  UNAUTHORIZED: 'Vous n\'êtes pas autorisé à effectuer cette action.',
  NOT_FOUND: 'Ressource non trouvée.',
  VALIDATION_ERROR: 'Les données fournies sont invalides.',
  SERVER_ERROR: 'Erreur serveur. Veuillez réessayer plus tard.',
  UNKNOWN_ERROR: 'Une erreur inattendue s\'est produite.',
  
  // Auth
  INVALID_CREDENTIALS: 'Identifiants invalides.',
  USER_NOT_FOUND: 'Utilisateur non trouvé.',
  PHONE_ALREADY_EXISTS: 'Ce numéro de téléphone est déjà utilisé.',
  INVALID_OTP: 'Code de vérification invalide.',
  
  // Ride
  NO_DRIVER_AVAILABLE: 'Aucun chauffeur disponible pour le moment.',
  RIDE_NOT_FOUND: 'Course non trouvée.',
  CANNOT_CANCEL_RIDE: 'Impossible d\'annuler cette course.',
  
  // Payment
  PAYMENT_FAILED: 'Le paiement a échoué.',
  INSUFFICIENT_BALANCE: 'Solde insuffisant.',
} as const;

