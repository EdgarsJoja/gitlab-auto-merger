<script lang="ts">
    import Settings from './lib/Settings.svelte';
    import Projects from './lib/Projects.svelte';

    const contentMap = {
        settings: Settings,
        projects: Projects
    };

    let displayContent = 'projects';
</script>

<nav class="navigation">
    <button class:active={ displayContent === 'projects' } on:click={ () => displayContent = 'projects' }>
        Projects
    </button>
    <button class:active={ displayContent === 'settings' } on:click={ () => displayContent = 'settings' }>
        Settings
    </button>
</nav>
<main class="container">
    <article class="content">
        <svelte:component this={contentMap[displayContent]}/>
    </article>
</main>

<style>
    .navigation {
        display: flex;
        margin: 1em auto;
        max-width: min-content;
        gap: 1em;
    }

    button.active {
        color: orange;
    }

    .container {
        display: flex;
        justify-content: center;
        padding: 1em;
    }

    .content {
        max-width: 30em;
        width: 100%;
    }
</style>
