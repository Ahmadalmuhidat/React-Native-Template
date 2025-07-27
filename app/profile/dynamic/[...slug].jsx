import { useLocalSearchParams } from 'expo-router';

export default function Page() {
  const { slug } = useLocalSearchParams();
}
