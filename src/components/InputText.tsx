import React, { useState } from 'react';
import loader from '../images/loader.gif';

type Props = {
    updateText: UpdateText;
    isLoading:Boolean;
    updateFocus:UpdateFocus;
}

const InputText: React.FunctionComponent<Props> = ({ updateText,isLoading,updateFocus }) => {
    const [text, setText] = useState('');
    return (
        <form className="form">
            <div className="input-text-wrapper">
                <div className="bg-white w-100 border-radius-10">

             <input
                className="input-text"
                type="text"
                placeholder="Enter Name"
                 value={text}
                 onFocus={()=>updateFocus(true)}
                 onBlur={()=>updateFocus(false)}
                 onChange={e => {
                     setText(e.target.value);
                     updateText(e.target.value);
                    }}
                    ></input>
                    </div>
                {isLoading &&
                <img className="loader" src={loader}/>
                }
             </div>
        </form>
    )

}

export default InputText;