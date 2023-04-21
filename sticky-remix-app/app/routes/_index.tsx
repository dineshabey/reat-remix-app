import type { LinksFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import stylesUrl from "~/styles/index.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

export default function IndexRoute() {
  return (
    <div className="container">
      <div className="content">
        <br />
        <h1>
          STICKY🤪<span>APP!</span>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to="sticky">View Sticky Note</Link>
            </li>
            <li>
              <Link to="sticky/new">Add quick Note </Link>
            </li>{" "}
            {/* <li>
              <Link to="sticky">Color Setting</Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </div>
  );
}
