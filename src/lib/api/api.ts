import { settings } from '../stores/settings.store';
import { get } from 'svelte/store';
import type { Project } from './objects.interface';

const getProjects = async (): Promise<Project[]> => {
    return Promise.resolve([
        {
            id: 1,
            name: 'Uno',
            name_with_namespace: 'Internal / Uno'
        },
        {
            id: 2,
            name: 'Dos',
            name_with_namespace: 'Internal / Dos'
        },
        {
            id: 3,
            name: 'Tres',
            name_with_namespace: 'Internal / Tres'
        },
    ]);
    // return await callApi<Project[]>('projects');
};

const callApi = async <Type>(endpoint: string): Promise<Type> => {
    const { host, accessToken } = get(settings);

    const formattedHost = host.endsWith('/') ? host.slice(0, -1) : host;
    const url = `${formattedHost}/api/v4/${endpoint}`;

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    return response.json();
}

export {
    getProjects
}
