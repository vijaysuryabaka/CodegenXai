import { SignUp } from "@clerk/nextjs";
import "app/globals.css"

export default function Page() {
  return (
    <div className="flex justify-center py-24">
      <SignUp />
    </div>
  );
}
