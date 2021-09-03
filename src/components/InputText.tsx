import React, { useState } from 'react';
import * as images from '../helper/images';

type Props = {
    updateText: UpdateText;
    isLoading: Boolean;
    updateFocus: UpdateFocus;
}

const InputText: React.FunctionComponent<Props> = ({ updateText, isLoading, updateFocus }) => {
    const [text, setText] = useState('');
    return (
        <form className="form">
            <div className="input-text-wrapper">
                <div className="bg-white w-100 border-radius-10 d-flex align-items-center">

                    <input
                        className="input-text"
                        type="text"
                        placeholder="Enter username"
                        value={text}
                        onFocus={() => updateFocus(true)}
                        onBlur={() => updateFocus(false)}
                        onChange={e => {
                            setText((e.target.value).toLowerCase());
                            updateText((e.target.value).toLowerCase());
                        }}
                    ></input>
                    {isLoading &&
                        <img className="loader" src={images.loader} />
                    }
                </div>
            </div>
        </form>
    )

}

export default InputText;