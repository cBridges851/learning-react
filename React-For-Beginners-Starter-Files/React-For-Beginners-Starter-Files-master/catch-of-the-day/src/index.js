import React from "react";
import { render } from "react-dom";
import StorePicker from "./components/StorePicker";
import App from "./components/App";
import "./css/style.css";

render(<App></App>, document.querySelector("#main"))
// render(<StorePicker></StorePicker>, document.querySelector("#main"))