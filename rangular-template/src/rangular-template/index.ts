import { Schema } from './schema.d';
import { Rule, SchematicContext, Tree, url, apply, template, mergeWith} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';

export const writeMethods = (element:string) => { 
  const arr = element.split(";").map ((value,index) => {
      return value.replace('function',`func${index}`);
    });
  return arr.join('\n');
}

export const getUrls = (urls:string) => {
  const urlArray: string[] = urls.split(";");
  return `[${urlArray}]`;
}

export function rangularTemplate(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const srcComponentTemplate = url('./files');
    const srcRulesApplication = apply(srcComponentTemplate, [
    template({
      ..._options,
      ...strings,
      ...{writeMethods},
      ...{getUrls}
    })
  ]);
  /*
  tree.create('rangular.ts', `public ${_options.name}(a: string) {
    return a + 'b;
  }`);
  */
  tree = mergeWith(srcRulesApplication)(tree, _context) as Tree;  
  return tree;
  };
}
