<script lang="ts">
    import { getProjects } from './api/api.ts';
    import { onMount } from 'svelte';
    import type { Project } from './api/objects.interface.ts';

    let projects: Project[] = [];
    let search: string = '';
    let filteredProjects: Project[];

    $: {
        filteredProjects = projects.filter(({ name, name_with_namespace }) => {
            const keyword = search.toLowerCase();

            return name.toLowerCase().includes(keyword) || name_with_namespace.toLowerCase().includes(keyword);
        });
    }

    onMount(async () => {
        projects = await getProjects();
    });
</script>

<main>
    <input type="text" placeholder="search..." bind:value={search}/>
    <ul>
        {#each filteredProjects as project}
            <li>
                <p class="name">{project.name}</p>
                <span class="namespace">{project.name_with_namespace}</span>
            </li>
        {/each}
    </ul>
</main>

<style>
    ul {
        display: flex;
        flex-direction: column;
        gap: 1em;
        padding: 0;
    }

    li {
        list-style: none;
        background: #0f0f0f98;
        padding: 1em;
        border-radius: 10px;
        cursor: pointer;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
        border: 1px solid transparent;
        transition: border-color 0.25s;
    }

    li:hover {
        border-color: #396cd8;
    }

    .name {
        margin: 0;
    }

    .namespace {
        opacity: .5;
    }
</style>
