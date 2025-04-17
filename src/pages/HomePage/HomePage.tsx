import { useAuth } from '@/entities/auth/auth.repository';
import { CreateDreamInput } from '@/module/CreateDreamInput';
import { DreamsList } from '@/module/DreamsList';
import { Settings } from '@/module/Settings';
import MoonImage from '@/assets/icons/moonImage2.png';
import Grid from '@/shared/ui/grid/Grid';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import Typography from '@/shared/ui/typography/Typography';
import { useEffect } from 'react';
import { Image } from 'expo-image';

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
                  <Grid space="md">
                    <Grid>
                      <Grid space="md" row align="center">
                        <Typography variant="largeTitle" weight="bold">
                          Hi, Dreamer!
                        </Typography>
                        <Image source={MoonImage} style={{ height: 50, width: 50 }} />
                      </Grid>
                      <Typography weight="light">
                        The better you describe your dream, the better the interpretation will be.
                      </Typography>
                    </Grid>
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
