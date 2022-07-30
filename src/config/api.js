import axios from "axios";
import store from "../store/index";

export default () =>
    axios.create({
        //baseURL: `http://supervison-backend.test/api`,
        baseURL: "https://supervision.damngoodtools.com/api",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: store.state.access_token
                ? "Bearer " + store.state.access_token
                : "",
        },
    });
