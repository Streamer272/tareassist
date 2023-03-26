import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useFirebase";
import { LayoutProps } from "./Centered";
import { useEffect } from "react";

export function Guarded(props: LayoutProps) {
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  return props.children;
}
