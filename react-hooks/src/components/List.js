import React from 'react';

const list = props => {
    console.log('Rendering the list!!!')
    return <ul>
        {props.items.map(item => 
            <li 
                onClick = {props.onClick.bind(this, item.id)}
                key = {item.id}>{item.name}</li>)}
    </ul>
}

export default list;