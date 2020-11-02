import React, {useState, useEffect} from 'react';



function MyComponent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("http://localhost:9090/api/v1")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

        //<button className='fetch button' onClick={useEffect}>
          //Fetch Data
        //</button>
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
      <button className='fetch button' onClick={() => setItems}>
        Fetch button
      </button>

      <div className='Items'>
      <ul>
        {items.map(item => (
          <li key={item.greet}>
            {item.greet}
          </li>
        ))}
      </ul>
     </div>
     </>
    );
  }
}
export default MyComponent