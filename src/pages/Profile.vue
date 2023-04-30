<template>
  <div class="contenitor">
     <div class="profile">
        <h2>Profile</h2>
        <form>

            <div class="inputProfile">
                <input type="text" name="name" required value="">
                <label>Name</label>
            </div>

            <div class="inputProfile">
                <input type="text" name="surname" required value="">
                <label>Surname</label>
            </div>

            <div class="inputProfile">
                <input type="email" name="email" required value="">
                <label>E-mail</label>
            </div>

            <div class="inputProfile">
                <input type="password" name="password" required value="">
                <label>Password</label>
            </div>
            <div class="picture">
                <div class="img"></div>
                <textarea class="bio">
                 </textarea>
                <label>Biography</label>
            </div>
            <input type="submit" name="save" value="Save">
           
        </form>
     </div>
    </div>
</template>

<script>
    export default {
        name: 'Profile',
    }
</script>