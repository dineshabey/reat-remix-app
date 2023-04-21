import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Link,
  useLoaderData,
  useParams,
  useRouteError,
} from "@remix-run/react";

import { db } from "~/utils/db.server";
// import { requireUserId } from "~/utils/session.server";

export const loader = async ({ params }: LoaderArgs) => {
  const sticky = await db.sticky.findUnique({
    where: { id: params.stickyId },
  });
  if (!sticky) {
    throw new Response("What a joke! Not found.", {
      status: 404,
    });
  }
  return json({ sticky });
};

export const action = async ({ params, request }: ActionArgs) => {
  const form = await request.formData();
  if (form.get("intent") !== "delete") {
    throw new Response(`The intent ${form.get("intent")} is not supported`, {
      status: 400,
    });
  }
  // const userId = await requireUserId(request);
  const sticky = await db.sticky.findUnique({
    where: { id: params.stickyId },
  });
  if (!sticky) {
    throw new Response("Can't delete what does not exist", {
      status: 404,
    });
  }
  // if (joke.jokesterId !== userId) {
  //   throw new Response(
  //     "Pssh, nice try. That's not your joke",
  //     { status: 403 }
  //   );
  // }
  await db.sticky.delete({ where: { id: params.stickyId } });
  return redirect("/sticky");
};

export default function JokeRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <p>Here's your note :</p>
      <Link to=".">"{data.sticky.note}" Permalink</Link>
      <p>{data.sticky.content}</p>

      <br />
      <br />
      <form method="post">
        <button className="button" name="intent" type="submit" value="delete">
          Update
        </button>
      </form>
      <br />
      <form method="post">
        <button className="button" name="intent" type="submit" value="delete">
          Delete
        </button>
      </form>
    </div>

    
  );
}

export function ErrorBoundary() {
  const { jokeId } = useParams();
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 400) {
      return (
        <div className="error-container">
          What you're trying to do is not allowed.
        </div>
      );
    }
    if (error.status === 403) {
      return (
        <div className="error-container">
          Sorry, but "{jokeId}" is not your joke.
        </div>
      );
    }
    if (error.status === 404) {
      return (
        <div className="error-container">Huh? What the heck is "{jokeId}"?</div>
      );
    }
  }

  return (
    <div className="error-container">
      There was an error loading joke by the id "${jokeId}". Sorry.
    </div>
  );
}
