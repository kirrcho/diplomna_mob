import axios from "axios";
import qs from "qs";
import { storeData, getData } from '../storage/localStorageFuncs';
import {client_id, client_secret, tenant_id} from "@env";

export async function auth() {
    const queryObj = {
        grant_type: 'client_credentials',
        client_id,
        client_secret,
        resource: 'https://servicebus.azure.net'
    }
    const url = `https://login.microsoftonline.com/${tenant_id}/oauth2/token`;
    const response = await axios.post(url, queryObj, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    storeData('phone_connection_token', response.data.access_token);
}

export async function sendMessageAsync(queue, obj) {
    const url = `https://diplomna-KK.servicebus.windows.net/${queue}/messages`;
    const token = await getData('phone_connection_token');

    await axios.post(url, obj, {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/atom+xml;type=entry;charset=utf-8',
        }
    });
}

export async function postAuthAsync(route, obj) {
    const url = `https://diplomna-be.azurewebsites.net/api/${route}`;
    const token = await getData('phone_connection_token');

    return await axios.post(url, obj, {
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    });
}

export async function postAsync(route, obj) {
    const url = `https://diplomna-be.azurewebsites.net/api/${route}`;
    const token = await getData('token');

    return await axios.post(url, obj, {
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    })
}