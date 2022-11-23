<script lang="ts">
    import type { GitlabProject } from './api/objects.interface';
    import { createMergeRequest } from './api/api';

    export let project: GitlabProject;
    let selectedOptions = [
        'production~uat',
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
</script>

<main class="project">
    <h2 class="name">{project.name}</h2>
    <h4 class="namespace">{project.name_with_namespace}</h4>

    <div class="merge-options">
        <label>
            <input type="checkbox" value="production~uat" bind:group={selectedOptions}/>
            production -> uat
        </label>

        <label>
            <input type="checkbox" value="uat~testing" bind:group={selectedOptions}/>
            uat -> testing
        </label>

        <label>
            <input type="checkbox" value="testing~development" bind:group={selectedOptions}/>
            testing -> development
        </label>
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
    }

    .merge-options {
        display: flex;
        flex-direction: column;
        gap: .5em;
        margin-bottom: 1em;
    }

    .cancel {
        background: #E14D2A;
    }
</style>
