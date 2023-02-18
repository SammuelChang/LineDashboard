/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    mode: 'jit',
    purge: [
      './public/**/*.html',
      './src/**/*.{js,jsx,ts,tsx,vue}',
    ],
    extend: {
      screens:{
        'print': {'raw': 'print'},
     },
      colors: {
        'dark': {
          '50': '#f4f4f4', 
          '100': '#eaeaea', 
          '200': '#cacaca', 
          '300': '#aaaaaa', 
          '400': '#6b6b6b', 
          '500': '#2b2b2b', 
          '600': '#272727', 
          '700': '#202020', 
          '800': '#1a1a1a', 
          '900': '#151515'
      },'light': {
          '50': '#fefefe', 
          '100': '#fefefe', 
          '200': '#fcfcfc', 
          '300': '#fbfbfb', 
          '400': '#f7f7f7', 
          '500': '#F4F4F4', 
          '600': '#dcdcdc', 
          '700': '#b7b7b7', 
          '800': '#929292', 
          '900': '#787878'
      },'emoji': {
          '50': '#fefcf9', 
          '100': '#fdfaf2', 
          '200': '#fbf2df', 
          '300': '#f8eacc', 
          '400': '#f3daa6', 
          '500': '#EECA80', 
          '600': '#d6b673', 
          '700': '#b39860', 
          '800': '#8f794d', 
          '900': '#75633f'
      },'sticker': {
          '50': '#fefcfb', 
          '100': '#fdf8f7', 
          '200': '#faeeea', 
          '300': '#f6e3dd', 
          '400': '#f0cfc4', 
          '500': '#E9BAAA', 
          '600': '#d2a799', 
          '700': '#af8c80', 
          '800': '#8c7066', 
          '900': '#725b53'
      },'call': {
          '50': '#fdf9f9', 
          '100': '#fbf3f2', 
          '200': '#f6e0e0', 
          '300': '#f1cdcd', 
          '400': '#e6a8a7', 
          '500': '#DB8381', 
          '600': '#c57674', 
          '700': '#a46261', 
          '800': '#834f4d', 
          '900': '#6b403f'
      },'message': {
          '50': '#fafbfb', 
          '100': '#f4f8f6', 
          '200': '#e4edea', 
          '300': '#d3e1dd', 
          '400': '#b2cbc3', 
          '500': '#91B5A9', 
          '600': '#83a398', 
          '700': '#6d887f', 
          '800': '#576d65', 
          '900': '#475953'
      }
      },
    },
  },
  plugins: [require("daisyui")],
}