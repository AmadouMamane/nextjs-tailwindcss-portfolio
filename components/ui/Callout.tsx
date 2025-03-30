export default function Callout({ type = 'info', children }) {
    const colors = {
      info: 'bg-blue-100 text-blue-800',
      warning: 'bg-yellow-100 text-yellow-800',
      tip: 'bg-green-100 text-green-800',
    };
  
    return (
      <div className={`p-4 rounded-xl shadow-sm ${colors[type]}`}>
        {children}
      </div>
    );
  }
  