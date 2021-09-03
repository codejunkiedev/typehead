import React, { useState } from 'react';

type Props = {
    item: SearchResult;
    text:string
}

const ItemCard: React.FunctionComponent<Props> = ({ item,text }) => {
    const { login, avatar_url, html_url } = item
    const handleOpenProfile = (url: string) => {
        window.open(url);
    }
    return (
        <a href="#" className="text-decoration-none" onClick={() => handleOpenProfile(html_url)} >
            <div className="item-card-wrapper">
                <div className="align-items-center card-body w-100">
                    <img className="user-img" src={avatar_url} />
                    <span className="name-bold text-black-bold">{text}</span>
                    <span className="name text-grey">{(login).toLowerCase().replace(text,"")}</span>
                </div>
            </div>
        </a>
    )

}

export default ItemCard;