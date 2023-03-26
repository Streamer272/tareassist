import { DocumentReference, doc, getDoc, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useFirebase } from "./useFirebase";

export type Class = {
  id: string;
  name: string;
  school: DocumentReference;
  webhook: string;
};

export function useClasses() {
  const [classes, setClasses] = useState<Class[]>([]);
  const { classesCollection } = useFirebase();

  async function loadClasses() {
    const local = localStorage.getItem("classes");
    if (local) {
      const array: Class[] = [];
      for (const class_ of JSON.parse(local)) {
        const document = await getDoc(doc(classesCollection, class_));
        const data = document.data();
        if (!data || !document.exists()) continue;

        array.push({
          id: document.id,
          name: data.name,
          school: data.school,
          webhook: data.webhook,
        });
      }
      setClasses(array);
    } else {
      localStorage.setItem("classes", JSON.stringify([]));
    }
  }

  function addClass(class_: Class) {
    const array = [...classes, class_];
    localStorage.setItem(
      "classes",
      JSON.stringify(array.map((class_) => class_.id))
    );
  }

  return { classes, loadClasses, addClass };
}

export function useAllClasses() {
  const [classes, setClasses] = useState<Class[]>([]);
  const { classesCollection } = useFirebase();

  async function loadClasses() {
    const documents = await getDocs(classesCollection);
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
    setClasses(array);
  }

  return { classes, loadClasses };
}
