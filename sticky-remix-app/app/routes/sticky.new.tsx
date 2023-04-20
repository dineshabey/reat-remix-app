import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";

import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";

function validateJokeContent(content: string) {
  if (content.length < 10) {
    return "That content is too short";
  }
}

function validateJokeName(note: string) {
  if (note.length < 3) {
    return "That note is too short";
  }
}

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const content = form.get("content");
  const note = form.get("note");


  if (typeof content !== "string" || typeof note !== "string") {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Form not submitted correctly.",
    });
  }

  const fieldErrors = {
    content: validateJokeContent(content),
    note: validateJokeName(note),
  };
  const fields = { content, note };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  const sticky = await db.sticky.create({ data: fields });
  return redirect(`/sticky/${sticky.id}`);
};

export default function NewJokeRoute() {
  const actionData = useActionData<typeof action>();

  return (
    <div>
      <p>Add your own hilarious joke</p>
      <form method="post">
        <div>
          <label>
            Note:{" "}
            <input
              defaultValue={actionData?.fields?.note}
              name="note"
              type="text"
              aria-invalid={Boolean(actionData?.fieldErrors?.note)}
              aria-errormessage={
                actionData?.fieldErrors?.note ? "note-error" : undefined
              }
            />
          </label>
          {actionData?.fieldErrors?.note ? (
            <p className="form-validation-error" id="note-error" role="alert">
              {actionData.fieldErrors.note}
            </p>
          ) : null}
        </div>
        <div>
          <label>
            Content:{" "}
            <textarea
              defaultValue={actionData?.fields?.content}
              name="content"
              aria-invalid={Boolean(actionData?.fieldErrors?.content)}
              aria-errormessage={
                actionData?.fieldErrors?.content ? "content-error" : undefined
              }
            />
          </label>
          {actionData?.fieldErrors?.content ? (
            <p
              className="form-validation-error"
              id="content-error"
              role="alert"
            >
              {actionData.fieldErrors.content}
            </p>
          ) : null}
        </div>
        <div>
          {actionData?.formError ? (
            <p className="form-validation-error" role="alert">
              {actionData.formError}
            </p>
          ) : null}
          <button type="submit" className="button">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
