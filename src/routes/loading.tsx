// Poll backend for loading state
// The backend _could_ emit an event but we might get race conditions
// Such as the backend loading before the frontend is initialized
function Loading() {
  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}

export default Loading;
