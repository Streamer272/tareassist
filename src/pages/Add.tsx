import { useEffect, useState } from "react";
import { useAllClasses, useClasses } from "../hooks/useClasses";
import { Centered } from "../layouts/Centered";
import { Guarded } from "../layouts/Guarded";
import { Button, NativeSelect } from "@mantine/core";
import { useAllSchools } from "../hooks/useSchools";
import { useNavigate } from "react-router-dom";

export function Landing() {
  const [school, setSchool] = useState<string | undefined>(undefined);
  const [class_, setClass] = useState<string | undefined>(undefined);
  const { loadClasses, addClass } = useClasses();
  const { schools, loadSchools } = useAllSchools();
  const { classes, loadClasses: loadAllClasses } = useAllClasses();
  const navigate = useNavigate();

  function add(event: any) {
    event.preventDefault();
    const actualClass = classes.find((class2) => class2.name === class_);
    if (actualClass) addClass(actualClass);
    navigate("/");
  }

  useEffect(() => {
    loadSchools();
    loadClasses();
    loadAllClasses();
  }, []);

  useEffect(() => {
    if (schools.length > 0) setSchool(schools[0].name);
    if (classes.length > 0) setClass(classes[0].name);
  }, [schools, classes]);

  return (
    <Guarded>
      <Centered className="bg-background" start>
        <div className="flex items-center justify-start flex-col w-fit h-full">
          <div className="h-20 flex-shrink-0" />
          <div className="flex items-center justify-center w-full rounded-3xl bg-half mx-4">
            <img src="/images/intro-light.png" alt="Introduction" />
          </div>
          <div className="h-12 flex-shrink-0" />
          <div className="flex items-center justify-center flex-col bg-white rounded-3xl w-full h-fit py-8 bg-surface">
            <p className="text-3xl font-bold">Getting set up</p>
            <div className="h-4 flex-shrink-0" />
            <form onSubmit={add}>
              <NativeSelect
                label="Select your school"
                value={school}
                onChange={(event) => setSchool(event.target.value)}
                data={schools.map((school) => school.name)}
              />
              <div className="h-2 flex-shrink-0" />
              <NativeSelect
                label="Select your class"
                value={class_}
                onChange={(event) => setClass(event.target.value)}
                data={classes
                  .filter(
                    (class_) =>
                      class_.school.id ===
                      schools.find((school2) => school2.name === school)?.id
                  )
                  .map((class_) => class_.name)}
              />
              <div className="h-4 flex-shrink-0" />
              <div className="flex items-center justify-center w-full">
                <Button type="submit" variant="outline">
                  Submit
                </Button>
              </div>
            </form>
            <div className="h-6 flex-shrink-0" />
          </div>
        </div>
      </Centered>
    </Guarded>
  );
}
