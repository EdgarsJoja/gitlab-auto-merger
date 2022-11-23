<script lang="ts">
    import type { GitlabProject } from './api/objects.interface';
    import { createMergeRequest } from './api/api';

    export let project: GitlabProject;
    let selectedOptions = [
        'production~uat',
        'uat~testing',
        'testing~development',
    ];

    const createMergeRequests = () => {
        if (!confirm('Are you sure?')) {
            return;
        }

        selectedOptions.forEach(option => {
            const branches = option.split('~');
            const sourceBranch = branches[0];
            const targetBranch = branches[1];

            createMergeRequest(project.id, sourceBranch, targetBranch);
        });
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

    <button on:click={ createMergeRequests }>Create MRs</button>
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
</style>
