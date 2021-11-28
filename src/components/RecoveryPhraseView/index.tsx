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
function RecoveryPhraseView({ words, onRemove, height = '100px' }: Props) {
  const onRemoveFactory = (i: number) =>
    onRemove ? () => onRemove(i) : undefined;

  return (
    <Card>
      <CardSection>
        <Box height={height}>
          <Inline spacing="small">
            {words.map((word, i) => (
              // I _think_ each word in the phrase is unique so lets try this for now
              <Tag key={word} onRemove={onRemoveFactory(i)}>
                {word}
              </Tag>
            ))}
          </Inline>
        </Box>
      </CardSection>
    </Card>
  );
}

export default RecoveryPhraseView;
