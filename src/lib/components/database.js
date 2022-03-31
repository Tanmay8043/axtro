import { writable } from 'svelte/store';
import { browser } from '$app/env';

export const selectedstore = writable("My_Account");
// export const showstore = writable(null);

export const showstore = writable(browser && JSON.parse(localStorage.getItem("showstore") || null));
showstore.subscribe((val)=> browser && (localStorage.showstore=JSON.stringify(val)));

export const placeValue = writable(null)

export const dataValue = writable(browser && JSON.parse(localStorage.getItem("dataValue") || null));
dataValue.subscribe((val)=> browser && (localStorage.dataValue=JSON.stringify(val)));
