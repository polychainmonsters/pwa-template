import { black, cyan, emerald, neutral, orange, purple, red, sky, slate, transparent, white, yellow } from 'tailwindcss/colors'

// Custom color palettes
const radicalRed = {
    '50': '#fff0f2',
    '100': '#ffe2e8',
    '200': '#ffcad6',
    '300': '#ff9fb4',
    '400': '#ff698d',
    '500': '#ff3369',
    '600': '#ed1156',
    '700': '#c80849',
    '800': '#a80944',
    '900': '#8f0c40',
    '950': '#50011e',
}

// Brand colors
const base = slate
const primary = radicalRed
const secondary = cyan

// Element colors representing different types
const fire = red
const nature = emerald
const water = sky
const electric = yellow
const mental = purple
const toxic = neutral


// General-purpose utility colors
const background = {
    "primary": white,
    "secondary": base[50],
    "tertiary": base[100],
    "dark": base[800],

    "skeleton": base[200],
    "highlight": primary[500],
    "disabled": base[100],

    "accent": primary[50],
    "error": red[50],
    "success": emerald[50],

    "fire": fire[500],
    "nature": nature[500],
    "water": water[400],
    "electric": electric[500],
    "mental": mental[500],
    "toxic": toxic[800],
}

const text = {
    "primary": base[900],
    "secondary": base[700],
    "tertiary": base[500],
    "placeholder": base[400],
    "disabled": base[300],

    "highlight": primary[500],
    "accent": primary[50],
    "error": red[500],

    "light": white,

}

const health = {
    "high": emerald[500],
    "medium": orange[400],
    "low": red[500],
}

const healthBackground = {
    "high": emerald[100],
    "medium": orange[100],
    "low": red[100],
}


export {
    base,
    primary,
    secondary,

    fire,
    nature,
    water,
    electric,
    mental,
    toxic,

    background,
    text,

    health,
    healthBackground,

    white,
    black,
    transparent
}
