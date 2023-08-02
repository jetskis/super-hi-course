import {forwardRef} from 'react';
import {Link} from '@remix-run/react';
import clsx from 'clsx';

import {missingClass} from '~/lib/utils';

export const Button = forwardRef(
  (
    {
      as = 'button',
      className = '',
      variant = 'primary',
      width = 'auto',
      ...props
    },
    ref,
  ) => {
    const Component = props?.to ? Link : as;

    const baseButtonClasses =
      'inline-block rounded-[5px] border-2 font-500 uppercase text-center py-2 px-5 text-sans-16 transition-colors';

    const variants = {
      primary: `${baseButtonClasses} border-primary-grey border-solid bg-primary-grey text-white `,
      secondary: `${baseButtonClasses}  bg-white text-primary-grey border-solid border-primary-grey `,
      transparentDark: `${baseButtonClasses} bg-transparent text-primary-grey  border-solid border-primary-grey hover:bg-primary-grey hover:text-white duration-300`,
      transparentLight: `${baseButtonClasses} bg-transparent text-white  border-solid border-white hover:bg-white hover:text-primary-grey duration-300`,
    };

    const styles = clsx(
      variants[variant],
      className,
    );

    return (
      <Component
        // @todo: not supported until react-router makes it into Remix.
        // preventScrollReset={true}
        className={styles}
        {...props}
        ref={ref}
      />
    );
  },
);
