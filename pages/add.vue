<template>
  <Centered start bg>
    <div className="flex items-center justify-start flex-col w-fit h-full">
      <div className="h-20 flex-shrink-0" />
      <div
        className="flex items-center justify-center w-full rounded-3xl bg-half mx-4"
      >
        <img src="/images/intro-light.png" alt="Introduction" />
      </div>
      <div className="h-12 flex-shrink-0" />
      <div
        className="flex items-center justify-center flex-col bg-white rounded-3xl w-full h-fit py-8 bg-surface"
      >
        <p className="text-3xl font-bold">Getting set up</p>
        <div className="h-4 flex-shrink-0" />
        <form @submit="add">
          <label for="school" class="text-lg">Select your school</label>
          <select id="school" v-model="school">
            <option v-for="school of schools.map((school) => school.name)">
              {{ school }}
            </option>
          </select>
          <NuxtLink to="/create/school" className="text-sm underline">
            Your school isn't here?
          </NuxtLink>
          <div className="h-2 flex-shrink-0" />
          <label for="class" class="text-lg">Select your class</label>
          <select id="class" v-model="class_">
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
            className="text-sm underline"
          >
            Your class isn't here?
          </NuxtLink>
          <div className="h-4 flex-shrink-0" />
          <div className="flex items-center justify-center w-full">
            <button type="submit" variant="outline">Submit</button>
          </div>
        </form>
        <div className="h-6 flex-shrink-0" />
      </div>
    </div>
  </Centered>
</template>

<script lang="ts" setup>
const school = ref<string | undefined>(undefined);
const class_ = ref<string | undefined>(undefined);
const { addClass } = useClasses();
const schools = useAllSchools();
const classes = useAllClasses();

function add(event: any) {
  event.preventDefault();
  const actualClass = classes.value.find(
    (class2) => class2.name === class_.value
  );
  if (actualClass) addClass(actualClass);
  navigateTo("/");
}

watchEffect(() => {
  if (schools.value.length > 0) school.value = schools.value[0].name;
  if (classes.value.length > 0) class_.value = classes.value[0].name;
});
</script>
