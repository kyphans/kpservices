import Link from "next/link";

export default function Home() {
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center gap-4'>
      <div>
        <span className='text-2xl bold'>KP API Services</span>
      </div>
      <div className='route'>
        <Link
          className='text-blue-700'
          href='/api/food/starbucks-coffee-lakai-building'>
          {'Example Shopeefood API: /api/food/starbucks-coffee-lakai-building'}
        </Link>
      </div>
    </div>
  );
}
