<script lang="ts">
    import type {PageData} from './$types';
    import { enhance } from '$app/forms';
    import { page } from '$app/state';
    import { server } from 'typescript';
    let {data}: {data:PageData} = $props();

    const token: string = data.token;

    let password = $state('');
    let confirmpassword = $state('');
    
</script>

<p>Recovery token: {token}</p>

<section>
    
    <form
        method="POST"
        action="?/submitRecovery"
        
    >
        <div>
            <h2>New Password</h2>
            <input
                type = "text"
                name= "password"
                placeholder="New Password"
                bind:value={password}
                id="password"
            >
        </div>
        <div>
            <h2>Confirm Password</h2>
            <input
                type = "text"
                name="confirmpassword"
                placeholder = "Confirm Password"
                bind:value={confirmpassword}
                id="confirmpassword"
            >
        </div>
        <input type='hidden' name="token" value={token}>
        <button type='submit'>submit</button>
    </form>

    
</section>