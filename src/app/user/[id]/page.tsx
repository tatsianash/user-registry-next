'use client';

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default async function Page() {
  const searchParams = useSearchParams();
  const userParams = searchParams.get('user');

  if (!userParams) {
    return <div>Loading...</div>;
  }
  const user = JSON.parse(userParams);

  function displayLocalizedDOB() {
    const dobDate = new Date(user.dob.date);
    const localizedDOB = dobDate.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return localizedDOB;
  }
  return (
    <div className='p-8'>
      <h1>User Details</h1>
      <div className='flex max-w-xl flex-row items-center gap-8 rounded-md border border-stone-600 p-4'>
        <div style={{ width: '100px', height: '100px' }}>
          <Image
            src={user.picture.large}
            alt={user.name.first}
            width={100}
            height={100}
            className='rounded-md'
          />
        </div>

        <div className='flex flex-col gap-4'>
          <p>
            Name: {user.name.first} {user.name.last}, {user.dob.age}
          </p>

          <div>
            <p>
              {user.location.street.number} {user.location.street.name}
            </p>
            <p>
              {user.location.city}, {user.location.state}{' '}
              {user.location.postcode}
            </p>
            <p>{user.location.country}</p>
          </div>
          <div>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
          </div>

          <p>Date of Birth: {displayLocalizedDOB()}</p>
        </div>
      </div>
    </div>
  );
}
