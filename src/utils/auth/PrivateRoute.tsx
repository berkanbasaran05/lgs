import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loading } from "@/components/Loading";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { UserInfo, setOther } from "../../redux/features/user/userSlice";
import axiosInstance from "../axiosInstance";

const PrivateRoute = ({ children }: { children: ReactElement<any, any> }) => {
  const logged = useAppSelector((state) => state.user.isLogged);
  const router = useRouter();
  const [isLogged, setIsLogged] = useState<boolean | null>(null);
  const dispatch = useAppDispatch();
  const [info, setInfo] = useState<UserInfo>();
  useEffect(() => {
    setIsLogged(logged);
  }, [logged]);

  useEffect(() => {
    if (isLogged !== null && isLogged !== undefined) {
      if (!isLogged) {
        router.push("/portal");
      } else {
        const getInfo = async () => {
          try {
            const res = await axiosInstance.get(`/auth/info`);
            setInfo(res.data.user);

            dispatch(setOther(res.data.user));
          } catch (error) {
            router.push("/portal");
          }
        };
        getInfo();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged, dispatch]);
  if (isLogged && info) {
    return children;
  } else {
    return <Loading className="h-screen" />;
  }
};

export default PrivateRoute;
