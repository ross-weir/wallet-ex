import { Icon, Label, Segment } from 'semantic-ui-react';

interface Props {
  value: string[];
  height?: string;
  onRemove?: (idx: number) => void;
  error?: string;
}

// If onRemove is supplied then the words are editable/removable.
function RecoveryPhraseView({
  value,
  onRemove,
  height = '150px',
  error,
}: Props) {
  const removable = !!onRemove;

  const onRemoveFactory = (i: number) =>
    onRemove ? () => onRemove(i) : undefined;

  return (
    <>
      <Segment
        padded
        style={{ minHeight: height, marginBottom: !!error ? 0 : undefined }}
      >
        <Label.Group color={removable ? 'blue' : undefined} size="large">
          {value.map((word, i) => (
            <Label key={`${word}-${i}`}>
              {word}
              {removable && (
                <Icon link name="close" onClick={onRemoveFactory(i)} />
              )}
            </Label>
          ))}
        </Label.Group>
      </Segment>
      {error && <Label pointing="above">{error}</Label>}
    </>
  );
}

export default RecoveryPhraseView;
