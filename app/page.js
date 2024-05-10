import Link from "next/link";

export default function Home() {
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center gap-4'>
      <div>
        <span className='text-3xl font-bold'>KP API Services</span>
      </div>
      <div className='route'>
        <span className='font-bold'>
          {'[GET] ShopeeFood API: /api/food/{restaurant_name} '}
        </span>
        <Link
          className='text-blue-700'
          href='/api/food/starbucks-coffee-lakai-building'>
          {
            'Example "starbucks-coffee-lakai-building"'
          }
        </Link>
      </div>
    </div>
  );
}
