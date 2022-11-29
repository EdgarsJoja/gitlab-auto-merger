<script lang="ts">
    import type { GitlabProject } from './api/objects.interface';
    import { createMergeRequest } from './api/api';

    export let project: GitlabProject;
    let selectedOptions = [
        'production~uat',
        'uat~testing',
        'testing~development',
    ];

    let mergeOptions = [
        'production~uat',
        'production~testing',
        'production~development',
        'uat~testing',
        'testing~development',
    ];

    let timeout;
    let interval;
    let cancelCountdown = 0;

    const createMergeRequests = () => {
        cancelCountdown = 5;

        interval = setInterval(() => {
            cancelCountdown--;

            if (cancelCountdown <= 0) {
                cancelCountdown = 0;
                clearInterval(interval);
            }
        }, 1000);

        timeout = setTimeout(() => {
            cancelCountdown = 0;

            selectedOptions.forEach(option => {
                const branches = option.split('~');
                const sourceBranch = branches[0];
                const targetBranch = branches[1];

                createMergeRequest(project.id, sourceBranch, targetBranch);
            });
        }, 5000);
    }

    const cancel = () => {
        cancelCountdown = 0;
        clearTimeout(timeout);
    }

    const getMergeOptionLabel = (option) => {
        const [source, target] = option.split('~');

        return `${source} -> ${target}`;
    }
</script>

<main class="project">
    <h2 class="name">{project.name}</h2>
    <h4 class="namespace">{project.name_with_namespace}</h4>

    <div class="merge-options">
        {#each mergeOptions as option}
            <label class="form-control">
                <input type="checkbox" value={ option } bind:group={selectedOptions}/>
                { getMergeOptionLabel(option) }
            </label>
        {/each}
    </div>

    {#if !cancelCountdown}
        <button on:click={ createMergeRequests }>Create MRs</button>
    {:else}
        <button class="cancel" on:click={ cancel }>Cancel ({cancelCountdown})</button>
    {/if}
</main>

<style>
    .namespace {
        opacity: .5;
        font-size: .75em;
    }

    .merge-options {
        display: flex;
        flex-direction: column;
        gap: 1em;
        margin-bottom: 2em;
    }

    .cancel {
        background: indianred;
    }
</style>
