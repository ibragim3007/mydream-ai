import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import { normalizedSize } from '@/shared/utils/size';
import { Image } from 'expo-image';
import AppIcon from '@/assets/icons/app_icon_transparent.png';
import { useTranslation } from 'react-i18next';

export default function ListHeaderTitles() {
  const { t } = useTranslation();
  return (
    <Grid space="sm">
      <Grid space="md" row align="center">
        <Typography variant="title-0" weight="bold">
          {t('home.headerTitle')}
        </Typography>
        <Image source={AppIcon} style={{ height: normalizedSize(45), width: normalizedSize(45) }} />
      </Grid>
      <Typography>{t('home.description')}</Typography>
    </Grid>
  );
}
