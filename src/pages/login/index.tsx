import httpService from "@/service/httpService";
//  import { RootState } from '@/store';
import { setUser } from "@/store/userSlice";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      console.log("username", username);
      // Make a GET request to fetch user data by username
      const response = await httpService.get<any>(`/user/${username}/username`);
      const { data } = response;
      if (data) {
        console.log("data", data);
        // Dispatch the setUser action to update the user in the Redux store
        dispatch(
          setUser({
            id: data.id,
            username: data.username,
          })
        );
        console.log("user", user);
        alert("Login Username : " + data.username);
        router.push("/"); // Redirect to the homepage after login
      } else {
        // Handle cases where data is not returned
        if (response.message) {
          alert(response.message); // Alert the message if provided
        } else {
          alert("Login Faild");
        }
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <div className="flex lg:flex-row flex-col-reverse relative w-full h-screen bg-green-500">
      {/* Main Content */}
      <div className="flex justify-center items-center gap-10  w-full h-3/6 lg:w-2/ lg:h-full  ">
        <div className="flex flex-col sm:w-full sm:items-start sm:mx-3 lg:items-stretch lg:w-[385px]">
          <h1 className="text-white text-2xl font-semibold mb-8 ">Sign in</h1>
          <div className="flex flex-col gap-5 w-full">
            {/* Login Field */}
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2 mb-2">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="w-full h-[44px] p-3 border text-color-base  rounded-lg"
                />
              </div>
              <button className="w-full h-[40px] flex justify-center items-center bg-success text-white rounded-lg">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* Sidebar */}
      <div className="flex  lg:right-0 w-full h-3/6 lg:w-2/4 lg:h-full bg-green-300 rounded-b-[36px] lg:rounded-l-[36px]">
        <div className="flex flex-col items-center w-full justify-center">
          <img
            className="flex w-[170px] h-[130px] lg:w-[300px] lg:h-[230px] object-cover"
            src="/images/notebook.png"
            alt="Notebook" // Ensure to provide descriptive alt text
          />
          <div className="flex font-header font-normal text-[28px] italic">
            {" "}
            a Borad
          </div>
        </div>
      </div>
    </div>
  );
}
