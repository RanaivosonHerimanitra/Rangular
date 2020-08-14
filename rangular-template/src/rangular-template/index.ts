import { Schema } from './schema.d';
import { Rule, SchematicContext, Tree, url, apply, template, mergeWith} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function rangularTemplate(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const srcComponentTemplate = url('./files');
    const split = (element:string) => { 
    const arr = element.split(";").map (value => {
        return `${value}(){
          return 'ok';
        }`
      })
    return arr.toString().replace(",","\n\n")
    }
    const srcRulesApplication = apply(srcComponentTemplate, [
    template({
      ..._options,
      ...strings,
      ...{split}
    })
  ]);
  /*tree.create('rangular.ts', `public ${_options.name}(a: string) {
    return a + 'b;
  }`);
  */
  tree = mergeWith(srcRulesApplication)(tree, _context) as Tree;
  
  return tree;
  };
}
