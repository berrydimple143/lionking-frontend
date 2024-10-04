import React, { useEffect } from "react";
import { updatePayment } from "@/services/agent";

const UpdatePayment = () => {

    const initPage = async () => {
        const { status } = await updatePayment();
        window.location.href = "/admin";
    }

    useEffect(() => {
        initPage();
    }, []);

    return (
        <></>
    )
}

export default UpdatePayment;