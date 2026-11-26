import { Link } from 'expo-router';
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

import { getCategorias } from '@/api/catalogo';
import { Cargando, ErrorConReintento } from '@/components/estado-pantalla';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useApi } from '@/hooks/use-api';
import { useTheme } from '@/hooks/use-theme';

const COLUMNAS = 2;
const ALTO_TARJETA = 170;

export default function CategoriasScreen() {
  const theme = useTheme();

  // Todas las tarjetas miden lo mismo: el ancho disponible entre el número de columnas.
  const { width } = useWindowDimensions();
  const anchoLista = Math.min(width, MaxContentWidth);
  const anchoTarjeta =
    (anchoLista - Spacing.three * 2 - Spacing.three * (COLUMNAS - 1)) / COLUMNAS;
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
        numColumns={COLUMNAS}
        columnWrapperStyle={styles.fila}
        style={{ width: anchoLista, alignSelf: 'center' }}
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
            <Pressable style={{ width: anchoTarjeta, height: ALTO_TARJETA }}>
              {({ pressed }) => (
                <ThemedView
                  type="backgroundElement"
                  style={[styles.tarjeta, pressed && styles.presionado]}>
                  <View style={[styles.icono, { backgroundColor: item.color }]}>
                    <ThemedText style={styles.emoji}>{item.icono}</ThemedText>
                  </View>
                  <ThemedText type="smallBold" numberOfLines={2} style={styles.nombre}>
                    {item.nombre}
                  </ThemedText>
                  {item.totalProductos !== undefined && (
                    <ThemedText type="small" themeColor="textSecondary">
                      {item.totalProductos} productos
                    </ThemedText>
                  )}
                </ThemedView>
              )}
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
  tarjeta: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },
  nombre: {
    textAlign: 'center',
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
