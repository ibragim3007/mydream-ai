import { EnterNameScreen, WelcomeScreen } from '@/module/OnboardingScreens';
import ZodiacSignScreen from '@/module/OnboardingScreens/ZodiacSign/ZodiacSignScreen';
import { useVibration } from '@/shared/hooks/useVibration';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import PagerView from 'react-native-pager-view';

export default function OnboardingPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const pagerViewRef = useRef<PagerView>(null);
  const { vibrate } = useVibration();

  const goNextPage = () => {
    pagerViewRef.current?.setPage(currentPage + 1);
    setCurrentPage(currentPage + 1);
    vibrate();
  };

  const router = useRouter();
  const redirectToTabs = () => {
    router.push('/(tabs)');
  };

  return (
    <PageWrapper>
      <PagerView
        ref={pagerViewRef}
        // scrollEnabled={false}
        style={{
          flex: 1,
        }}
        initialPage={0}
      >
        <WelcomeScreen key="1" onPressButton={goNextPage} />
        <EnterNameScreen key="2" onPressButton={goNextPage} />
        <ZodiacSignScreen key="3" />
        {/* <RegistrationScreen key="3" /> */}
      </PagerView>
    </PageWrapper>
  );
}
