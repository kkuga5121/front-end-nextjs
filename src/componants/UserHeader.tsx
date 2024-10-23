import Link from "next/link";
import { useDispatch } from "react-redux";
import { clearUser } from "@/store/userSlice";

const UserHeader = (props: any) => {
  const { isAuthenticated, username } = props;
  const dispatch = useDispatch();
  return (
    <div className="hidden lg:block">
      {/* Show this on large screens */}
      {isAuthenticated ? (
        <div
          className="flex flex-row items-center space-x-4 cursor-pointer"
          onClick={() => {
            dispatch(clearUser());
          }}
        >
          {/* User name */}
          <span className="text-white text-base font-medium  font-inter">
            {username}
          </span>
          {/* User Image */}
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src="/images/Avatar.png"
              alt={`${username}'s profile`}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
        </div>
      ) : (
        // route to Login
        <button className="bg-success text-white items-center p-0 w-[105px] h-[40px] rounded-lg">
          <Link href={"/login"}>Sign In</Link>
        </button>
      )}
    </div>
  );
};
export default UserHeader;
