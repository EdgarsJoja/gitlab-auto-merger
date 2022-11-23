<script lang="ts">
    import { getProjects } from './api/api.ts';
    import { onMount } from 'svelte';
    import type { GitlabProject } from './api/objects.interface.ts';
    import Project from './Project.svelte';

    let projects: GitlabProject[] = [];
    let search: string = '';
    let filteredProjects: GitlabProject[];
    let selectedProject: GitlabProject;

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
    {#if !selectedProject}
        <div class="list-view">
            <details class="disclaimer">
                <summary>Why all the projects are not visible?</summary>
                Currently only "starred" projects are shown due to pagination limits.
                Gitlab allows maximum 100 items per page. This means, that if your organisation has more than that,
                then all projects would not be shown, unless some pagination is implemented in the app.
                This is in the pipeline ;)
            </details>
            <input type="text" placeholder="search..." bind:value={search}/>
            {#if !projects.length}
                <ul>
                    {#each Array.from({ length: 3 }) as item}
                        <li class="placeholder"></li>
                    {/each}
                </ul>
            {/if}
            <ul>
                {#each filteredProjects as project}
                    <li on:click={ () => selectedProject = project }>
                        <p class="name">{project.name}</p>
                        <span class="namespace">{project.name_with_namespace}</span>
                    </li>
                {/each}
            </ul>
        </div>
    {:else}
        <div class="single-view">
            <button on:click={ () => selectedProject = null }>&lt; Back</button>
            <Project project={selectedProject}/>
        </div>
    {/if}
</main>

<style>
    .disclaimer {
        margin-bottom: 1em;
    }

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

    .placeholder {
        background: #0f0f0f98;
        border-radius: 10px;
        min-height: 2em;
    }

    .placeholder:hover {
        border-color: transparent;
    }
</style>
