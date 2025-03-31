const calloutStyles = {
  tip: 'bg-green-100 dark:bg-green-900 border-green-300',
  info: 'bg-blue-100 dark:bg-blue-900 border-blue-300',
  warning: 'bg-yellow-100 dark:bg-yellow-900 border-yellow-300',
};

export const Callout = ({ type = 'info', children }) => (
  <div
    className={`p-4 rounded-lg border-l-4 ${calloutStyles[type]} shadow-sm`}
  >
    {children}
  </div>
);
