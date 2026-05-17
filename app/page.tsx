import RealLifeFitting from '@/components/RealLifeFitting';
import { AuthButton } from '@/components/AuthButton';

export default function Home() {
  return (
    <>
      <div className="absolute top-8 right-8 z-50">
        <AuthButton />
      </div>
      <RealLifeFitting />
    </>
  );
}
