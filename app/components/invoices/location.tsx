import {
  BriefcaseIcon,
  BuildingStorefrontIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function InvoiceLocation({ location }: { location: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-fuchsia-500 text-white': location === 'cabin',
          'bg-purple-400 text-white': location === 'salon',
        },
      )}
    >
      {location === 'cabin' ? (
        <>
          Cabin
          <BuildingStorefrontIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {location === 'salon' ? (
        <>
          Salon
          <BriefcaseIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
