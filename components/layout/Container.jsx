export default function Container({ children, isBlog = false, fullWidth = false }) {
  return (
    <div className={`w-full ${fullWidth ? '' : 'px-10 sm:px-10 lg:px-14'}`}>
      <div className={`mx-auto ${isBlog ? 'max-w-[1800px]' : fullWidth ? '' : 'max-w-7xl px-10 sm:px-10 lg:px-10'}`}>
        {children}
      </div>
    </div>
  );
}
