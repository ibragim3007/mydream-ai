import { useTheme } from '@/shared/hooks/useTheme';
import { useVibration } from '@/shared/hooks/useVibration';
import { animationEngine, animationService } from '@/shared/service/animation.service';
import { normalizedSize } from '@/shared/utils/size';
import Entypo from '@expo/vector-icons/Entypo';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import AnimatedWrapper from '../animations/AnimatedWrapper';
import AnimTouchWrapper from '../animations/AnimTouchWrapper';
import Grid from '../grid/Grid';
import Paper from '../layout/Paper';
import Typography from '../typography/Typography';
import WrapIconInPressable from '../wrapper/WrapIconInPressable';

interface InterpretationItemProps {
  title: string;
  text: string;
  image: string;
  isBlocked: boolean;
  description?: string;
}

const ITEM_HEIGHT = 150;

export default function InterpretationItem({ title, text, image, description, isBlocked }: InterpretationItemProps) {
  const colors = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const arrowRotation = useSharedValue(0);
  const imageContainerScale = useSharedValue(1);
  const { vibrateSelection } = useVibration();

  const imageContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imageContainerScale.value }],
  }));

  const arrowStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${arrowRotation.value}deg` }],
  }));

  const toggleExpand = () => {
    vibrateSelection();
    setIsExpanded(prev => !prev);
    arrowRotation.value = withSpring(isExpanded ? 0 : -180, { mass: animationService.animationEngine.MASS });
    imageContainerScale.value = withTiming(isExpanded ? 1 : 1.05);
  };

  return (
    <AnimatedWrapper>
      <AnimTouchWrapper style={{ zIndex: 100 }}>
        <Pressable onPress={toggleExpand}>
          <Animated.View style={[imageContainerStyle]}>
            <Grid height={ITEM_HEIGHT} style={{ borderRadius: colors.styles.borderRadius }}>
              <Image
                // contentFit="cover"
                source={image}
                style={{
                  height: '100%',
                  width: '100%',

                  position: 'absolute',
                  borderRadius: colors.styles.borderRadius,
                }}
              />
              <LinearGradient
                colors={['transparent', 'rgba(0, 0, 0, 0.316)', '#000000be']}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  borderRadius: colors.styles.borderRadius,
                }}
              />

              <Grid
                row
                align="center"
                style={{ alignContent: 'flex-end', overflow: 'hidden', borderRadius: 20 }}
                justfity="space-between"
                flex={1}
                paddingVertical={10}
                wrap
              >
                <Grid
                  row
                  align="center"
                  style={{ alignContent: 'flex-end' }}
                  justfity="space-between"
                  wrap
                  width="100%"
                  paddingVertical={6}
                  paddingHorizontal={20}
                >
                  <Typography weight="bold" variant="headline">
                    {title}
                  </Typography>

                  <WrapIconInPressable backgroundColor={colors.background.disabled}>
                    <Animated.View style={arrowStyle}>
                      <Entypo name="chevron-down" size={26} color={'#fff'} />
                    </Animated.View>
                  </WrapIconInPressable>
                  {description && (
                    <Typography variant="caption-1" weight="medium">
                      {description}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Animated.View>
        </Pressable>
      </AnimTouchWrapper>
      {isExpanded && (
        <Animated.View
          style={{ zIndex: 1, marginHorizontal: normalizedSize(15) }}
          exiting={animationEngine.fadeOutUp(0)}
          entering={animationEngine.fadeInUp(0)}
        >
          <Paper paddingHorizontal={15} style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
            <Typography>{text}</Typography>
          </Paper>
        </Animated.View>
      )}
    </AnimatedWrapper>
  );
}
