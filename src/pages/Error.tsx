import React, { ReactElement } from "react";

interface Props {}

export default function Error({}: Props): ReactElement {
    return (
        <div>
            <h1>Error 404</h1>
        </div>
    );
}
