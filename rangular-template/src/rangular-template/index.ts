import { Schema } from './schema.d';
import { Rule, SchematicContext, Tree, url, apply, template, mergeWith} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function rangularTemplate(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const srcComponentTemplate = url('./files');
    const writeMethods = (element:string) => { 
    const arr = element.split(";").map ((value,index) => {
        return value.replace('function',`func${index}`);
      });
    return arr.join('\n');
    }
    const srcRulesApplication = apply(srcComponentTemplate, [
    template({
      ..._options,
      ...strings,
      ...{writeMethods}
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
