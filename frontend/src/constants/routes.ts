export const ROUTES = {
  Index: { path: "/" } as const,
  Auth: { path: "/signin" } as const,
  NotFound: { path: "/404" } as const,
  TaxProgress: { path: "/tax-progress" } as const,
};

type Routes = typeof ROUTES;

export const navigateTo = <T extends keyof Routes>(route: T) => {
  window.location.href = ROUTES[route].path;
};
