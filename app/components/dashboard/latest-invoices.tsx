import { fetchLatestInvoices } from '@/app/dashboard/action';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={` mb-4 text-xl md:text-2xl`}>Latest Invoices</h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-rose-100 p-4">
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className="bg-white px-6">
          {latestInvoices.map((invoice, i) => {
            const nameArray = invoice.name.split(' ');
            const firstName = nameArray[0]?.toUpperCase() ?? '';
            const lastName =
              nameArray[nameArray.length - 1]?.toUpperCase() ?? '';

            return (
              <div
                key={invoice.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  {/* <Image
                    src={invoice.image_url}
                    alt={`${invoice.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  /> */}

                  <div className="mr-4 flex h-[36px] w-[36px] items-center justify-center rounded-full border-[0.02rem] border-slate-400 bg-pink-200 text-red-800">
                    <p>{`${firstName[0]}${lastName[0]}`}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {invoice.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p className={`truncate text-sm font-medium md:text-base`}>
                  {invoice.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}