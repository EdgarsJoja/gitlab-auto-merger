<script lang="ts">
    import { settings } from './stores/settings.store';
</script>

<main class="container">
    <div class="form-group">
        <label for="host">Host</label>
        <input id="host" type="text" bind:value={ $settings.host }/>
    </div>

    <div class="form-group">
        <label for="token">Access Token</label>
        <input id="token" type="password" bind:value={ $settings.accessToken }/>
    </div>
</main>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    .form-group {
        display: flex;
        flex-direction: column;
    }

    label {
        margin-bottom: .25em;
    }
</style>
