import { TouchableOpacity } from 'react-native';

export function withPressable<T>(Component: React.ComponentType<T>) {
  return function PressableComponent(props: T & { onPress?: () => void }) {
    return (
      <TouchableOpacity onPress={props.onPress}>
        <Component {...props} />
      </TouchableOpacity>
    );
  };
}
