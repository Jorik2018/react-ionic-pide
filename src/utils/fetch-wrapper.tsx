//import config from 'config';
import { accountService } from '../services/accountService.js';

//const [showLoading, setShowLoading] = useState(true);
var loadingMask;

export const http:any = {
    get,
    post,
    put,
	loadingMask,
    delete: _delete,
	//ionic build --prod -- --base-href /vaccine/search/
	//baseHREF:'/dre/enrollment',
	baseHREF:'/admin/pide',
	baseURL:import.meta.env.VITE_APP_BASE_URL
}

function scheme(url:any){
	if(!/^(f|ht)tps?:\/\//i.test(url)){
        return http.baseURL+url;
    }else
		return url;
}

function get(url:any) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(url)
    };
	if(http.loadingMask)http.loadingMask(true);
    return fetch(scheme(url), requestOptions).then(handleResponse);
}

function post(url:any, body:any, header:any) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader(url,header)},
        body: JSON.stringify(body)
    };
    
	if(http.loadingMask)http.loadingMask(true);
    return fetch(scheme(url), requestOptions).then(handleResponse);
}

function put(url:any, body:any) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        body: JSON.stringify(body)
    };
	if(http.loadingMask)http.loadingMask(true);
    return fetch(http.baseURL+url, requestOptions).then(handleResponse);    
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url:any) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(url)
    };
	if(http.loadingMask)http.loadingMask(true);
    return fetch(http.baseURL+url, requestOptions).then(handleResponse);
}

// helper functions

function authHeader(url:any,opts?:any):any {
    // return auth header with jwt if user is logged in and request is to the api url
    const user = accountService.getUserValue();
    const isLoggedIn = user && user.jwtToken;
    //const isApiUrl = url.startsWith(config.apiUrl);
	var header:any={};
    if(isLoggedIn /*&& isApiUrl*/)
        header.Authorization=`Bearer ${user.jwtToken}`;
	if(opts)header={...header,...opts};
    return header;
}

function handleResponse(response:any) {
    return response.text().then((text:any) => {
		if(http.loadingMask)http.loadingMask(false);
        
        if (!response.ok) {
			const data = text;
            if ([401].includes(response.status) && accountService.getUserValue()) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                //403 es prohibido 

                accountService.logout();
            }else if(response.status==403){
                alert('No esta autorizado!');
            }
			response.message=data;
           // const error = (data && data.message) || response.statusText;
            return Promise.reject(response);
        }else{
			return JSON.parse(text);
		}
    });
}