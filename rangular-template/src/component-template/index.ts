import { Schema } from './schema';
import { Rule, SchematicContext, Tree, url, apply, template, mergeWith} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';


export const writeMethods = (element:string) => {
  const arr = element.split(";").map ((value,index) => {
    return value.replace('function',`func${index}`);
  });
  return arr.join('\n');
}

export const getSelectOptions = (options:string) => {
  if (options ===';') return '';
  return options.split(";").map(element => {
    return `'${element}'`
  });
}

export const getUrls = (urls:string) => {
  const urlArray: string[] = urls.split(";");
  return `[${urlArray}]`;
}

export function componentTemplate(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    
    const srcComponentTemplate = url('./files');
    const srcRulesApplication = apply(srcComponentTemplate, [
    template({
      ..._options,
      ...strings,
      ...{writeMethods},
      ...{getUrls},
      ...{getSelectOptions}
    })
  ]);
  
  tree = mergeWith(srcRulesApplication)(tree, _context) as Tree;  
  return tree;
  };
}
