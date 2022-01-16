import type { NextPage } from 'next'
import { useSession, UseSessionOptions ,getSession} from 'next-auth/react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const {data:session } = useSession()
  return (
    <div >
      {JSON.stringify(session)}
    </div>
  )
}

export default Home

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
