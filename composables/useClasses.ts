import {
  DocumentReference,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

export type Class = {
  id: string;
  name: string;
  school: DocumentReference;
  webhook: string;
};

export function useClasses() {
  const classes = useState<Class[]>("classes", () => []);

  onMounted(async () => {
    const local = localStorage.getItem("classes");
    if (local) {
      const array: Class[] = [];
      for (const class_ of JSON.parse(local)) {
        const document = await getDoc(doc(useFirebaseDb(), "classes", class_));
        const data = document.data();
        if (!data || !document.exists()) continue;

        array.push({
          id: document.id,
          name: data.name,
          school: data.school,
          webhook: data.webhook,
        });
      }
      classes.value = array;
    } else {
      localStorage.setItem("classes", JSON.stringify([]));
    }
  });

  function addClass(class_: Class) {
    const array = [...classes.value, class_];
    classes.value = array;
    localStorage.setItem(
      "classes",
      JSON.stringify(array.map((class_) => class_.id))
    );
  }

  return { classes, addClass };
}

export function useAllClasses() {
  const classes = useState<Class[]>("all-classes", () => []);

  onMounted(async () => {
    const documents = await getDocs(collection(useFirebaseDb(), "classes"));
    const array: Class[] = [];
    for (const document of documents.docs) {
      const data = document.data();
      if (!data || !document.exists()) continue;

      array.push({
        id: document.id,
        name: data.name,
        school: data.school,
        webhook: data.webhook,
      });
    }
    classes.value = array;
  });

  return classes;
}

export function createClass(name: string, school: DocumentReference) {
  addDoc(collection(useFirebaseDb(), "classes"), {
    name: name,
    school: school,
    webhook: "",
  });
}
