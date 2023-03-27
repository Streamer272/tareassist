<template>
  <div
    :class="`flex items-center ${start ? 'justify-start' : 'justify-center'} ${
      row ? 'flex-row' : 'flex-col'
    } ${bg ? 'bg-background' : ''} w-screen h-screen overflow-hidden`"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  row?: boolean;
  start?: boolean;
  bg?: boolean;
}>();
</script>
