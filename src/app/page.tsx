import UserTable from '@/components/users/table';
import { User } from '@/lib/definitions';

async function getData() {
  const res = await fetch('https://randomuser.me/api/?results=10');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
export default async function Home() {
  const data: { results: User[] } = await getData();

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <p className='pb-4 text-3xl font-bold'>Users</p>
      <UserTable users={data.results} />
    </main>
  );
}
