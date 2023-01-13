import { useState } from "react";
import "./InputForm.css";

const InputForm = (props) => {
  const [userInput, setUserInput] = useState({
    enteredTitle: "",
    enteredOpeningText: "",
    enteredReleaseDate: "",
  });

  const titleChangeHandler = (e) => {
    setUserInput(() => {
      return {
        ...userInput,
        enteredTitle: e.target.value,
      };
    });
  };
  const openTextChangeHandler = (e) => {
    setUserInput(() => {
      return {
        ...userInput,
        enteredOpeningText: e.target.value,
      };
    });
  };
  const releaseDateChangeHandler = (e) => {
    setUserInput(() => {
      return {
        ...userInput,
        enteredReleaseDate: e.target.value,
      };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const newMovieObj = {
      title: userInput.enteredTitle,
      openingText: userInput.enteredOpeningText,
      releaseDate: userInput.enteredReleaseDate,
    };
    props.onAdd(newMovieObj);
    setUserInput({
      enteredTitle: "",
      enteredOpeningText: "",
      enteredReleaseDate: "",
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <label>Title</label>
      <input type="text" onChange={titleChangeHandler} value={userInput.enteredTitle}/>
      <label>Opening text</label>
      <input type="text" onChange={openTextChangeHandler} value={userInput.enteredOpeningText}/>
      <label>Release date</label>
      <input type="text" onChange={releaseDateChangeHandler} value={userInput.enteredReleaseDate}/>
      <button type="submit">
        Add Movie
      </button>
    </form>
  );
};

export default InputForm;
