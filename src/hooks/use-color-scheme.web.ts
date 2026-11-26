import { useSyncExternalStore } from 'react';
import { Appearance } from 'react-native';

function subscribe(onChange: () => void) {
  const subscription = Appearance.addChangeListener(onChange);
  return () => subscription.remove();
}

export function useColorScheme() {
  // Start with the same theme on the server and during browser hydration.
  return useSyncExternalStore(subscribe, () => Appearance.getColorScheme(), () => 'light');
}
