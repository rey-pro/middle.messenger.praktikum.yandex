import { renderDOM, registerComponent }  from '../../core';
import {SignIn} from "./sign-in";

import Button from "../../components/button";
import Input from "../../components/input";
import InputField from "../../components/input-field";
import InputError from "../../components/input-error";

registerComponent(Button, 'Button');
registerComponent(Input, 'Input');
registerComponent(InputField, 'InputField');
registerComponent(InputError, 'InputError');

document.addEventListener("DOMContentLoaded", () => {
    renderDOM(new SignIn([]));
});