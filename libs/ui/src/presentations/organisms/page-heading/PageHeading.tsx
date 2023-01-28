import { getAssetSrc } from 'libs/ui/src/utils';
import { Image, XStack, YStack, useThemeName, Paragraph } from 'tamagui';

interface PageHeadingProps {
  title: string;
  hasBackIcon?: boolean;
  onBackIconPress?: () => void;
  rightItem: React.ReactNode;
}

const backIconSrc = {
  light: getAssetSrc('icons/BackIconBlack'),
  dark: getAssetSrc('icons/BackIconWhite'),
};

export const PageHeading = (props: PageHeadingProps) => {
  const theme = useThemeName();

  return (
    <XStack
      paddingVertical="$5"
      paddingHorizontal="$3.5"
      backgroundColor={'$accent'}
      justifyContent="space-between"
      alignItems="center"
    >
      <XStack justifyContent="space-between" alignItems="center" space="$3.5">
        {props.hasBackIcon && (
          <YStack onPress={props.onBackIconPress} cursor="pointer">
            <Image
              src={theme === 'light' ? backIconSrc.light : backIconSrc.dark}
              width="24px"
              height="24px"
            />
          </YStack>
        )}
        <Paragraph fontSize="$7" fontWeight={'700'}>
          {props.title}
        </Paragraph>
      </XStack>
      {props.rightItem}
    </XStack>
  );
};

export default PageHeading;
