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
        <button
          v-for="(hw, index) in homework"
          @click="() => (selectedHomework = index)"
          class="ml-4"
        >
          <p class="text-on-background text-xl">
            {{ hw.name }} (due on
            {{ dayjs(hw.due.toMillis()).format("D MMM") }})
          </p>
        </button>
        <div class="flex-grow" />
      </div>

      <div
        class="flex items-start justify-center flex-col w-full h-screen bg-surface gap-y-3"
      >
        <div class="h-4" />
        <div
          v-for="submission in submissions"
          class="flex items-start justify-start flex-col rounded-xl bg-surface-variant py-2 px-4 ml-6 w-fit gap-y-4"
        >
          <div class="flex items-center justify-center w-fit">
            {{ submission.text }} -
            <div class="w-1 flex-shrink-0" />
            <img
              :src="submission.user.pfp"
              alt="Profile picture"
              class="w-5 h-5 rounded-full"
            />
            <div class="w-1 flex-shrink-0" />
            {{ submission.user.name }}
          </div>
          <div
            v-if="submission.images.length > 0"
            class="flex items-center justify-center w-fit gap-x-4"
          >
            <img
              v-for="image in submission.images"
              :src="image"
              alt="Submission"
            />
          </div>
        </div>
        <div class="flex-grow" />

        <form
          v-if="selectedHomework !== undefined"
          @submit="upload"
          class="flex items-center justify-center w-full"
        >
          <input
            type="file"
            accept="image/*"
            ref="fileInputRef"
            multiple
            class="w-fit"
          />
          <input
            type="text"
            placeholder="Text"
            v-model="text"
            class="rounded-full py-2 px-4"
          />
          <div class="w-4 flex-shrink-0" />
          <button type="submit" class="flex items-center justify-center">
            <span class="material-symbols-outlined">send</span>
          </button>
        </form>

        <div class="h-1 flex-shrink-0" />
      </div>
    </Centered>
  </Guarded>
</template>

<script lang="ts" setup>
import {
  DocumentReference,
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { signOut } from "firebase/auth";
import * as dayjs from "dayjs";
import { uuidv4 } from "@firebase/util";

const { classes } = useClasses();
const selectedClass = ref<number | undefined>(undefined);
const homework = ref<Homework[]>([]);
const selectedHomework = ref<number | undefined>(undefined);
const submissions = ref<Submission[]>([]);
const fileInputRef = ref<HTMLInputElement | undefined>(undefined);
const text = ref<string>("");

function logOut() {
  signOut(useFirebaseAuth());
}

async function upload(event: Event) {
  event.preventDefault();

  const images = [];
  if (fileInputRef.value?.files?.length) {
    for (const file of fileInputRef.value.files) {
      const fileRef = storageRef(
        useFirebaseStorage(),
        "submissions/" + uuidv4()
      );
      await uploadBytes(fileRef, file);
      images.push(await getDownloadURL(fileRef));
    }
  }

  await addDoc(collection(useFirebaseDb(), "submissions"), {
    text: text.value,
    images,
    homework: doc(
      useFirebaseDb(),
      "homework",
      homework.value[selectedHomework.value!!].id
    ),
    user: {
      name: useFirebaseAuth().currentUser!!.displayName,
      pfp: useFirebaseAuth().currentUser!!.photoURL,
    },
  });

  text.value = "";
  const previous = selectedHomework.value;
  selectedHomework.value = undefined;
  setTimeout(() => {
    selectedHomework.value = previous;
  }, 50);
}

type Homework = {
  id: string;
  name: string;
  assigned: Timestamp;
  due: Timestamp;
  class: DocumentReference;
};

type Submission = {
  id: string;
  text: string;
  images: string[];
  homework: DocumentReference;
  user: {
    name: string;
    pfp: string;
  };
};

watchEffect(() => {
  if (homework.value) selectedHomework.value = undefined;
});

watchEffect(async () => {
  if (homework.value.length === 0 || selectedHomework.value === undefined)
    return;

  const hw = homework.value[selectedHomework.value];
  const docs = await getDocs(
    query(
      collection(useFirebaseDb(), "submissions"),
      where("homework", "==", doc(useFirebaseDb(), "homework", hw.id))
    )
  );

  const array: Submission[] = [];
  docs.forEach((document) => {
    array.push({
      id: document.id,
      text: document.data().text,
      images: document.data().images,
      homework: document.data().homework,
      user: document.data().user,
    });
  });
  submissions.value = array;
});

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
    if (!document.exists() || !document.data()) return;

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
