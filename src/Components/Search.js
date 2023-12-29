import React from 'react';


const Search = (props) => {


    return (
        <div className='container' >
            <form className='mt-4 container'>
                <div className="row">
                    <div className="col-md-3 text-start city-name" style={{ zIndex: "888" }}>
                        <label htmlFor='city' className='text-white'>Type City Name</label>
                        <input type="text" className="form-control mt-2" name='city' id='city' value={props.city} onChange={(e) => { props.change(e) }} />
                        <ul className='suggestions-list list-unstyled rounded'>

                            {props.message ? ( <li className='px-2 py-2 border-bottom'>No results found</li> ) : 
                            ( props.suggestions.map((suggestion, index) => (
                                    <li key={index} onClick={() => props.suggestionClickHandler(suggestion)} className='px-2 py-2 border-bottom'>{suggestion}</li>
                                ))
                            )}
                        </ul>
                    </div>
                    <div className='col-md-1 mt-2 mb-2' style={{ zIndex: "888" }}>
                        <br />
                        <h5 className='text-white'>OR</h5>
                    </div>

                    <div className='col-md-3 text-start'>
                        <div className='cordinates-heading' style={{ zIndex: "888" }}>
                            <label htmlFor='codinates' className='text-white'>Get Co-ordinate</label>
                            <button className="btn fa-solid fa-location-crosshairs text-white" onClick={props.getLocation}></button>
                        </div>
                        <div className="input-group mt-1" style={{ zIndex: "2" }}>
                            <span className="input-group-text bg-dark text-white" id="inputGroup-sizing-default">Lat:</span>
                            <input type="number" className="form-control" name='lat' id='lat' value={props.lat} onChange={props.change} aria-describedby="inputGroup-sizing-default" />
                        </div>
                    </div>

                    <div className='col-md-3 text-start'>
                        <br />
                        <div className="input-group mt-md-2" style={{ zIndex: "2" }}>
                            <span className="input-group-text bg-dark text-white" id="inputGroup-sizing-default">Lon:</span>
                            <input type="number" className="form-control" name='lon' id='lon' value={props.lon} onChange={props.change} aria-describedby="inputGroup-sizing-default" />
                        </div>
                    </div>

                    <div className='col-md-1 mt-md-2 mt-3 text-white search-button' style={{ zIndex: "888" }}>
                        <span>Search</span><br />
                        <button className='btn btn-warning fa fa-search py-2 col-md-8 col-lg-8 col-12 mt-md-1 mt-lg-1 mt-2' onClick={props.search} ></button>
                    </div>
                </div>
                <br />
            </form>

        </div>
    )
}

export default Search