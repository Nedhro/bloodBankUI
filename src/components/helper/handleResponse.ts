import { authenticationService } from "../../services/AuthenticationService";
// Importing toastify module
import { toast } from 'react-toastify';
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
const bahmniUrl = process.env.REACT_APP_API_URL;
// toast-configuration method, 
// it is compulsory method.
toast.configure();

export function handleResponse(response: any) {
  if (authenticationService.currentUserValue !== undefined
    || authenticationService.currentUserValue !== null || [401, 403].indexOf(response.status) !== -1) {
    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
    authenticationService.logout();
    const error = response.statusText;
    toast.error("You are not authenticated. Please log in.", { position: toast.POSITION.BOTTOM_RIGHT });
    setTimeout(() => {
      window.location.href = bahmniUrl + "/bahmni/home/index.html#/login";
    }, 5000);
    return Promise.reject(error);
  }
  return response;
}
