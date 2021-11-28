import Card, { CardSection } from '@kiwicom/orbit-components/lib/Card';
import Inline from '@kiwicom/orbit-components/lib/Inline';
import Box from '@kiwicom/orbit-components/lib/Box';
import Tag from '@kiwicom/orbit-components/lib/Tag';

interface Props {
  words: string[];
  height?: string;
  onRemove?: (idx: number) => void;
}

// If onRemove is supplied then the words are editable/removable.
function RecoveryPhraseView({ words, onRemove, height }: Props) {
  const onRemoveFactory = (i: number) =>
    onRemove ? () => onRemove(i) : undefined;

  return (
    <Card>
      <CardSection>
        <Box height={height}>
          <Inline spacing="small">
            {words.map((word, i) => (
              <Tag onRemove={onRemoveFactory(i)}>{word}</Tag>
            ))}
          </Inline>
        </Box>
      </CardSection>
    </Card>
  );
}

export default RecoveryPhraseView;
