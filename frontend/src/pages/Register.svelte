<script>
    import api from "../services/api";
    let email = "";
    let password = "";
    let confirmPassword = "";

    async function register() {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await api.post("/auth/register", {
                email,
                password,
            });
            console.log(response.data);
            alert("Registration successful!");
        } catch (error) {
            console.error(error);
            alert("Registration failed");
        }
    }
</script>

<h1>Register</h1>

<!-- here preventDefault will avoid default reload and add register function -->
<form on:submit|preventDefault={register}>
    <label>Email</label>
    <input type="email" bind:value={email} />
    <label>Password</label>
    <input type="password" bind:value={password} />
    <label>Confirm Password</label>
    <input type="password" bind:value={confirmPassword} />
    <button type="submit">Register</button>
</form>
