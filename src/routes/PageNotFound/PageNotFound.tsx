import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "../../components";

export const PageNotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = (location.state as { from: { pathname: string } }) || {};

  const handleGoBack = () => {
    const { from = { pathname: "/" } } = state;

    if (from === undefined || from.pathname === location.pathname) {
      navigate("/", { replace: true });
      return;
    }

    navigate(from, { replace: true });
  };

  return (
    <div className="flex flex-1 flex-col py-safe-or-4">
      <div className="flex flex-1 flex-col justify-center items-center">
        <img src="" alt="Error" className="w-3/4 aspect-square" />
        <div className="flex flex-col text-center space-y-2 p-4">
          <h1 className="font-display font-black text-2xl text-text-primary">
            Lost in the template?
          </h1>
          <p className="text-sm text-text-secondary">
            Oops! This corner of our realm doesn't exist. But fret not, brave
            explorer. Use your Fren-ergy to navigate back and continue your
            legendary journey with template.
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <Button variant="dark" className="w-1/2" onClick={handleGoBack}>
          Go Back
        </Button>
      </div>
    </div>
  );
};
