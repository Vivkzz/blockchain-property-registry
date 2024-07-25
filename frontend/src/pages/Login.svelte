<script>
    import { onMount } from "svelte";
    import api from "../services/api";
    let email = "";
    let password = "";

    async function login() {
        try {
            const response = await api.post("/auth/login", { email, password });
            console.log(response.data);
            alert("Login successful!");
        } catch (error) {
            console.error(error);
            alert("Login failed");
        }
    }
</script>

<h1>Login</h1>
<form on:submit|preventDefault={login}>
    <label for="email">Email</label>
    <input id="email" type="email" bind:value={email} />
    <label for="password">Password</label>
    <input id="password" type="password" bind:value={password} />
    <button type="submit">Login</button>
</form>
