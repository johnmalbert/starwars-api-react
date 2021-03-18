import React, {useState} from 'react'
import { navigate } from '@reach/router';
import { useEffect } from 'react';
import axios from 'axios';


const Home = (props) => {
    // const { prop } = props;
    const [ type, setType ] = useState();
    const [ id, setId] = useState();

    const [ response, setResponse ] = useState();

    //do the search
    useEffect( () => {
        axios.get("https://swapi.dev/api/people/1")
            .then(response => {
                console.log(response);
                setResponse(response.data);
            })
            .catch(() => console.log("Bad news chief"));
    }, [])
    const submitForm = e => {
        e.preventDefault();
        if(type && id){
            navigate(`/search/${type.type}/${id.id}`);
        }else{
            console.log("Not enough info.");
        }
    }
    const changeHandler = e => {
        console.log("Changed the form!");
        setType({
            [e.target.name]: [e.target.value]
        });
    }
    const idHandler = e => {
        console.log("Changed the id");
        setId({
            [e.target.name]: [e.target.value]
        })
    }
    return (
        <div>
            <div className="container p-5 border mt-2 bg-secondary">
                <h1 className="text-light p-5">Find your Star Wars Hero</h1>
                <form onSubmit={submitForm}>
                    <div className="row">
                    <div className="col">

                    <div className="form-group">
                        <p className="text-light">Select resource type:</p>
                        <select name="type" className="form-select form-select-lg mb-3 ml-3 " onChange={changeHandler}>
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
                        <input type="number" className="form-control w-25 m-auto" name="id" placeholder="ID Number" onChange={idHandler}/>
                    </div>
                    </div>

                    </div>
                    <button className="btn btn-primary mt-2">Search</button>
                </form>
            </div>
        </div>
    )
}

export default Home
