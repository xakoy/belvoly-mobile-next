import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'

export default {
    input: './index.ts',
    output: {
        file: 'dist/index.full.js',
        format: 'umd',
        name: 'umd'
    },
    plugins: [
        typescript({
            tsconfigOverride: {
                compilerOptions: {
                    declaration: false
                }
            }
        }),
        commonjs()
    ]
}
