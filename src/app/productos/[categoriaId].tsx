import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';

import { getProductosPorCategoria } from '@/api/catalogo';
import { Cargando, ErrorConReintento } from '@/components/estado-pantalla';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useApi } from '@/hooks/use-api';
import { useTheme } from '@/hooks/use-theme';

export default function ProductosScreen() {
  const theme = useTheme();
  const { categoriaId } = useLocalSearchParams<{ categoriaId: string }>();

  const { datos, cargando, recargando, error, recargar, reintentar } = useApi(
    (signal) => getProductosPorCategoria(categoriaId, signal),
    [categoriaId],
  );

  if (cargando) return <Cargando />;
  if (error && datos === undefined) {
    return <ErrorConReintento mensaje={error} onReintentar={reintentar} />;
  }

  if (!datos) {
    return (
      <ThemedView style={styles.vacio}>
        <Stack.Screen options={{ title: 'No encontrada' }} />
        <ThemedText>La categoría no existe.</ThemedText>
      </ThemedView>
    );
  }

  const { categoria, productos } = datos;

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: categoria.nombre }} />
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        refreshControl={
          <RefreshControl refreshing={recargando} onRefresh={recargar} tintColor={theme.text} />
        }
        ListEmptyComponent={
          <ThemedText themeColor="textSecondary">No hay productos en esta categoría.</ThemedText>
        }
        renderItem={({ item }) => (
          <ThemedView type="backgroundElement" style={styles.producto}>
            {item.imagen ? (
              <Image
                source={{ uri: item.imagen }}
                style={[styles.imagen, { backgroundColor: theme.backgroundSelected }]}
                contentFit="cover"
                transition={200}
              />
            ) : (
              <View style={[styles.marca, { backgroundColor: categoria.color }]} />
            )}
            <View style={styles.info}>
              <ThemedText type="smallBold">{item.nombre}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary" numberOfLines={2}>
                {item.descripcion}
              </ThemedText>
            </View>
            <ThemedText type="smallBold">${item.precio.toFixed(2)}</ThemedText>
          </ThemedView>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  vacio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lista: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  producto: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },
  imagen: {
    width: 64,
    height: 64,
    borderRadius: Spacing.two,
  },
  marca: {
    width: 6,
    alignSelf: 'stretch',
    borderRadius: 3,
  },
  info: {
    flex: 1,
    gap: Spacing.half,
  },
});
