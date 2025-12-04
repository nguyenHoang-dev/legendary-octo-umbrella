import { signOutAction } from "../actions/auth"


export default async function Page() {
  await signOutAction();
  
  return (
    <div>Signing out</div>
  )
}