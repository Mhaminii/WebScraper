import React from 'react';
import ReactLoading from 'react-loading';
 

const Loader = () => {
    return (
        <div className="d-flex justify-content-center m-5">
             <ReactLoading className="m-5" type='spinningBubbles' color='#0e8ce4' height={'10%'} width={'10%'} />
        </div>
    )
}

export default Loader
