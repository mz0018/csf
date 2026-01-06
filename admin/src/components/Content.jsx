import React, { lazy } from "react";
const BtnRegisterUser = lazy(() => import('../buttons/BtnRegisterUsers'));

const Content = () => {

    return (
        <>
        <BtnRegisterUser />
        </>
    )
}

export default Content;