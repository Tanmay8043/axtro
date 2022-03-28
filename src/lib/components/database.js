import { writable } from 'svelte/store';
import { browser } from '$app/env';

export const selectedstore = writable("My_Details");

let longitude=0, latitude=0, place=null;
let pldata={
    place,
    longitude,
    latitude
}

export const placeValue = writable(pldata)

export const dataValue = writable(browser && JSON.parse(localStorage.getItem("dataValue") || null));
dataValue.subscribe((val)=> browser && (localStorage.dataValue=JSON.stringify(val)));
