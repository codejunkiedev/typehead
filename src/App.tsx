import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { fetchSearchText } from './API';
import InputText from './components/InputText';
import ItemCard from './components/ItemCard';

function App() {
  const [searchedData, setSearchedData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [inputTextFocus, setInputTextFocus] = useState(false)
  const [showSearchedData, setShowSearchedData] = useState(false)
  const [hintText, setHintText] = useState('')
  const [paddingLeft, setPaddingLeft] = useState(0);
  const [text, setText] = useState('');


  const updateText: UpdateText = async (text: string) => {
    setIsLoading(true);
    const search = await fetchSearchText(text);
    setShowSearchedData(true);
    setSearchedData(search ? search : []);
    setText(text);


    if (search) {
      if (search.length > 0) {

        if (search[0].login.includes(text)) {
          setHintText(search[0].login.replace(text, ""))
          setPaddingLeft(text.length * 7.5)
        }else{
          setHintText("")
        }
      }else{
        setHintText("")
      }
    }else{
      setHintText("")
    }

    setIsLoading(false);
  };

  const updateFocus: UpdateFocus = async (val: boolean) => {
    if (val) {
      setShowSearchedData(true);
    }
    setInputTextFocus(val);
  };

  const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowSearchedData(false);
          updateFocus(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div className="App">
      <div className="container">
        <div className="align-items-center justify-content-center row mt-5">
          <div className="align-items-center d-flex justify-content-center">
            <h1 className="title">typeahead</h1>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-5">
          <div className="position-relative card-form ">
            <InputText updateText={updateText} isLoading={isLoading} updateFocus={updateFocus} />
            {inputTextFocus &&
              <input
                style={{ paddingLeft: paddingLeft }}
                className="hint-text text-grey"
                type="text"
                value={hintText}
                disabled
              ></input>}
            {(searchedData.length > 0 && showSearchedData) &&
              <div ref={wrapperRef} className="item-card">
                {searchedData.map((val: SearchResult) => (
                  <ItemCard key={val.id} item={val} text={text} />
                ))}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
