import { writable } from 'svelte/store';

const storageKey = 'settings';

const storedSettings = localStorage.getItem(storageKey);
export let settings = writable(JSON.parse(storedSettings) || {});

settings.subscribe(value => localStorage.setItem(storageKey, JSON.stringify(value)));
