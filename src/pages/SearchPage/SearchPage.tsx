import Grid from '@/shared/ui/grid/Grid';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import Typography from '@/shared/ui/typography/Typography';
import { FlatList } from 'react-native';
import { Image } from 'expo-image';
import Button from '@/shared/ui/buttons/Button';

const attractions = [
  {
    name: 'Новосибирский зоопарк',
    description:
      'Один из крупнейших зоопарков России, известный своим разнообразием животных и программами по сохранению редких видов.',
    image: 'https://img.geliophoto.com/nsk2019w/000_nsk2019w.jpg',
  },
  {
    name: 'Оперный театр',
    description:
      'Новосибирский театр оперы и балета – крупнейший театр Сибири, знаменитый своей архитектурой и постановками мирового уровня.',
    image:
      'https://avatars.mds.yandex.net/get-marketcms/1534436/img-acf5c2b7-d7b5-4ceb-9359-1590cf7f5023.jpeg/optimize',
  },
  {
    name: 'Академгородок',
    description: 'Научный центр России, известный своими институтами, университетами и особенной атмосферой.',
    image: 'https://img.geliophoto.com/nsk2019w/000_nsk2019w.jpg',
  },
  {
    name: 'Площадь Ленина',
    description: 'Центральная площадь города с памятником Ленину, окруженная историческими зданиями и парками.',
    image:
      'https://avatars.mds.yandex.net/get-marketcms/1534436/img-acf5c2b7-d7b5-4ceb-9359-1590cf7f5023.jpeg/optimize',
  },
  {
    name: 'Бугринский мост',
    description: 'Современный вантовый мост через реку Обь, ставший одним из символов Новосибирска.',
    image: 'https://placehold.co/600x400',
  },
  {
    name: 'Музей железнодорожной техники',
    description:
      'Один из крупнейших музеев под открытым небом, где представлены уникальные образцы поездов и локомотивов.',
    image: 'https://placehold.co/600x400',
  },
  {
    name: 'Часовня Святого Николая',
    description: 'Небольшая, но значимая часовня, символ географического центра Российской Империи.',
    image: 'https://placehold.co/600x400',
  },
];

// Это просто пример
export default function SearchPage() {
  return (
    <PageWrapper>
      <Grid>
        <Grid>
          <FlatList
            data={attractions}
            contentContainerStyle={{ padding: 10 }}
            ItemSeparatorComponent={() => <Grid height={30} />}
            StickyHeaderComponent={() => (
              <Typography variant="title-2" textAlign="center" weight="medium">
                Поисковый инпут
              </Typography>
            )}
            renderItem={({ item }) => (
              <Grid space="md">
                <Grid space="sm">
                  <Typography variant="title-2">{item.name}</Typography>
                  <Typography>{item.description}</Typography>
                </Grid>
                <Image source={item.image} style={{ height: 250 }} contentFit="cover" />
                <Button>Test</Button>
              </Grid>
            )}
          />
        </Grid>
      </Grid>
    </PageWrapper>
  );
}
