import React from 'react';

const App: React.FC = () => {
  let [count, setCount] = React.useState(1);

  React.useEffect(() => {
    console.log(count);
  }, [count]);

  return <div className="App">App</div>;
};

export default App;
