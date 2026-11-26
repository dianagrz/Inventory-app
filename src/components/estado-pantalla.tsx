import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** Pantalla completa con un indicador de carga. */
export function Cargando() {
  const theme = useTheme();
  return (
    <ThemedView style={styles.centro}>
      <ActivityIndicator size="large" color={theme.text} />
    </ThemedView>
  );
}

/** Pantalla completa con un mensaje de error y botón para reintentar. */
export function ErrorConReintento({
  mensaje,
  onReintentar,
}: {
  mensaje: string;
  onReintentar: () => void;
}) {
  return (
    <ThemedView style={styles.centro}>
      <ThemedText style={styles.emoji}>⚠️</ThemedText>
      <ThemedText style={styles.texto}>{mensaje}</ThemedText>
      <Pressable
        onPress={onReintentar}
        style={({ pressed }) => [styles.boton, pressed && styles.presionado]}>
        <ThemedText type="smallBold" style={styles.textoBoton}>
          Reintentar
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    padding: Spacing.four,
  },
  emoji: {
    fontSize: 40,
    lineHeight: 48,
  },
  texto: {
    textAlign: 'center',
  },
  boton: {
    backgroundColor: '#1e3a8a',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.two,
  },
  textoBoton: {
    color: '#ffffff',
  },
  presionado: {
    opacity: 0.7,
  },
});
