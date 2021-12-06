import axios from "axios";

const instance = axios.create({
    baseURL: "https://us-central1-clone-5356b.cloudfunctions.net/api"
    // baseURL: "http://localhost:5001/clone-5356b/us-central1/api" //the API Url (cloud function)
})

export default instance;