<script>
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
<!-- here preventDefault will avoid default reload and add login() function -->
<form on:submit|preventDefault={login}>
    <label>Email</label>
    <input type="email" bind:value={email} />
    <label>Password</label>
    <input type="password" bind:value={password} />
    <button type="submit">Login</button>
</form>
