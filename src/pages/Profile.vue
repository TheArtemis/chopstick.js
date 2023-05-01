<script>
    import OptionsMenu from '../components/OptionsMenu/OptionsMenu.vue';

    export default {
        name: 'Profile',
        components: {
            OptionsMenu,
        },
    }
</script>

<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
    <div>
        <h1></h1>
        <OptionsMenu></OptionsMenu>
        <div class="contenitor"> 
     <div class="profile">
        <h2>Profile</h2>
        <div class="username">
            <label> Username</label>
        </div>
        <form>
           
            <!-- <div class="inputProfile">
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
            </div> -->
            <div class="picture">
                <div class="pfp_label">
                    <label>Profile Picture</label>
                </div>
                <!-- <div class="upload-btn">
                  <input type="file" name="img_btn" accept="image/*">
                </div> -->
                <div class="img">
                    <input type="file" id="img_btn" accept="image/*">
                    <label for="img_btn" class="img-upload" size="60">Niente</label>
                </div>
                <textarea class="bio">
                 </textarea>
                <label>Biography</label>
            </div>
            <input type="submit" name="save" value="Save">
           
        </form>
     </div>
    </div>
    <div class="right-container">
		<div class="top-row">
            <h2>Statistics</h2>
              <div class="top-wrapper">
                <div class ="top-container">
                    <i class="fa-regular fa-thumbs-up"></i>
                     <span class="wins" data-val="400">000</span>
                     <span class="wins-text">Wins</span>
                </div>
                <div class ="top-container">
                    <i class="fa-regular fa-thumbs-down"></i>
                     <span class="wins" data-val="400">000</span>
                     <span class="wins-text">Losses</span>
                </div>
                <div class ="top-container">
                    <i class="fa-regular fa-hand-peace"></i>
                     <span class="wins" data-val="400">000</span>
                     <span class="wins-text">Ties</span>
                </div>
              </div>
        </div>
		<div class="bottom-row">
            <h2>Recent Games</h2>
        </div>
	</div>
    </div>
  
</template>

