type NetlifyEdgeContext = {
  geo?: {
    country?: {
      code?: string;
    };
  };
  requestId?: string;
  next: (request?: Request) => Promise<Response>;
};

export default async function surveyGeo(
  request: Request,
  context: NetlifyEdgeContext
) {
  const headers = new Headers(request.headers);

  const countryCode = context.geo?.country?.code?.trim();
  const requestId = context.requestId?.trim();

  if (countryCode) {
    headers.set("x-geo-country", countryCode);
  }

  if (requestId) {
    headers.set("x-netlify-request-id", requestId);
  }

  return context.next(new Request(request, { headers }));
}

export const config = {
  path: "/api/survey",
  method: "POST"
};
