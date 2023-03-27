<template>
  <Guarded>
    <Centered start bg>
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
          <div class="h-4 flex-shrink-0" />
          <form @submit="add" class="flex items-center justify-center flex-col">
            <label for="school" class="text-lg">Select your school</label>
            <select
              id="school"
              v-model="class_"
              class="bg-surface-variant py-2 px-4 rounded-full"
            >
              <option v-for="school of schools.map((school) => school.name)">
                {{ school }}
              </option>
            </select>
            <div class="h-2 flex-shrink-0" />
            <input
              v-model="school"
              placeholder="Enter class name"
              class="rounded-full bg-surface-variant py-2 px-4"
            />
            <div class="h-3 flex-shrink-0" />
            <button
              type="submit"
              :disabled="!school"
              :class="`text-lg rounded-full bg-surface-variant py-2 px-4 ${
                !school ? 'opacity-50' : ''
              }`"
            >
              Submit
            </button>
          </form>
          <div class="h-6 flex-shrink-0" />
        </div>
      </div>
    </Centered>
  </Guarded>
</template>

<script lang="ts" setup>
import { doc } from "@firebase/firestore";

const school = ref<string | undefined>(undefined);
const class_ = ref<string | undefined>(undefined);
const schools = useAllSchools();

async function add(event: any) {
  event.preventDefault();
  if (!school.value || !class_.value) return;

  await createClass(
    class_.value,
    doc(
      useFirebaseDb(),
      "classes",
      schools.value.find((school_) => school_.name === school.value)!!.id
    )
  );
  navigateTo("/");
}
</script>
