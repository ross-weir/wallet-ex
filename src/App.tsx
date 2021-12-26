import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'semantic-ui-react';
import { initErgo } from './ergo';
import { TestComp } from './TestComp';

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initErgo().then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <div>
        <Button onClick={() => navigate('/wallets')}>Go to wallet list</Button>
      </div>
      <TestComp></TestComp>
    </>
  );
}

export default App;
