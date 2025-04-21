import { useAuth } from '@/entities/auth/auth.repository';
import { DreamsList } from '@/module/DreamsList';
import HeaderPlaceholder from '@/shared/ui/elements/HeaderPlaceholder';
import Grid from '@/shared/ui/grid/Grid';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import Superwall from '@superwall/react-native-superwall';
import { useEffect } from 'react';
import ListHeader from './ListHeader';

export default function HomePage() {
  const { user, initUser } = useAuth();

  useEffect(() => {
    void initUser();
    Superwall.shared.register({
      placement: 'campaign_trigger',
    });
  }, []);

  return (
    <PageWrapper background="stars">
      <HeaderPlaceholder />

      <Grid space="lg">
        <DreamsList headerComponent={ListHeader} />
      </Grid>
    </PageWrapper>
  );
}
