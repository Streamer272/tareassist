import { useState } from "react";
import { useFirebase } from "./useFirebase";
import { getDocs } from "firebase/firestore";

export type School = {
  id: string;
  name: string;
};

export function useAllSchools() {
  const [schools, setSchools] = useState<School[]>([]);
  const { schoolsCollection } = useFirebase();

  async function loadSchools() {
    const documents = await getDocs(schoolsCollection);
    const array: School[] = [];
    for (const document of documents.docs) {
      const data = document.data();
      if (!data || !document.exists()) continue;

      array.push({
        id: document.id,
        name: data.name,
      });
    }
    setSchools(array);
  }

  return { schools, loadSchools };
}
