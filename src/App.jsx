import { useState } from "react";
import contacts from "./contacts.json";

function App() {
  const [myContacts, setmyContacts] = useState(() => contacts.splice(0, 5));

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <div className="buttons">
        <button
          onClick={() => {
            if (contacts.length > 0) {
              const randActor =
                contacts[Math.floor(Math.random() * contacts.length)];
              setmyContacts([randActor, ...myContacts]);
              const index = contacts.indexOf(randActor);
              contacts.splice(index, 1);
              return contacts;
            }
          }}
        >
          Add random Contact
        </button>
        <button
          onClick={() => {
            const sortByPop = myContacts.sort(
              (a, b) => b.popularity - a.popularity
            );
            setmyContacts([...sortByPop]);
          }}
        >
          Sort by popularity
        </button>
        <button
          onClick={() => {
            const sortByName = myContacts.sort((a, b) => {
              const nameA = a.name.toUpperCase();
              const nameB = b.name.toUpperCase();
              if (nameA < nameB) {
                return -1;
              } else if (nameA > nameB) {
                return 1;
              }
            });
            setmyContacts([...sortByName]);
          }}
        >
          Sort by name
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {myContacts.map((actor) => {
            return (
              <tr key={actor.id}>
                <td>
                  <div className="proPic grow1">
                    <img src={actor.pictureUrl} alt={actor.name}></img>
                  </div>
                </td>
                <td>{actor.name}</td>
                <td>{actor.popularity.toFixed(2)}</td>
                <td>{actor.wonOscar ? "🏆" : ""}</td>
                <td>{actor.wonEmmy ? "🌟" : ""}</td>
                <td>
                  <button
                    onClick={() => {
                      const arrAfterDelete = myContacts.filter(
                        (contact) => contact.id !== actor.id
                      );
                      setmyContacts([...arrAfterDelete]);
                    }}
                  >
                    Delete actor
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
