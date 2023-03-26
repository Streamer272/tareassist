import { useEffect, useState } from "react";
import { Button, NativeSelect } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { Guarded } from "../../layouts/Guarded";
import { Centered } from "../../layouts/Centered";

export function CreateSchool() {
  function add() {}

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
              <Link to="/create/school" className="text-sm underline">
                Your school isn't here?
              </Link>
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
              <Link
                to={`/create/class?school=${
                  schools.find((school_) => school_.name === school)?.id ?? ""
                }`}
                className="text-sm underline"
              >
                Your class isn't here?
              </Link>
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
