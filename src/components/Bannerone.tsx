import React from 'react';


interface BanneroneProps {
    title: String
}

function Bannerone(props: BanneroneProps){
    return(
        <h1>{props.title}</h1>
    )
}

export default Bannerone;
