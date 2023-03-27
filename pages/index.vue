<template>
  <Centered row>
    <div
      class="flex items-center justify-center flex-col w-[20vw] h-screen bg-background"
    >
      <img
        src="/images/intro-light.png"
        alt="Introduction"
        class="w-[90%] h-fit flex-shrink-0"
      />
      <div class="h-4 flex-shrink-0" />
      <div
        class="flex items-start justify-start flex-col flex-grow w-full gap-y-2"
      >
        <p class="font-bold text-3xl text-on-background ml-4">Classes</p>
        <div class="h-px flex-shrink-0" />
        <button
          :key="class_.id"
          v-for="(class_, index) of classes"
          @click="() => (selectedClass = index)"
          class="flex items-center justify-center w-fit ml-6"
        >
          <p
            class="flex items-center justify-center text-3xl rounded-full bg-surface w-12 h-12"
          >
            {{ class_.name[0] }}
          </p>
          <div class="w-3 flex-shrink-0" />
          <p class="text-on-background text-xl">{{ class_.name }}</p>
        </button>
      </div>
      <div class="flex items-center justify-center flex-shrink-0 w-full h-fit">
        <div class="w-4 flex-shrink-0" />
        <NuxtLink
          to="/add"
          class="p-2 flex-shrink-0 rounded-full bg-surface-variant"
        >
          <span
            class="material-symbols-outlined flex items-center justify-center text-4xl w-10 h-10"
          >
            add
          </span>
        </NuxtLink>
        <div class="flex-grow" />

        <button
          @click="logOut"
          class="flex items-center justify-center py-2 px-3 h-full flex-shrink-0 rounded-full bg-surface-variant"
        >
          <span class="material-symbols-outlined text-3xl">logout</span>
          <div class="w-2 flex-shrink-0" />
          <p class="text-xl">Log out</p>
        </button>
        <div class="w-4 flex-shrink-0" />
      </div>
      <div class="h-4 flex-shrink-0" />
    </div>

    <div
      v-if="selectedClass !== undefined"
      class="w-[20vw] h-screen bg-background"
    >
      xx
    </div>

    <div class="w-full h-screen bg-surface"></div>
  </Centered>
</template>

<script lang="ts" setup>
import { signOut } from "@firebase/auth";

const { classes } = useClasses();
const selectedClass = ref<number | undefined>(undefined);

function logOut() {
  signOut(useFirebaseAuth());
}
</script>
