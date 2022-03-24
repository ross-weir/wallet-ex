/**
 * Taken from: https://stackoverflow.com/a/70121934
 *
 * Using this to prevent user navigation. For example on the syncing blockchain view.
 *
 * Simply use `useBlocker();` to block all navigation.
 */
import { useCallback,useContext, useEffect } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

export function useBlocker(blocker?: any, when: boolean = true) {
  const { navigator } = useContext(NavigationContext) as any;

  useEffect(() => {
    if (!when) return;

    const unblock = navigator.block((tx: any) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          // Automatically unblock the transition so it can play all the way
          // through before retrying it. TODO: Figure out how to re-enable
          // this block if the transition is cancelled for some reason.
          unblock();
          tx.retry();
        },
      };

      if (blocker) {
        blocker(autoUnblockingTx);
      }
    });

    return unblock;
  }, [navigator, blocker, when]);
}

export function usePrompt(message: string, when = true) {
  const blocker = useCallback(
    (tx) => {
      // eslint-disable-next-line no-alert
      if (window.confirm(message)) tx.retry();
    },
    [message],
  );

  useBlocker(blocker, when);
}
