export default function Container({ children, isBlog = false, fullWidth = false }) {
  return (
    <div className={`w-full ${fullWidth ? '' : 'px-2 sm:px-2 lg:px-2'}`}>
      <div className={`mx-auto ${isBlog ? 'max-w-[1800px] px-2 sm:px-2 lg:px-2' : fullWidth ? '' : 'max-w-7xl px-2 sm:px-2 lg:px-2'}`}>
        {children}
      </div>
    </div>
  );
}
