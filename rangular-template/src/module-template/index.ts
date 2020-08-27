import { Schema } from './schema.d';
import { Rule, SchematicContext, Tree, url, apply, template, mergeWith} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { classify } from '@angular-devkit/core/src/utils/strings';
export const getComponentNames = (components:string) => {
    const arr= components.split(";").map(component =>{
        return `${classify(component)}Component`;
    });
    return arr.join(',');
}
export function moduleTemplate(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    
    const srcComponentTemplate = url('./files');
    const srcRulesApplication = apply(srcComponentTemplate, [
    template({
      ..._options,
      ...strings,
      ...{getComponentNames}
    })
  ]);
  /*tree.create('../../../frontend/src/rangular.ts', `public ${_options.name}(a: string) {
    return a + 'b;
  }`);*/
  
  tree = mergeWith(srcRulesApplication)(tree, _context) as Tree;  
  return tree;
  };
}
