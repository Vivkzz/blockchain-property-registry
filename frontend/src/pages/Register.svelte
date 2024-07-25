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
<form on:submit|preventDefault={register}>
    <label for="email">Email</label>
    <input id="email" type="email" bind:value={email} />

    <label for="password">Password</label>
    <input id="password" type="password" bind:value={password} />

    <label for="confirm-password">Confirm Password</label>
    <input id="confirm-password" type="password" bind:value={confirmPassword} />

    <button type="submit">Register</button>
</form>
