import { PropsWithChildren } from 'react';
import Grid from '../grid/Grid';

interface ModalContainerProps extends PropsWithChildren {
  onClose?: () => void;
}

export default function ModalContainer({ children, onClose }: ModalContainerProps) {
  return (
    <Grid flex={1} align="center" justfity="center" color="rgba(0, 0, 0, 0.5)">
      {children}
    </Grid>
  );
}
