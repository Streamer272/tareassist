import { addDoc, collection, getDocs } from "firebase/firestore";

export type School = {
  id: string;
  name: string;
};

export function useAllSchools() {
  const schools = useState<School[]>("schools", () => []);

  onMounted(async () => {
    const documents = await getDocs(collection(useFirebaseDb(), "schools"));
    const array: School[] = [];
    for (const document of documents.docs) {
      const data = document.data();
      if (!data || !document.exists()) continue;

      array.push({
        id: document.id,
        name: data.name,
      });
    }
    schools.value = array;
  });

  return schools;
}

export function createSchool(name: string) {
  addDoc(collection(useFirebaseDb(), "schools"), { name: name });
}
