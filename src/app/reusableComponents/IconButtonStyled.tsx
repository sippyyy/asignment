import React from 'react'

interface IconButtonStyledProps {
    icon: React.ReactNode
    label: string
    onClick: () => void
    key?: string
    colorPair?:{
        light: string
        bolt: string
    }
}

const IconButtonStyled = ({ icon, label, onClick, colorPair }: IconButtonStyledProps) => {
    const { light, bolt } = colorPair || { light: 'text-main-shine', bolt: 'hover:bg-main-shine/10' }
    return (
        <button
            onClick={onClick}
            className={`p-2 ${light} ${bolt} rounded-lg transition-colors cursor-pointer`}
            title={label}
        >
            {icon}
        </button>
    )
}

export default IconButtonStyled