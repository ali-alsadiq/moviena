import { useState, useEffect } from 'react';
import { API_KEY } from '../globals/globals';
import { useLocation } from 'react-router-dom';
import Movies from '../components/Movies';

function PageSinglePerson() {
  const [personData, setData] = useState('');

  let location = useLocation();
  const id = location.state.id;
  console.log(location);

  useEffect(() => {
    const fetchPerson = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}`
      );
      const data = await res.json();
      console.log(data);
      setData(data);
    };
    fetchPerson();
  }, [id]);

  return (
    <div>
      <div className="side-bar">
        <div>Personal Info</div>
        <div>Known For</div>
        <div>{personData.known_for_department}</div>
        <div>Gender</div>
        <div>{personData.gender === 2 ? 'Male' : 'Female'}</div>
        <div>Birthday</div>
        <div>{personData.birthday}</div>

        <div>Also Known As</div>
        <div>
          {personData.also_known_as.map((name) => (
            <div>{name}</div>
          ))}
        </div>
      </div>
      <p>
        <h2>Bigraphy</h2>
        {personData.biography !== null
          ? personData.biography
          : `We don't have bigraphy for ${personData.name}`}
      </p>
      <div>Known for </div>
    </div>
  );
}

export default PageSinglePerson;
