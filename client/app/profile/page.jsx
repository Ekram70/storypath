'use client';

import AllStories from '@/components/AllStories';
import Wrapper from '@/components/Wrapper';
import { useAuthDetails } from '@/context/auth/AuthContext';

import userData from '@/public/data/userData';
import { Loader, MoveUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProfilePage = ({ params }) => {
  const { id } = params;

  const user = userData[0];

  const { dispatch, isAuthenticated } = useAuthDetails();

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router]);

  if (loading) {
    return <Loader className="animate-spin" />;
  }

  return (
    <Wrapper className="py-4 px-4 md:px-8">
      <div className="flex gap-5 items-center justify-between flex-col sm:flex-row">
        <div className="flex gap-4 items-center">
          <div className="h-[100px] w-[100px] rounded-full overflow-hidden">
            <Image
              src={`${user.picture}`}
              height={100}
              width={100}
              alt="profile"
            />
          </div>
          <div>
            <h2 className="title-3">{user.name}</h2>
            <p>Total Story Created: {user.stories.length}</p>
          </div>
        </div>
        <div>
          <h2 className="title-1 !text-[20px] flex items-center border-4 border-blue-600 px-4 hover:underline hover:decoration-blue-600 hover:decoration-4">
            <span className="text-blue-600 leading-none py-4">
              <Link href="/profile/create">Create Story</Link>
            </span>
            <MoveUpRight className="text-blue-600" size={25} />
          </h2>
        </div>
      </div>
      <AllStories search={false} heading="My previous stories" />
    </Wrapper>
  );
};

export default ProfilePage;
