import { useAuth } from '@/entities/auth/auth.repository';
import { DreamsList } from '@/module/DreamsList';
import HeaderPlaceholder from '@/shared/ui/elements/HeaderPlaceholder';
import Grid from '@/shared/ui/grid/Grid';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import { useEffect } from 'react';
import ListHeader from './ListHeader';

export default function HomePage() {
  const { initUser } = useAuth();

  useEffect(() => {
    void initUser();
    // if (!__DEV__) {
    // setTimeout(() => {
    //   Superwall.shared.register({
    //     placement: PLACEMENTS.campaign_trigger,
    //   });
    // }, 10 * 1000);
    // }
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
