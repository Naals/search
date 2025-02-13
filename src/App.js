import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect, useState} from "react";

function App() {
    const [characters, setCharacters] = useState([]);
    const [search, setSearch] = useState("");

    const api = "https://rickandmortyapi.com/api/character";

    useEffect(() => {
        fetch(api)
            .then(response => response.json())
            .then(data => setCharacters(data.results))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    console.log(characters);

    const filteredCharacters = characters.filter(character =>
        search.length > 2 ? character.name.toLowerCase().includes(search.toLowerCase()) : false
    );

    return (
        <div className="container mt-5">

            <div className="search-container mx-auto">
                <input
                    type="text"
                    className="form-control search-input"
                    placeholder="Search characters..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <p className="text-center mt-3">Found characters: {filteredCharacters.length}</p>
            </div>


            {search.length > 2 && (
                <div className="row justify-content-center">
                    {filteredCharacters.map(character => (
                        <div key={character.id} className="col-md-4 mb-3">
                            <div className="card character-card">
                                <div className="d-flex flex-column w-100">
                                    <h5 className="card-title mb-5"
                                        style={{fontFamily: 'FiraSans'}}>{character.name}</h5>

                                    <div className='d-flex justify-content-between'>
                                        <p className={`m-0 mt-3 status ${character.status.toLowerCase()}`}>
                                            <strong className='fw-light'
                                                    style={{color: 'gray'}}>Status:</strong> {character.status}
                                        </p>
                                        <p className="m-0 mt-3 created">
                                            <strong>Created:</strong> {new Date(character.created).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;

