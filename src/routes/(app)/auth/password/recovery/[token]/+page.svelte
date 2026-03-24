<script lang="ts">
    import type { PageData, ActionData } from './$types';
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    let { data, form }: { data: PageData; form: ActionData } = $props();

    const token: string = data.token;

    let password = $state('');
    let confirmpassword = $state('');

    $effect(() => {
        if (form?.success) {
            goto('/login');
        }
    });

</script>

<section>
    <form method="POST" action="?/submitRecovery" use:enhance>
        <div>
            <h2>New Password</h2>
            <input
                type="password"
                name="password"
                placeholder="New Password"
                bind:value={password}
                id="password"
            />
        </div>
        <div>
            <h2>Confirm Password</h2>
            <input
                type="password"
                name="confirmpassword"
                placeholder="Confirm Password"
                bind:value={confirmpassword}
                id="confirmpassword"
            />
        </div>
        <input type="hidden" name="token" value={token} />

        {#if form?.err}
            <p>{form.err}</p>
        {/if}

        <button type="submit">Submit</button>
    </form>
</section>