import UserTable from '@/components/users/table';
import { User } from '@/lib/definitions';
import Link from 'next/link';

async function getData(page: number = 1) {
  const pageSize = 10;
  const res = await fetch(
    `https://randomuser.me/api/?results=${pageSize}&page=${page}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

interface SearchParamsProps {
  searchParams: {
    page: string;
  };
}
export default async function Home({ searchParams }: SearchParamsProps) {
  const pageNumber = Number(searchParams.page ?? 1);

  const data: { results: User[] } = await getData(pageNumber);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <p className='pb-4 text-3xl font-bold'>Users</p>
      <UserTable users={data.results} />
      <div className='my-5 flex items-center justify-end gap-5'>
        {pageNumber > 1 ? (
          <Link
            className='rounded-md bg-blue-600 px-5 py-2 text-white hover:bg-blue-500'
            href={`/?page=${pageNumber - 1}`}
          >
            Previous
          </Link>
        ) : (
          <span className='cursor-not-allowed rounded-md bg-gray-300 px-5 py-2 text-gray-500'>
            Previous
          </span>
        )}
        <Link
          href={`/?page=${pageNumber + 1}`}
          className='rounded-md bg-blue-600 px-5 py-2 text-white hover:bg-blue-500'
        >
          Next
        </Link>
      </div>
    </main>
  );
}
