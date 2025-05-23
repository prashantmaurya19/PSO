import { http, HttpResponse } from "msw";

const handlers = [
  http.get("./api/auth", () => {
    return HttpResponse.json(
      {
        data: "ok",
      },
      {
        status: 202,
      },
    );
  }),
];

export default handlers;
