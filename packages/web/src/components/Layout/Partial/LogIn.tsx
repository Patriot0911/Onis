'use client';

import AuthClientService from "@/services/auth";
import { useEffect } from "react";

const LogIn = () => {
    useEffect(
        () => {
            (async function() {
                const res = await AuthClientService.me();
                console.log(res);
            })();
        }, []
    );
    return (
        <>
            {/* я обов'язково щось додам тут */}
        </>
    );
};

export default LogIn;
