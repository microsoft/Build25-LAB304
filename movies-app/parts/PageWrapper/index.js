
import clsx from 'clsx';

const PageWrapper = ({
  className,
  children,
  ...rest
}) => (
  <>
    <main
      className={clsx('page-wrapper', className)}
      {...rest}>
      {children}
    </main>
    <style jsx>{`
      .page-wrapper {
        width: 100%;
      }
    `}</style>
  </>
);

export default PageWrapper;
