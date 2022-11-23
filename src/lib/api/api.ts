import { settings } from '../stores/settings.store';
import { get } from 'svelte/store';
import type { GitlabProject } from './objects.interface';

const getProjects = async (): Promise<GitlabProject[]> => {
    const searchParams = new URLSearchParams({
        order_by: 'updated_at',
        per_page: '100',
        starred: 'true'
    });

    return await callApi<GitlabProject[]>(`projects?${searchParams}`);
};

// @todo: Add typed response.
const createMergeRequest = async (projectId: number, sourceBranch: string, targetBranch: string): Promise<any> => {
    const endpoint = `projects/${projectId}/merge_requests`;

    return await callApi(endpoint, {
        method: 'POST',
        body: JSON.stringify({
            source_branch: sourceBranch,
            target_branch: targetBranch,
            title: `${sourceBranch} into ${targetBranch}`
        })
    });
}

const callApi = async <Type>(endpoint: string, options: any = {}): Promise<Type> => {
    const { host, accessToken } = get(settings);

    const formattedHost = host?.endsWith('/') ? host?.slice(0, -1) : host;
    const url = `${formattedHost}/api/v4/${endpoint}`;

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        ...options
    });

    return response.json();
}

export {
    getProjects,
    createMergeRequest
}
