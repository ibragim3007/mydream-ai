import { useApp } from '@/entities/appStore/useApp';
import { useGetDreams } from '@/entities/dream/dream.repository';
import { getDreamAnalysisResponse } from '@/entities/dream/helpers/getDreamResponse';
import { groupDreamsByDate } from '@/entities/dream/helpers/groupDreamsByDate';
import { HORIZONTAL_PADDINGS } from '@/shared/config/constants/constants';
import DreamItem from '@/shared/ui/elements/DreamItem';
import LoaderIndicator from '@/shared/ui/elements/LoaderIndicator';
import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import { normalizedSize } from '@/shared/utils/size';
import { router } from 'expo-router';
import { SectionList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SectionHeader from './ui/SectionHeader';
import Animated, { LinearTransition } from 'react-native-reanimated';

interface DreamsListProps {
  headerComponent: React.ComponentType<any>;
}

export default function DreamsList({ headerComponent }: DreamsListProps) {
  // const { data, isLoading, isError } = useGetDreams();

  const { data, isError, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useGetDreams();

  const flatData = data?.pages.flat() || [];

  const insets = useSafeAreaInsets();
  const onPressDreamCard = (id: string) => {
    router.push(`/screens/dream/${id}`);
  };

  const { local } = useApp();

  const groupedDreams = groupDreamsByDate(flatData, local);

  if (isError) {
    return <Typography>Error loading dreams</Typography>;
  }

  return (
    <Animated.View layout={LinearTransition.duration(500)}>
      <SectionList
        sections={groupedDreams}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        refreshing={isLoading}
        ListHeaderComponent={headerComponent}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            void fetchNextPage();
          }
        }}
        contentContainerStyle={{
          paddingBottom: normalizedSize(80),
          paddingHorizontal: HORIZONTAL_PADDINGS,
          paddingTop: insets.top,
          minHeight: '100%',
        }}
        renderItem={({ item }) => {
          const analysis = getDreamAnalysisResponse(item.analyzeText);
          return (
            <DreamItem
              id={item.id}
              date={new Date(item.createdAt).toDateString()}
              title={item.title}
              description={item.inputText}
              onPress={onPressDreamCard}
            />
          );
        }}
        renderSectionHeader={({ section: { title } }) => <SectionHeader title={title} />}
        ListFooterComponent={() => {
          if (isLoading || isFetchingNextPage)
            return (
              <Grid flex={1} align="center" marginVertical={10}>
                <LoaderIndicator />
              </Grid>
            );
        }}
        ItemSeparatorComponent={() => <Grid height={20} />}
      />
    </Animated.View>
  );
}
