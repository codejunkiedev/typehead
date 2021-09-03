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
  const [text, setText] = useState('');
  const [limitExceed, setLimitExceed] = useState('');


  //function for debounce input text to call api after user stop typing
  const debounce = (func: any, wait: any, immediate: any) => {
    var timeout: any;
    return function () {
      var context = arguments;
      var args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  //This function is called when user done typing
  const updateText: UpdateText = debounce(async (text: string) => {
    setHintText("")
    //check if input field is empty
    if (text == "") {
      setSearchedData([]);
      return;
    }

    setIsLoading(true);
    
    //api call
    const search = await fetchSearchText(text)
    setShowSearchedData(true);
    setSearchedData(search ? search : []);
    setText(text);

    //check if api limit exceeded
    if (search == undefined) {
      setIsLoading(false);
      return setLimitExceed("API Limit Exceed Please wait 1 min.")
    } else {
      setLimitExceed("")
    }

    //checking if received search result
    if (search) {
      if (search.length > 0) {

        if (search[0].login.includes(text)) {
          setHintText(search[0].login)
        } else {
          setHintText("")
        }
      } else {
        setHintText("")
      }
    } else {
      setHintText("")
    }

    setIsLoading(false);
  }, 1000, false);

  //function for to check set input focus 
  const updateFocus: UpdateFocus = async (val: boolean) => {
    if (val) {
      setShowSearchedData(true);
    }
    setInputTextFocus(val);
  };

  //function to detect click event outside the item card
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

  //creating ref for click outside the item card
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
        <p className="text-danger">{limitExceed}</p>

        <div className="d-flex justify-content-center mt-5">
          <div className="position-relative card-form ">
            {/* Input Text */}
            <InputText updateText={updateText} isLoading={isLoading} updateFocus={updateFocus} />
            {/* Input Text for auto complete */}
            {inputTextFocus &&
              <input
                className="hint-text"
                type="text"
                value={hintText}
                disabled
              ></input>
              } 
              {/* Item card */}
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
