import { Dashboard } from './pages/Dashboard';

export function App(): JSX.Element {
  return (
    <div className="bg-background h-[100vh] w-[100vw] relative p-[12px] overscroll-contain">
      <Dashboard/>
    </div>
  );
}