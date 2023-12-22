import React from 'react';

export default function Recent(props) {
    let data;
    if (props.recent == null) {
        data = ""
    }else{
        data = props.recent.map((recentData, id) => {
                return <li key={id} onClick={() => props.research(recentData.lat, recentData.lon)}>{recentData.city}</li>
            }
        )
    }

    
  return (
    <div className='recent-box card box-color'>
        <div className='card-body'>
        <h3 className='card-header mb-2 text-white'>Recent</h3>
        <button type='button' className='btn btn-danger clear-btnn' onClick={props.deleteRecents}>Clear Recents &nbsp;<i className='fa fa-trash'></i></button>
        <ul className='list-unstyled mt-3'>
        {data}
        </ul>
        </div>
    </div>
  )
}
