import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3005/student')
      .then(response => {
        console.log(response.data);
        
        setEntities(response.data)
      }
      )
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Entities</h1>
      <ul>
        {entities.map(entity => (
          <li key={entity.id}>{entity.name}: {entity.description}</li>
        ))}
      </ul>
    </div>
  );
}
