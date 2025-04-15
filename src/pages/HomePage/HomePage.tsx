import { useAuth } from '@/entities/auth/auth.repository';
import { CreateDreamInput } from '@/module/CreateDreamInput';
import { DreamsList } from '@/module/DreamsList';
import Grid from '@/shared/ui/grid/Grid';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import Typography from '@/shared/ui/typography/Typography';
import { useEffect } from 'react';

export default function HomePage() {
  const { user, initUser } = useAuth();

  useEffect(() => {
    void initUser();
  }, []);

  return (
    <PageWrapper background="stars">
      <Grid space="lg">
        <DreamsList
          headerComponent={() => {
            return (
              <Grid space="lg" marginBottom={10}>
                <Grid>
                  <Typography variant="largeTitle" weight="bold">
                    Hi, {user?.displayName}
                  </Typography>
                  <CreateDreamInput />
                </Grid>
                <Typography weight="extra-bold" variant="title-2">
                  Recently added
                </Typography>
                {/* <ClearCacheButton /> */}
              </Grid>
            );
          }}
        />
      </Grid>
    </PageWrapper>
  );
}
