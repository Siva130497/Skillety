
import React, { useState } from "react";
import { Slider } from "primereact/slider";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

export default function RangeDemo() {
    const [value, setValue] = useState([0,30]);

    return (
        <div className="card flex justify-content-center">
            <Slider value={value} onChange={(e) => {
                // setValue(e.value)
                console.log(e.value);
                }} className="w-14rem" range />
        </div>
    )
}
        