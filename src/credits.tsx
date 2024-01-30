/**
 * @file Component for credits
 */
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

// eslint-disable-next-line jsdoc/require-param
/**
 * @returns Credits component
 */
function Credits () {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <>
        <Button variant="link" onClick={handleShow} className="float-right">
            Credits
        </Button>

        <Offcanvas show={show} onHide={handleClose} scroll={true}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Credits</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <p>Version 1.1.0</p>
                <p>Skribblio Solver is a project by <a href="https://github.com/xShadowBlade">xShadowBlade</a>.</p>
                <p>It is open source and available on <a href="https://github.com/xShadowBlade/skribblio-custom-words">GitHub</a>.</p>
                <p>It is licensed under the <a href="https://github.com/xShadowBlade/skribblio-custom-words/blob/main/LICENSE">MIT License</a>.</p>
                <p>It is not affiliated with <a href="https://skribbl.io/">Skribbl.io</a>.</p>
            </Offcanvas.Body>
        </Offcanvas>
    </>;
}

export default Credits;