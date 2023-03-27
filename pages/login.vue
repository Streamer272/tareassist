<template>
  <Centered row bg>
    <div class="flex items-center justify-start flex-col w-fit h-full">
      <div class="h-20 flex-shrink-0" />
      <div
        class="flex items-center justify-center w-full rounded-3xl bg-half mx-4"
      >
        <img src="/images/intro-light.png" alt="Introduction" />
      </div>
      <div class="h-12 flex-shrink-0" />
      <div
        class="flex items-center justify-center flex-col bg-white rounded-3xl w-full h-fit py-8 bg-surface"
      >
        <p class="text-3xl font-bold">Log in</p>
        <div class="h-6 flex-shrink-0" />
        <button
          @click="logIn"
          class="flex items-center justify-center border-4 border-black border-solid rounded-full py-2 px-3"
        >
          <img src="/images/google.png" alt="Google" class="w-8 h-8" />
          <div class="w-2 flex-shrink-0" />
          Log in with Google
        </button>
      </div>
    </div>
  </Centered>
</template>

<script lang="ts" setup>
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";

const user = useUser();

function logIn() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(useFirebaseAuth(), provider);
}

watchEffect(() => {
  // PROD
  if (user.value) navigateTo("/");
});
</script>
