import { useTheme } from '@/shared/hooks/useTheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import { Modal, Pressable, ScrollView } from 'react-native';
import Button from '../buttons/Button';
import Grid, { GridProps } from '../grid/Grid';
import Paper from '../layout/Paper';
import Typography from '../typography/Typography';
import ModalContainer from '../wrapper/ModalContainer';
import AntDesign from '@expo/vector-icons/AntDesign';

interface CardPaperProps extends GridProps {
  title: string;
  date?: string;
  text: string;
  extendedText?: string;
}

export default function CardPaper({ title, date, text, extendedText, ...props }: CardPaperProps) {
  const colors = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const onToggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Paper color="#ffffff" paddingHorizontal={8} paddingVertical={10} {...props}>
      <Grid space="md">
        <Grid row justfity="space-between" align="center">
          <Typography color="white" weight="bold">
            {title}
          </Typography>
          <Grid row space="sm" align="center">
            {date && (
              <>
                <MaterialIcons name="access-time-filled" size={18} color={colors.text.disabled} />
                <Typography variant="caption-1" color="disabled">
                  {date}
                </Typography>
              </>
            )}
          </Grid>
        </Grid>
        <Typography numberOfLines={10} color="white">
          {text}
        </Typography>
        {/* <Button onPress={onToggleModal} variant="text">
          Read original
        </Button> */}
      </Grid>
      <Grid flex={1}>
        <Modal onRequestClose={onToggleModal} visible={isOpen} animationType="slide" transparent>
          <ModalContainer onClose={onToggleModal}>
            <Grid marginHorizontal={5}>
              <Paper style={{ maxHeight: 580 }} color="#fff" paddingVertical={0}>
                <Grid height={40}>
                  <Typography textAlign="center" weight="bold" variant="title-3" color="white">
                    Original input
                  </Typography>
                  <Grid style={{ position: 'absolute', right: 10 }}>
                    <AntDesign name="close" size={24} color={colors.text.white} />
                  </Grid>
                </Grid>
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                  <Pressable>
                    <Grid space="md">
                      <Typography color="white">{extendedText}</Typography>
                    </Grid>
                  </Pressable>
                </ScrollView>
              </Paper>
            </Grid>
          </ModalContainer>
        </Modal>
      </Grid>
    </Paper>
  );
}
