import { Logout } from '@/actions/authAction'


export default function Logoutbtn() {

  return (
    <form className=' w-full'  action={Logout}>
      <button className='border-none w-full text-start ' type='submit'>
        Log out
      </button>
    </form>
  )
}
