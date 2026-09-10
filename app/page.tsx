import { LandingPage } from '@/components/LandingPage';
import { AuthButton } from '@/components/AuthButton';

export default function Home() {
  return (
    <>
      <div className="absolute top-6 right-6 z-50">
        <AuthButton />
      </div>
      <LandingPage />
    </>
  );
}
