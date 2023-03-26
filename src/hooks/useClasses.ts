import { DocumentReference, doc, getDoc } from "firebase/firestore";
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
      for (const class_ of JSON.parse(local)) {
        const document = await getDoc(doc(classesCollection, class_));
        const data = document.data();
        if (!data || !document.exists()) continue;

        console.log("class", document.id, data);
        setClasses([
          ...classes,
          {
            id: document.id,
            name: data.name,
            school: data.school,
            webhook: data.webhook,
          },
        ]);
      }
    } else {
      localStorage.setItem("classes", JSON.stringify([]));
    }
  }

  function addClass(class_: Class) {
    setClasses([...classes, class_]);
  }

  return { classes, loadClasses, addClass };
}
