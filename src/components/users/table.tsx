import { User } from '@/lib/definitions';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type UserTableProps = {
  users: User[];
};
export default function UserTable({ users }: UserTableProps) {
  return (
    <table className='table-auto'>
      <thead>
        <tr>
          <th className='px-4 py-2 text-left'>Avatar</th>
          <th className='px-4 py-2 text-left'>Name</th>
          <th className='px-4 py-2 text-left'>City</th>
          <th className='px-4 py-2 text-left'>Age</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: any) => (
          <tr key={user.login.uuid}>
            <td>
              <Image
                src={user.picture.thumbnail}
                alt={user.name.first}
                width={50}
                height={50}
                className='rounded-full'
              />
            </td>
            <td className='px-4 py-2 text-left'>
              {user.name.first} {user.name.last}
            </td>
            <td className='px-4 py-2 text-left'>
              {user.location.city}, {user.location.country}
            </td>
            <td className='px-4 py-2 text-left'>{user.dob.age}</td>
            <td>
              <Link
                href={{
                  pathname: `/user/${user.login.uuid}`,
                  query: { user: JSON.stringify(user) },
                }}
              >
                View Details
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
