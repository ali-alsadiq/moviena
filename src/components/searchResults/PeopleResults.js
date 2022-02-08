import { Link, useHistory } from 'react-router-dom';

function PeopleResults({ people }) {
  console.log(people.results);

  let history = useHistory();
  function handleSearch(person) {
    const id = person.id;
    const name = person.name.replace(' ', '_');
    history.push({
      pathname: `/person/${name}`,
      state: { id },
    });
  }
  return (
    <div>
      {people.results !== null &&
        people.results.map((actor) => {
          return (
            <div className="person-card" onClick={() => handleSearch(actor)}>
              {actor.profile_path !== null ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                  alt={actor.name}
                />
              ) : (
                <div>No picture available</div>
              )}
              <h3>{actor.charactor}</h3>
              <h3>{actor.name}</h3>
              <h3>{actor.known_for_department}</h3>
            </div>
          );
        })}
    </div>
  );
}

export default PeopleResults;
