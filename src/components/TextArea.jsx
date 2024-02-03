import React from 'react'

function textArea(props) {
    return (
        <textarea style={{ resize: 'none', ...props.styles }} onKeyDown={props.listener} readOnly={props.readOnly} placeholder={props.placeholder} className={props.className} onChange={props.onChange} value={props.value}></textarea>
    )
}

export default textArea
