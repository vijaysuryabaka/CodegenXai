import { SignIn } from "@clerk/nextjs";
import "app/globals.css"

export default function Page() {
  return (
    <div className="flex justify-center py-24">
      <SignIn />
      
    </div>
  );
}
