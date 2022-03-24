import { ERG_DECIMAL_PLACES } from '../../ergo';
import { insertDecimal } from '../../utils/fmt';
import SensitiveComponent from '../SensitiveComponent';

export interface ErgDisplayProps {
  balance: number;
  trimTrailingZeros?: boolean;
}

function ErgDisplay({ balance, trimTrailingZeros = true }: ErgDisplayProps) {
  return (
    <SensitiveComponent>
      <span style={{ fontFamily: 'Fira Code, monospace' }}>
        {balance > 0
          ? `${insertDecimal(
              balance,
              ERG_DECIMAL_PLACES,
              trimTrailingZeros,
            )} ERG`
          : '-'}
      </span>
    </SensitiveComponent>
  );
}

export default ErgDisplay;
