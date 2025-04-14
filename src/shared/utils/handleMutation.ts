import { Inform } from '../service/logger.service/logger.service';

export async function handleMutation<T>(
  mutationFn: () => Promise<T>,
  successMessage?: string,
  error?: { errorMessage?: string; disableError?: boolean },
): Promise<T | undefined> {
  try {
    const res = await mutationFn();
    if (res && successMessage) Inform.success(successMessage);
    return res;
  } catch (e) {
    console.error(e);
    if (error?.disableError) {
      return;
    }

    Inform.error(e || error?.errorMessage);
  }
}
