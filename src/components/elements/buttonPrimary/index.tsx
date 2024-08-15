import React from 'react'

type Props = {
    children?: React.ReactNode
    onClick?: () => void
    className?: string
    type?: 'string'
    disabled?: boolean
}

const ButtonPrimary = ({ children, onClick, className, disabled }: Props) => {
    return (
        <button disabled={disabled} className={`bg-primary  text-white  ${className}`} onClick={onClick}  >
            {children}
        </button >
    )
}

export default ButtonPrimary