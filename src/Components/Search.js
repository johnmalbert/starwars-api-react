import React, {useEffect, useState} from 'react';
import { navigate, Link } from '@reach/router';
import axios from 'axios';

const Search = props => {
    const {type, id} = props;
    const [ response, setResponse ] = useState();
    const [newId, setNewId] = useState();
    const [newType, setNewType] = useState();


    const submitForm = e => {
        e.preventDefault();
        if(newType && newId){
            fetch(`https://swapi.dev/api/${newType.newType}/${newId.newId}`)
                .then(response => {return response.json();}).then(response => setResponse(response)).catch(err=>console.log(err));
            navigate(`/search/${newType.newType}/${newId.newId}`);
        }else{
            console.log("No data entered");
        }
    }
    const changeHandler = e => {
        console.log("Changed the form!");
        setNewType({
            [e.target.name]: [e.target.value]
        });
    }
    const idHandler = e => {
        console.log("Changed the id");
        setNewId({
            [e.target.name]: [e.target.value]
        })
    }
    //do the search
    useEffect( () => {
        axios.get(`https://swapi.dev/api/${type}/${id}`)
            .then(response => {
                console.log(response.data);
                setResponse(response.data);
            })
            .catch(() => console.log("Bad news chief"));
    }, []);
    return (
        <div>
            <div className="container p-5 border mt-2 bg-dark">
                <Link to="/">Clear Results</Link>
                <h1 className="text-light p-5">Find your Star Wars Hero</h1>
                <form onSubmit={submitForm}>
                    <div className="row">
                    <div className="col">

                    <div className="form-group">
                        <p className="text-light">Select resource type:</p>
                        <select name="newType" className="form-select form-select-lg mb-3 ml-3 " onChange={changeHandler}>
                            <option selected>Click to select</option>
                            <option value="people">People</option>
                            <option value="planets">Planets</option>
                            <option value="starships">Starships</option>
                        </select>
                    </div>
                    </div>
                    <div className="col">

                    <div className="form-group">    
                        <p className="text-light">Enter an ID number:</p>
                        <input type="number" className="form-control w-25 m-auto" name="newId" placeholder="ID Number" onChange={idHandler}/>
                    </div>
                    </div>

                    </div>
                    <button className="btn btn-primary mt-2">Search</button>
                </form>
            </div>

            <div className="container p-5 bg-secondary text-left">
                <h1 className="text-center text-light border mb-5">Search Results:</h1>
                <div className="border p-5">
                {
                    response ? 
                        type === "people" ? 
                        <div>
                            <h1>{id}: {response.name}</h1>
                            <h3><strong>Birth Year: </strong>{response.birth_year}</h3>
                            <h3><strong>Gender: </strong>{response.gender}</h3>
                            <h3><strong>Home World: </strong><Link to="/search/planets/1">Home World</Link></h3>
                            <h3><strong>HEIGHT: </strong>{response.height}</h3>
                            <h3><strong>MASS: </strong>{response.mass}</h3>
                            <h3><strong>SKIN COLOR: </strong>{response.skin_color}</h3>
                            <h3><strong>MOVIE APPEARANCES: </strong>{response.films.length}</h3>
                        </div> :
                        type === "planets" ?
                        <div>
                            <h1>{id}: {response.name}</h1>
                            <h3><strong>GRAVITY: </strong>{response.gravity}</h3>
                            <h3><strong>POPULATION: </strong>{response.population}</h3>
                            <h3><strong>DIAMETER: </strong>{response.diameter}</h3>
                            <h3><strong>TERRAIN: </strong>{response.terrain}</h3>
                        </div> :
                        type === "starships" ?
                        <div>
                            <h1>{id}: {response.name}</h1>
                            <h3>MANUFACTURER: {response.manufacturer}</h3>
                            <h3>COST (IN CREDITS): {response.cost_in_credits}</h3>
                            <h3>LENGTH: {response.length}</h3>
                        </div> :
                        <img src="https://www.meme-arsenal.com/memes/52577612a290566287f2273992fa918e.jpg" alt="These aren't the droids you're looking for"/>:
                    type !== "planets" ?
                    <div><img src="https://www.meme-arsenal.com/memes/52577612a290566287f2273992fa918e.jpg" alt="These aren't the droids you're looking for"/></div>:
                    type !== "people" ?
                    <div><img src="https://www.meme-arsenal.com/memes/52577612a290566287f2273992fa918e.jpg" alt="These aren't the droids you're looking for"/></div>
                    :
                    ""
                }
                </div>
            </div>
        </div>
    )
}

export default Search
