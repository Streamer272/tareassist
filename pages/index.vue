<template>
  <Guarded>
    <Centered row>
      <div
        class="flex items-center justify-center flex-col flex-shrink-0 w-[20vw] h-screen bg-background"
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
        <div
          class="flex items-center justify-center flex-shrink-0 w-full h-fit"
        >
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

      <div class="w-1 h-screen bg-surface" />

      <div
        v-if="selectedClass !== undefined"
        class="flex items-start justify-center flex-col flex-shrink-0 w-[20vw] h-screen bg-background gap-y-2"
      >
        <div class="h-2 flex-shrink-0" />
        <div v-for="hw in homework" class="ml-4">
          <p class="text-on-background text-xl">
            {{ hw.name }} (due on {{ dayjs(hw.due.toMillis()).format("D MMM") }})
          </p>
        </div>
        <div class="flex-grow" />
      </div>

      <div class="w-full h-screen bg-surface"></div>
    </Centered>
  </Guarded>
</template>

<script lang="ts" setup>
import {
  DocumentReference,
  Timestamp,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import * as dayjs from "dayjs";

const { classes } = useClasses();
const selectedClass = ref<number | undefined>(undefined);
const homework = ref<Homework[]>([]);

function logOut() {
  signOut(useFirebaseAuth());
}

type Homework = {
  id: string;
  name: string;
  assigned: Timestamp;
  due: Timestamp;
  class: DocumentReference;
};

watchEffect(async () => {
  if (classes.value.length === 0 || selectedClass.value === undefined) return;

  const class_ = classes.value[selectedClass.value];
  const docs = await getDocs(
    query(
      collection(useFirebaseDb(), "homework"),
      where("class", "==", doc(useFirebaseDb(), "classes", class_.id))
    )
  );

  const array: Homework[] = [];
  docs.forEach((document) => {
    console.log(document.data().assigned);
    array.push({
      id: document.id,
      name: document.data().name,
      assigned: document.data().assigned,
      due: document.data().due,
      class: document.data().class,
    });
  });
  homework.value = array.sort(
    (a, b) => b.assigned.toMillis() - a.assigned.toMillis()
  );
});
</script>
