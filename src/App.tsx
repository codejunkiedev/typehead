import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { fetchSearchText } from './API';
import InputText from './components/InputText';
import ItemCard from './components/ItemCard';
import * as images from './helper/images';

function App() {
  const [searchedData, setSearchedData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [inputTextFocus, setInputTextFocus] = useState(false)
  const [hintText, setHintText] = useState('')
  const [paddingLeft, setPaddingLeft] = useState(0);


  const updateText: UpdateText = async (text: string) => {
    setIsLoading(true);
    const search = await fetchSearchText(text);
    setSearchedData(search ? search : []);
    if(search)
    {
      if(search[0].login.includes(text))
      {
        setHintText(search[0].login.replace(text,""))
        setPaddingLeft(text.length*7.5)
      }
    }
    setIsLoading(false);
  };

  const updateFocus: UpdateFocus = async (val:boolean) => {
    setInputTextFocus(val);
  };

  const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setInputTextFocus(false);
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
            <img className="github-logo" src={images.githublogo} />
            <h1 className="title">typeahead</h1>
          </div>
        </div>
        {/* <div className="tagline">
          a flexible JavaScript library that provides a strong foundation for building robust typeaheads
        </div> */}

        <div className="d-flex justify-content-center mt-5">
          <div className="position-relative card-form ">
            <InputText updateText={updateText} isLoading={isLoading} updateFocus={updateFocus} />
            {inputTextFocus &&
            <input
              style={{paddingLeft:paddingLeft}}
                className="hint-text text-color"
                 type="text"
                 value={hintText}
                 disabled
             ></input>}
            {(searchedData.length > 0 && inputTextFocus) &&
              <div ref={wrapperRef} className="item-card">
                {searchedData.map((val: SearchResult) => (
                  <ItemCard key={val.id} item={val} />
                ))}
              </div>
            }
            {/* <div className="links">
              <a href="#" className="links text-decoration-none">
                or see examples
              </a>
            </div> */}
          </div>
        </div>
        {/* <div>
          <div>
            <a className="btn-download text-decoration-none" href="#"><strong>download</strong> v0.0.1</a>
          </div>
          <div className="links mt-4">
            project & docs on GitHub · changelog
          </div>
        </div>
        <div className="d-block justify-content-around row mt-5">
          <span className="links">follow</span>
          <span className="links">follow</span>
          <span className="links">follow</span>
          <span className="links">follow</span>
        </div> */}
      </div>
    </div>
  );
}

export default App;
