import { Block, renderDOM, registerComponent }  from '../../core';
import {SignIn} from "./sign-in";

import Button from "../../components/button";
import Input from "../../components/input";

registerComponent(Button);
registerComponent(Input);

document.addEventListener("DOMContentLoaded", () => {
    renderDOM(new SignIn);
});