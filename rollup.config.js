import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import replace from 'rollup-plugin-replace';
import ts from '@wessberg/rollup-plugin-ts';
import copy from 'rollup-plugin-copy';
import pkg from './package.json';

export default [
    {
        input: 'src/index.ts',
        external: ['react'],
        output: [
            { file: pkg.main, format: 'cjs' },
            { file: pkg.module, format: 'es' },
        ],
        plugins: [
            ts(),
            resolve(),
            babel({
                extensions: ['.ts', '.js', '.tsx', '.jsx'],
            }),
            commonjs({
                namedExports: {
                    "react-dom": ["createPortal", "findDOMNode"],
                },
            }),
        ],
    },
    // UMD build with inline PropTypes
    {
        input: 'src/index.ts',
        external: ['react'],
        output: [
            {
                name: 'ReactSideSheetPro',
                file: pkg.browser,
                format: 'umd',
                globals: {
                    react: 'React',
                },
            },
        ],
        plugins: [
            ts(),
            resolve(),
            babel({
                extensions: ['.ts', '.js', '.tsx', '.jsx'],
            }),
            commonjs({
                namedExports: {
                    "react-dom": ["createPortal", "findDOMNode"],
                },
            }),
        ],
    },
    // Minified UMD Build without PropTypes
    {
        input: 'src/index.ts',
        external: ['react'],
        output: [
            {
                name: 'ReactSideSheetPro',
                file: pkg['browser:min'],
                format: 'umd',
                globals: {
                    react: 'React',
                },
            },
        ],
        plugins: [
            ts(),
            resolve(),
            babel({
                extensions: ['.ts', '.js', '.tsx', '.jsx'],
            }),
            replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
            commonjs({
                namedExports: {
                    "react-dom": ["createPortal", "findDOMNode"],
                },
            }),
            terser(),
            copy({
                targets: [{ src: 'src/index.css', dest: 'dist' }],
            }),
        ],
    },
];