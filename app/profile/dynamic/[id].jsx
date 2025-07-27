import { useLocalSearchParams } from 'expo-router';

export default function Page() {
  const { id } = useLocalSearchParams();
  return <Text>User ID: {id}</Text>;
}
