import { Tooltip as giToolTip } from 'bootstrap'
import React, { useEffect, useRef } from "react"

export const Tooltip = ({ children, text }) => {
    const tooltipRef = useRef();

    useEffect(() => {
        var tooltip = new giToolTip(tooltipRef.current, {
            title: text,
            placement: 'right',
            trigger: 'hover focus'
        }, [text])
        return () => tooltip.dispose()
    })
    return React.cloneElement(children, { ref: tooltipRef })
}