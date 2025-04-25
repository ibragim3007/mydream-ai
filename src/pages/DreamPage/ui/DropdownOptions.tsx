import Typography from '@/shared/ui/typography/Typography';
import * as DropdownMenu from 'zeego/dropdown-menu';

export default function DropdownOptions() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Typography>asd</Typography>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label />
        <DropdownMenu.Item key="1">
          <DropdownMenu.ItemTitle>asd</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
        <DropdownMenu.Group>
          <DropdownMenu.Item key="2">asd</DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.CheckboxItem key="3" value={true}>
          <DropdownMenu.ItemIndicator />
        </DropdownMenu.CheckboxItem>
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger key="4" />
          <DropdownMenu.SubContent />
        </DropdownMenu.Sub>
        <DropdownMenu.Separator />
        <DropdownMenu.Arrow />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
