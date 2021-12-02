import { Icon, Label, Segment } from 'semantic-ui-react';

interface Props {
  words: string[];
  height?: string;
  onRemove?: (idx: number) => void;
}

// If onRemove is supplied then the words are editable/removable.
function RecoveryPhraseView({ words, onRemove, height = '150px' }: Props) {
  const removable = !!onRemove;

  const onRemoveFactory = (i: number) =>
    onRemove ? () => onRemove(i) : undefined;

  return (
    <Segment padded style={{ minHeight: height }}>
      <Label.Group color={removable ? 'blue' : undefined} size="large">
        {words.map((word, i) => (
          <Label key={word}>
            {word}
            {removable && (
              <Icon link name="close" onClick={onRemoveFactory(i)} />
            )}
          </Label>
        ))}
      </Label.Group>
    </Segment>
  );
}

export default RecoveryPhraseView;
