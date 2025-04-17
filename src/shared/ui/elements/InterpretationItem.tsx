import { animationEngine, animationService } from '@/shared/service/animation.service';
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
import { normalizedSize } from '@/shared/utils/size';

interface InterpretationItemProps {
  title: string;
  text: string;
  image: string;
  isBlocked: boolean;
}

const ITEM_HEIGHT = normalizedSize(125);

export default function InterpretationItem({ title, text, image, isBlocked }: InterpretationItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const arrowRotation = useSharedValue(0);
  const imageContainerScale = useSharedValue(1);

  const imageContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imageContainerScale.value }],
  }));

  const arrowStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${arrowRotation.value}deg` }],
  }));

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
    arrowRotation.value = withSpring(isExpanded ? 0 : -180, { mass: animationService.animationEngine.MASS });
    imageContainerScale.value = withTiming(isExpanded ? 1 : 1.05);
  };

  return (
    <AnimatedWrapper>
      <AnimTouchWrapper>
        <Pressable onPress={toggleExpand}>
          <Animated.View style={[imageContainerStyle]}>
            <Grid height={ITEM_HEIGHT} style={{ backgroundColor: 'red', borderRadius: 20 }}>
              <Image
                contentFit="cover"
                source={image}
                style={{ height: ITEM_HEIGHT + 10, width: '100%', position: 'absolute', borderRadius: 20 }}
              />
              <LinearGradient
                colors={['transparent', '#00000023', '#000000c2']}
                style={{ width: '100%', height: ITEM_HEIGHT + 10, position: 'absolute', borderRadius: 20 }}
              />
              <Grid
                row
                align="center"
                style={{ alignContent: 'flex-end' }}
                justfity="space-between"
                height="100%"
                wrap
                paddingVertical={20}
                paddingHorizontal={20}
              >
                <Typography weight="bold" variant="headline">
                  {title}
                </Typography>
                <Animated.View style={arrowStyle}>
                  <Entypo name="chevron-down" size={26} color={'#fff'} />
                </Animated.View>
              </Grid>
            </Grid>
          </Animated.View>
        </Pressable>
      </AnimTouchWrapper>
      {isExpanded && (
        <Animated.View
          style={{ zIndex: -1, marginHorizontal: 15 }}
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
