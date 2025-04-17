import MoonImage from '@/assets/icons/moonImage2.png';
import { useAuth } from '@/entities/auth/auth.repository';
import { AddDreamButton } from '@/module/AddDreamButton';
import { DreamsList } from '@/module/DreamsList';
import { Settings } from '@/module/Settings';
import Grid from '@/shared/ui/grid/Grid';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import Typography from '@/shared/ui/typography/Typography';
import { Image } from 'expo-image';
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
                  <Settings />
                  <Grid space="lg">
                    <Grid space="sm">
                      <Grid space="md" row align="center">
                        <Typography variant="largeTitle" weight="bold">
                          Hi, Dreamer!
                        </Typography>
                        <Image source={MoonImage} style={{ height: 50, width: 50 }} />
                      </Grid>
                      <Typography>
                        The better you describe your dream, the better the interpretation will be.
                      </Typography>
                    </Grid>
                    <AddDreamButton />
                    {/* <CreateDreamInput /> */}
                  </Grid>
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
