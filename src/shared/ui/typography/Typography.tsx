import { StyleSheet, Text, TextProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { fontsWeights, getColorsStyles, TypographyProps, TypographyStyles } from '../../styles/typography/typography';
import { forwardRef } from 'react';

const Typography = forwardRef<Text, TypographyProps>((props, ref) => {
  const colors = useTheme();

  const fontStyles = fontsWeights[props.weight || 'regular'];
  const typographyStyle = TypographyStyles[props.variant || 'body'];
  const colorStyle: TextProps['style'] = getColorsStyles(colors)[props.color || 'primary'];

  const stylesText = StyleSheet.flatten([
    props.textAlign && { textAlign: props.textAlign },
    typographyStyle,
    fontStyles,
    colorStyle,
    props.style,
  ]);

  return (
    <Text {...props} ref={ref} style={stylesText}>
      {props.children}
    </Text>
  );
});

export default Typography;
