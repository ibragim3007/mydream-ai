import { IGenderItem } from '@/entities/userTags/types/types';
import { useUserTags } from '@/entities/userTags/userTags.repository';
import AgePicker from '@/module/Fields/AgePicker/AgePicker';
import GenderPicker from '@/module/Fields/GenderPicker/GenderPicker';
import GoalsPicker from '@/module/Fields/GoalsPicker/GoalsPicker';
import ZodiacSignPicker from '@/module/Fields/ZodiacSignPicker/ZodiacSignPicker';
import { AgeScreen, EnterNameScreen, GenderChooseScreen, GoalsScreen, WelcomeScreen } from '@/module/OnboardingScreens';
import ZodiacSignScreen from '@/module/OnboardingScreens/ZodiacSign/ZodiacSignScreen';
import { useVibration } from '@/shared/hooks/useVibration';
import { AGE } from '@/shared/types/globalTypes';
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

  const goPrevPage = () => {
    pagerViewRef.current?.setPage(currentPage - 1);
    setCurrentPage(currentPage - 1);
  };

  const router = useRouter();

  const redirectToHomeScreen = () => {
    router.push('/screens/homeScreen');
  };

  const { zodiacSign, age, gender, updateGender, updateZodiacSign, updateAge, updateGoals, goals } = useUserTags();
  const onPressUpdateGender = (gender: IGenderItem) => {
    updateGender(gender);
    goNextPage();
  };
  const preferNotToSayGender = () => {
    updateGender(undefined);
    goNextPage();
  };
  const onPressUpdateAge = (age: AGE) => {
    updateAge(age);
    goNextPage();
  };
  const preferNotToSayAge = () => {
    updateAge(undefined);
    goNextPage();
  };

  return (
    <PageWrapper>
      <PagerView
        ref={pagerViewRef}
        scrollEnabled={false}
        style={{
          flex: 1,
        }}
        initialPage={0}
      >
        <WelcomeScreen key="1" onPressButton={goNextPage} />
        <GenderChooseScreen
          key="2"
          genderPickerComponent={<GenderPicker value={gender} onChange={onPressUpdateGender} />}
          onPressButton={preferNotToSayGender}
        />
        <EnterNameScreen key="3" onPressButton={goNextPage} goPrevPage={goPrevPage} />
        <AgeScreen
          key="4"
          agePickerComponent={<AgePicker onChange={onPressUpdateAge} value={age} />}
          onPressButton={preferNotToSayAge}
          goPrevPage={goPrevPage}
        />
        <ZodiacSignScreen
          key="5"
          zodiacSignComponent={<ZodiacSignPicker onChange={updateZodiacSign} value={zodiacSign} />}
          onPressButton={goNextPage}
          goPrevPage={goPrevPage}
        />
        <GoalsScreen
          key="6"
          goalsPickerComponent={<GoalsPicker onChange={updateGoals} value={goals} />}
          onPressButton={redirectToHomeScreen}
          goPrevPage={goPrevPage}
        />
      </PagerView>
    </PageWrapper>
  );
}
