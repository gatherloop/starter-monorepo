import { getAssetSrc } from '../../../utils';
import { Button, Image, Paragraph, YStack } from 'tamagui';

type ErrorViewVariant =
  | { tag: 'general' }
  | { tag: 'fetching-error'; onRetryButtonPress: () => void }
  | { tag: 'empty-data' };

type ErrorViewContent = {
  title: string;
  description?: string;
  image: {
    src: string;
    width: string | number;
    height: string | number;
  };
  button?: {
    text: string;
    onPress: () => void;
  };
};

const createContent = (variant: ErrorViewVariant): ErrorViewContent => {
  switch (variant.tag) {
    case 'general':
      return {
        title: 'Terjadi Kesalahan',
        image: {
          src: getAssetSrc('images/Error'),
          width: 140,
          height: 102,
        },
      };
    case 'fetching-error':
      return {
        title: 'Ups, Terjadi Kesalahan Saat Mengambil Data',
        description: 'Silahkan coba lagi dengan menekan tombol di bawah',
        button: {
          text: 'Coba Lagi',
          onPress: variant.onRetryButtonPress,
        },
        image: {
          src: getAssetSrc('images/Error'),
          width: 140,
          height: 102,
        },
      };
    case 'empty-data':
      return {
        title: 'Data Kosong',
        description: 'Saat ini masih belum ada data yang tersedia',
        image: {
          src: getAssetSrc('images/Empty'),
          width: 140,
          height: 102,
        },
      };
  }
};

export interface ErrorViewProps {
  variant: ErrorViewVariant;
}

export function ErrorView({ variant }: ErrorViewProps) {
  const { title, image, button, description } = createContent(variant);
  return (
    <YStack space="$2" justifyContent="center" alignItems="center">
      <Image {...image} />
      <Paragraph fontSize="$7" fontWeight="700">
        {title}
      </Paragraph>
      {description && <Paragraph>{description}</Paragraph>}
      {button && (
        <Button theme="blue" onPress={button.onPress}>
          {button.text}
        </Button>
      )}
    </YStack>
  );
}
