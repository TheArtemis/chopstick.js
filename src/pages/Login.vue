<script>
    export default {
        name: 'Login',
        created() {
    const colors = localStorage.getItem('colors');
    if (colors === 'true') {
      document.documentElement.setAttribute('data-colors', 'light');
    } else {
      document.documentElement.removeAttribute('data-colors');
    }
   },
    }
</script>
<template>
<div class="container">
    <div class="box">
        <h2>Login</h2>
        <div class="inputBox">
            <input type="text" name="name" required value="">
                <label>Username</label>
        </div>
        <div class="inputBox">
                <input type="password" name="password" required value="">
                <label>Password</label>
            </div>
        <div class="boxbottom">
            <button type="submit" name="sign-in">Sign In</button>
            <a href="/register">Don't have an account? Register here</a>
        </div>
      
    </div>
</div>
</template>
