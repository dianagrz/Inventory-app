import { Link } from 'expo-router';
import { FlatList, Pressable, RefreshControl, StyleSheet, View } from 'react-native';

import { getCategorias } from '@/api/catalogo';
import { Cargando, ErrorConReintento } from '@/components/estado-pantalla';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useApi } from '@/hooks/use-api';
import { useTheme } from '@/hooks/use-theme';

export default function CategoriasScreen() {
  const theme = useTheme();
  const { datos, cargando, recargando, error, recargar, reintentar } = useApi(
    (signal) => getCategorias(signal),
    [],
  );

  if (cargando) return <Cargando />;
  if (error && !datos) return <ErrorConReintento mensaje={error} onReintentar={reintentar} />;

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={datos}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.fila}
        contentContainerStyle={styles.lista}
        refreshControl={
          <RefreshControl refreshing={recargando} onRefresh={recargar} tintColor={theme.text} />
        }
        ListHeaderComponent={
          <ThemedText themeColor="textSecondary" style={styles.encabezado}>
            Elige una categoría para ver sus productos
          </ThemedText>
        }
        ListEmptyComponent={
          <ThemedText themeColor="textSecondary">No hay categorías disponibles.</ThemedText>
        }
        renderItem={({ item }) => (
          <Link
            href={{ pathname: '/productos/[categoriaId]', params: { categoriaId: item.id } }}
            asChild>
            <Pressable style={({ pressed }) => [styles.tarjetaWrapper, pressed && styles.presionado]}>
              <ThemedView type="backgroundElement" style={styles.tarjeta}>
                <View style={[styles.icono, { backgroundColor: item.color }]}>
                  <ThemedText style={styles.emoji}>{item.icono}</ThemedText>
                </View>
                <ThemedText type="smallBold">{item.nombre}</ThemedText>
                {item.totalProductos !== undefined && (
                  <ThemedText type="small" themeColor="textSecondary">
                    {item.totalProductos} productos
                  </ThemedText>
                )}
              </ThemedView>
            </Pressable>
          </Link>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lista: {
    padding: Spacing.three,
    gap: Spacing.three,
  },
  encabezado: {
    marginBottom: Spacing.two,
  },
  fila: {
    gap: Spacing.three,
  },
  tarjetaWrapper: {
    flex: 1,
  },
  tarjeta: {
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.three,
  },
  icono: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 32,
    lineHeight: 40,
  },
  presionado: {
    opacity: 0.7,
  },
});
