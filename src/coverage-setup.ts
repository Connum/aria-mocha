import { getSourceFiles } from './files'
import { createInstrumenter, TransformerOptions, hookRequire } from './libs'

declare var global: any;

export async function setup(src: string) {
  const files = await getSourceFiles(src)
  const instrumenter = createInstrumenter()

  const transformer = (code: string, options: TransformerOptions) => {
    return instrumenter.instrumentSync(code, options.filename)
  }
  
  const hookMatcher = (file: string) => files.includes(file)
  hookRequire(hookMatcher, transformer, { 
    verbose: false, 
    extensions: [ '.js', '.ts' ] 
  })
}