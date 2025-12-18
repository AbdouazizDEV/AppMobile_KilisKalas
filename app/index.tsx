import { Redirect } from 'expo-router';

export default function Index() {
  // Rediriger vers la page splash au démarrage
  return <Redirect href="/splash" />;
}

