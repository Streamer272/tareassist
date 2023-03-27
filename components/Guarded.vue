<template>
  <slot />
</template>

<script lang="ts" setup>
const user = useUser();

watchEffect(() => {
  if (user.value === null) {
    navigateTo("/login");
  }
});
</script>
