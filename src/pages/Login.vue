<template>
    <div class="box">
        <h2>Login</h2>
        <form>
            <div class="inputBox">
                <input type="text" name="name" required value="">
                <label>Username</label>
            </div>

            <div class="inputBox">
                <input type="password" name="password" required value="">
                <label>Password</label>
            </div>

            <input type="submit" name="sign-in" value="Sign In">
            <a href="http://localhost:5173/register" class="reg-redirect">Don't have an account? Register here</a>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'Login',
    }
</script>