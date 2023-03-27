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
          <p class="text-3xl font-bold">Getting set up</p>
          <div class="h-4 flex-shrink-0" />
          <form @submit="add" class="flex items-center justify-center flex-col">
            <label for="school" class="text-lg">Select your school</label>
            <select
              id="school"
              v-model="school"
              class="bg-surface-variant py-2 px-4 rounded-full"
            >
              <option v-for="school of schools.map((school) => school.name)">
                {{ school }}
              </option>
            </select>
            <NuxtLink to="/create/school" class="text-sm underline">
              Your school isn't here?
            </NuxtLink>
            <div class="h-4 flex-shrink-0" />
            <label for="class" class="text-lg">Select your class</label>
            <select
              id="class"
              v-model="class_"
              :disabled="!school"
              class="bg-surface-variant py-2 px-4 rounded-full"
            >
              <option
                v-for="class_ of classes
                  .filter(
                    (class_) =>
                      class_.school.id ===
                      schools.find((school2) => school2.name === school)?.id
                  )
                  .map((class_) => class_.name)"
              >
                {{ class_ }}
              </option>
            </select>
            <NuxtLink
              :to="`/create/class?school=${
                schools.find((school_) => school_.name === school)?.id ?? ''
              }`"
              class="text-sm underline"
            >
              Your class isn't here?
            </NuxtLink>
            <div class="h-6 flex-shrink-0" />
            <button
              type="submit"
              :disabled="!school || !class_"
              :class="`text-lg rounded-full bg-surface-variant py-2 px-4 ${
                !school || !class_ ? 'opacity-50' : ''
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
const school = ref<string | undefined>(undefined);
const class_ = ref<string | undefined>(undefined);
const { addClass } = useClasses();
const schools = useAllSchools();
const classes = useAllClasses();

function add(event: any) {
  event.preventDefault();
  if (!school.value || !class_.value) return;
  const actualClass = classes.value.find(
    (class2) => class2.name === class_.value
  );
  if (actualClass) addClass(actualClass);
  navigateTo("/");
}
</script>
