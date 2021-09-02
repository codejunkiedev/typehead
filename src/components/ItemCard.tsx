import React, { useState } from 'react';

type Props = {
    item: SearchResult;
}

const ItemCard: React.FunctionComponent<Props> = ({ item }) => {
    const {login,avatar_url,html_url } = item
    const [text, setText] = useState('');
    const handleOpenProfile = (url:string)=>{
        window.open(url);
    }
    return (
        <div className="item-card-wrapper">
            <a href="#" className="text-decoration-none" onClick={()=>handleOpenProfile(html_url)} >
            <div className="align-items-center card-body">
                <img className="user-img" src={avatar_url} />
                <span className="name text-black">{login}</span>
            </div>
            </a>
        </div>
    )

}

export default ItemCard;